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
  "Our Mission",
  "Curated Selection",
  "Customer-Centric Approach",
  "Quality Assurance",
  "Explore, Shop, and Experience the Difference",
  "Contact Us",
];

export const bussinesHours = [
  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM (IST)" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM (IST)" },
  { day: "Sunday", time: "Closed" },
];
