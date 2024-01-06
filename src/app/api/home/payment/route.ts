import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import Stripe from "stripe";
import { RowDataPacket } from "mysql2";
import mailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

interface User {
  id: number;
  password: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
  status: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  status: number;
  images: string[] | [];
  quantity: number;
}

interface Address {
  id: number;
  user_id: number;
  country: string;
  name: string;
  mobile: number;
  apartment: string;
  area: string;
  pin: number;
  landmark: string;
  city: string;
  state: string;
  created_at: string;
}

// console.log("env", process.env);

const mailTransporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailDetatils = (
  userEmail: string,
  orderId: number,
  userName: string,
  paymentId: number,
  amount: number,
  address: Address,
  productName: string
) => {
  const { name, apartment, area, city, state, pin, country } = address;
  return {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Order Confirmation - #[${orderId}]`,
    text: `Dear ${userName},
    
    Thank you for placing an order with TQM Mart. We are pleased to confirm the receipt of your order #${orderId}, dated ${new Date().toString()}.
    
    Order details:
    
    Product Name: ${productName},
    Payment ID: ${paymentId},
    Quantity: 1,
    Total Amount: ₹ ${amount},    
    Delivery Address: ${name}  ${apartment}, ${area}, ${city}, ${state}, ${pin}, ${country}

    Best Regards
    TQM Mart Team.
  `,
  };
};

export const POST = async (req: NextRequest) => {
  try {
    const { productId, amount, quantity, addressId } = await req.json();
    const userEmail = req.headers.get("userEmail");

    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const [products] = await pool.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);

    const [addresses] = await pool.query("SELECT * FROM address WHERE id=?", [
      addressId,
    ]);

    const address = (addresses as Address[])[0];
    const { id: userId, name: userName } = (users as User[])[0];
    const {
      name: productName,
      images,
      quantity: productQty,
    } = (products as Product[])[0];
    const firstImage = images[0];

    const orderResult = await pool.query(
      "INSERT INTO orders (payment_id, user_id, product_id, amount,quantity, name, image,address_id, is_cancelled, is_returned, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        0,
        userId,
        productId,
        amount,
        quantity,
        productName,
        firstImage,
        addressId,
        0,
        0,
        1,
      ]
    );

    const { id, currency } = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const paymentResult = await pool.query(
      "INSERT INTO payments (stripe_id, currency, payment_method_type, amount, status) VALUES (?, ?, ?, ?, ?)",
      [id, currency, "card", amount, 1]
    );

    const orderId = (orderResult as RowDataPacket[])[0].insertId;
    const paymentId = (paymentResult as RowDataPacket[])[0].insertId;

    await pool.query(
      `UPDATE orders SET payment_id=${paymentId} WHERE id=${orderId}`
    );

    await pool.query(
      `UPDATE products SET quantity=${productQty - 1} WHERE id=${productId}`
    );

    await mailTransporter.sendMail(
      mailDetatils(
        userEmail as string,
        orderId,
        userName,
        paymentId,
        amount,
        address,
        productName
      )
    );
    return NextResponse.json({ message: "Order placed" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
