"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { sidebarItems } from "../../../constant/label";
import Image from "next/image";
import {
  useGetOrganizationsQuery,
  useGetTrialOrganizationsQuery,
} from "@/hooks/Api/organizations/organizationsHook";

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { data } = useGetOrganizationsQuery(null);
  const { data: trialData } = useGetTrialOrganizationsQuery({
    orgId: data?.data?._id,
  });

  // Get user from cookie
  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   if (userCookie) {
  //     try {
  //       const parsed = JSON.parse(decodeURIComponent(userCookie));
  //       setUserData(parsed);
  //     } catch (err) {
  //       console.error("Invalid user cookie", err);
  //     }
  //   }
  // }, []);

  // Auto-expand menu if current path matches child path
  useEffect(() => {
    const initialOpen: Record<string, boolean> = {};
    sidebarItems.forEach((item) => {
      const filteredChildren = item.children?.filter((child) =>
        child.permission
          ? data?.data?.roles[0]?.permissions?.includes(child.permission)
          : true
      );
      const match = filteredChildren?.some((child) =>
        pathname.startsWith(`/${child.path}`)
      );
      if (match) {
        initialOpen[item.label] = true;
      }
    });
    setOpenMenus(initialOpen);
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // en-GB format (13/5/2025)
  };

  return (
    <aside className="w-80 h-screen bg-gray-100/40 shadow border-r flex flex-col">
      {/* Logo */}
      <div className="py-1 px-2 text-xl font-bold border-b shrink-0">
        <Image
          unoptimized
          src="/ninventoryPro.png"
          alt="logo"
          width={40}
          height={40}
          className="w-40"
        />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {sidebarItems?.map((item, idx) => {
          const filteredChildren = item.children?.filter((child) =>
            data?.data?.roles[0]?.permissions?.includes(child.permission)
          );

          if (
            item.children &&
            (!filteredChildren || filteredChildren.length === 0)
          ) {
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
                <span>
                  {item.children ? (
                    openMenus[item.label] ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )
                  ) : null}
                </span>
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
      <div className="bg-[#d72325] text-white rounded-lg shadow-lg p-2 mx-2 my-2 max-w-xs transition-all hover:shadow-2xl hover:scale-105">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{trialData?.data?.orgName}</h2>
          <p className="text-xs">{trialData?.data?.billingPlan} Plan</p>
        </div>

        {/* Trial Status */}
        <div className="border-t-1 border-b-1 border-white pt-1 pb-1 mt-2">
          <p className="text-xs">{trialData?.data?.trialStatus}</p>
          <div className="flex justify-between items-center">
            <p className="text-xs mt-1">
              <span className="font-semibold">Remaining Days:</span>{" "}
              {trialData?.data?.remainingDays}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Ends At:</span>{" "}
              {formatDate(trialData?.data?.subscriptionEndsAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-2">
        <button 
      className="bg-white text-[#d72325] font-semibold py-1.5 px-4 rounded-full hover:bg-gray-200 transition transform animate-pulse"
    >
      Upgrade Plan
    </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
