"use client";

interface Header {
  headers: { authorization: string };
}

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const userRoles = ["user", "seller", "admin"];

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const headerConfig: Header = {
  headers: { authorization: token as string },
};

export const about = [
  {
    id: 1,
    heading: "Our Mission",
    description:
      "At the heart of TQM Mart is a mission to bring you a diverse range of high-quality products that enhance your everyday life. We are committed to fostering a community built on trust, reliability, and customer satisfaction. Our team works tirelessly to handpick products that align with our stringent quality standards.",
  },

  {
    id: 2,
    heading: "Curated Selection",
    description:
      "Every product available on TQM Mart undergoes a meticulous selection process. We focus on bringing you items that combine functionality, innovation, and style.",
  },
  {
    id: 3,
    heading: "Customer-Centric Approach",
    description:
      "Your satisfaction is our priority. From user-friendly navigation to responsive customer support, we ensure that every aspect of your shopping journey is seamless.",
  },
  {
    id: 4,
    heading: "Quality Assurance",
    description:
      "We understand the importance of trust when it comes to online shopping. TQM Mart is committed to delivering products that meet or exceed industry standards, backed by a rigorous quality assurance process.",
  },
  {
    id: 5,
    heading: "Explore, Shop, and Experience the Difference",
    description:
      "Navigate through our user-friendly platform and explore a diverse range of categories, from electronics and fashion to home essentials and beyond. Whether you're upgrading your tech gadgets, refreshing your wardrobe, or finding the perfect gift, TQM Mart is your go-to destination.",
  },
  {
    id: 6,
    heading: "Contact Us",
    description:
      "Have questions or feedback? Our dedicated customer support team is here to assist you. Reach out to us at support@tqmmart.com or call us at (123) 456-7890.",
  },
];
