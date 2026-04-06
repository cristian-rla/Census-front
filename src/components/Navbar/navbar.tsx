"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const routes = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Contacts", icon: "contacts", href: "/contacts" },
  { name: "Inventory", icon: "inventory_2", href: "/inventory" },
  { name: "Negotiations", icon: "view_kanban", href: "/negotiations" },
];
export default function Navbar() {
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <aside className="h-screen w-64 fixed top-0 left-0 z-40 bg-neutral-1 flex flex-col p-4 gap-8">
      {/* <div className="container mx-auto flex flex-col items-center justify-between"> */}
      <span className="text-lg font-bold text-slate-900">Census CRM</span>
      {/* </div> */}
      <nav className="flex flex-col text-white gap-2  ml-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            className={`${pathname.startsWith(route.href) ? "bg-white text-primary-3 p-2" : "text-slate-500"} flex flex-row items-center gap-4 mt-4`}
            href={route.href}
          >
            <span className="material-symbols-outlined">{route.icon}</span>
            <span className="text-xs font-semibold">{route.name}</span>
          </Link>
        ))}
      </nav>
      <button className="mt-auto bg-primary-3 rounded-lg p-2 flex flex-rows items-center justify-center gap-2 text-white font-light text-sm">
        <span className="material-symbols-outlined">add</span>
        New project
      </button>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-4 ml-4 text-slate-500 text-xs font-semibold">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </label>
        <label className="flex items-center gap-4 ml-4 text-slate-500 text-xs font-semibold">
          <span className="material-symbols-outlined">help</span>
          Support
        </label>
      </div>
    </aside>
  );
}
