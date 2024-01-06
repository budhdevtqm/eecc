"use client";
import Link from "next/link";
import React from "react";

const SideNavbar: React.FC = () => {
  const links = [
    { id: 1, label: "Dashboard", path: "/admin" },
    { id: 2, label: "Categories", path: "/admin/categories" },
    { id: 3, label: "Products", path: "/admin/product" },
    { id: 4, label: "Orders", path: "/admin/orders" },
    { id: 5, label: "Users", path: "/admin/user" },
    { id: 6, label: "Profile", path: "/admin/profile" },
  ];
  return (
    <div className="min-h-[87vh]  w-[250px] py-8 z-10 bg-[#001000]">
      {
        <ul className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.path}
              className="text-white py-2 flex font-semibold items-center justify-center hover:bg-[#007200] hover:rounded-lg"
            >
              <li className="w-[110px]">{l.label}</li>
            </Link>
          ))}
        </ul>
      }
    </div>
  );
};

export default SideNavbar;
