"use client";
import React, { useEffect, useState } from "react";
import { userRoutes } from "./routes";
import { usePathname, useRouter } from "next/navigation";
import { getUserRole, getUserEmail } from "../common-utils/common-fns";
import Link from "next/link";

interface Route {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const router = useRouter();
  const userRole = getUserRole();
  const userEmail = getUserEmail();

  useEffect(() => {
    if (!userRole && !userEmail) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("role");
      router.push("/auth");
    }
  }, [userRole]);

  return (
    <nav className="flex gap-4 text-[14px] px-4">
      {userRoutes.map((link, index) => (
        <Link
          key={index}
          className={
            pathName === link.path
              ? "font-medium text-primary p-2"
              : "font-medium hover:text-primary p-2"
          }
          href={link.path}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
