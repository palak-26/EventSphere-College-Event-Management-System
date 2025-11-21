import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function LayoutWithSidebar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B18]">

      {/* TOP BAR */}
      <Topbar onMenuClick={() => setOpen(!open)} />

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full shadow-xl z-50 
          transform transition-transform duration-300 
          md:relative md:translate-x-0 md:w-full  md:flex md:block
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
        <main className="   px-4  ">
        {children}
      </main>
      </div>

      {/* MAIN CONTENT */}
      <div className="md:hidden">
        <div
        className={`
          fixed top-0 left-0 h-full w-72 shadow-xl z-50 
          transform transition-transform duration-300 
          md:relative md:translate-x-0 md:hidden md:flex md:block
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
        
      </div>
      <main className=" md:pt-20  px-4 sm:px-6 lg:px-10">
        {children}
      </main>
      </div>

    </div>
  );
}
