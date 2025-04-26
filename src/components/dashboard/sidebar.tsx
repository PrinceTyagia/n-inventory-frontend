"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import { sidebarItems } from "../../../constant/label";
import Image from "next/image";



const Sidebar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Get user from cookie
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(userCookie));
        setUserData(parsed);
      } catch (err) {
        console.error("Invalid user cookie", err);
      }
    }
  }, []);

  // Auto-expand menu if current path matches child path
  useEffect(() => {
    const initialOpen: Record<string, boolean> = {};
    sidebarItems.forEach((item) => {
      const filteredChildren = item.children?.filter((child) =>
        child.permission ? userData?.permissions?.includes(child.permission) : true
      );
      const match = filteredChildren?.some((child) =>
        pathname.startsWith(`/${child.path}`)
      );
      if (match) {
        initialOpen[item.label] = true;
      }
    });
    setOpenMenus(initialOpen);
  }, [pathname, userData]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="w-80 h-screen bg-gray-100/40 shadow border-r flex flex-col">
      {/* Logo */}
      <div className="py-1 px-2 text-xl font-bold border-b shrink-0">
        <Image unoptimized src="/ninventoryPro.png" alt="logo" className="w-40" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {sidebarItems?.map((item, idx) => {
           const filteredChildren = item.children?.filter((child) =>
            userData?.permissions?.includes(child.permission)
          );

          if (item.children && (!filteredChildren || filteredChildren.length === 0)) {
            return null;
          }

          return (
            <div key={idx}>
              {/* Parent Label */}
              <div
                onClick={() => toggleMenu(item.label)}
                className="flex justify-between items-center cursor-pointer font-medium py-2 px-3 rounded-lg text-gray-700 hover:text-[#d72325] transition"
              >
                <span className="flex items-center gap-3">
                  <span>{item.icon}</span> {item.label}
                </span>
                <span>{openMenus[item.label] ? <ChevronDown /> : <ChevronRight />}</span>
              </div>

              {/* Children */}
              {openMenus[item.label] && (
                <ul className="pl-6 mt-2 space-y-1">
                  {filteredChildren?.map((child, cIdx) => {
                    const isActive = pathname.startsWith(`/${child.path}`);
                    return (
                      <li key={cIdx}>
                        <Link
                          href={`/${child.path}`}
                          className={`block py-1.5 px-3 rounded-md text-sm transition ${
                            isActive
                              ? "bg-[#d72325] text-white font-semibold"
                              : "text-gray-700 hover:text-[#d72325]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
