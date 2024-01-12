import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import { RowDataPacket } from "mysql2";
import { CartItem } from "@/app/redux/cartSlice";
import Stripe from "stripe";
import mailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

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
  productName: string,
  qty: number
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
    Quantity: ${qty},
    Total Amount: ₹ ${amount},    
    Delivery Address: ${name}  ${apartment}, ${area}, ${city}, ${state}, ${pin}, ${country}

    Best Regards
    TQM Mart Team.
  `,
  };
};

export const POST = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const { addressId, items } = await req.json();

    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const [addresses] = await pool.query("SELECT * FROM address WHERE id=?", [
      addressId,
    ]);

    const address = (addresses as Address[])[0];
    const { id: userId, name: userName } = (users as RowDataPacket[])[0];

    await Promise.all(
      items.map(async (item: CartItem) => {
        const {
          name,
          image,
          price,
          qty,
          id: cartId,
          product_id: productId,
        } = item;
        const amount = price * (qty as number);

        const [products] = await pool.query(
          "SELECT * FROM products WHERE id=?",
          [productId]
        );

        const { quantity } = (products as Product[])[0];

        const orderResult = await pool.query(
          "INSERT INTO orders (payment_id, user_id, product_id, amount,quantity, name, image,address_id, is_cancelled, is_returned, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [0, userId, productId, amount, qty, name, image, addressId, 0, 0, 1]
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
          `UPDATE products SET quantity=${
            (quantity as number) - (qty as number)
          } WHERE id=${productId}`
        );

        await pool.query("DELETE FROM cart WHERE id=?", [cartId]);

        await mailTransporter.sendMail(
          mailDetatils(
            userEmail as string,
            orderId,
            userName,
            paymentId,
            amount,
            address,
            name,
            qty as number
          )
        );
      })
    );

    return NextResponse.json({ message: "Order Placed" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
