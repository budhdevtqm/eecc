"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const pathName = usePathname();
  return (
    <footer className="bg-blackColor py-8 px-8 text-white">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="list-none">
            <li className="mb-2">
              <Link href="/admin">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/product">Products</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/categories">Categories</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/user">Users</Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Connect With Us
          </h3>
          <div className="flex space-x-8 iems-center justify-center">
            <Link href={pathName} className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </Link>
            <Link href={pathName} className="text-gray-400 hover:text-white">
              <FaTwitter />
            </Link>
            <Link href={pathName} className="text-gray-400 hover:text-white">
              <FaInstagram />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <p className="text-center">
            &copy; 2024 TQM Mart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
