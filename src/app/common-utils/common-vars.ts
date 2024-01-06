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
