"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  BarChart2,
  Database,
  Edit3,
  FileText,
  Lock,
  Map,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
const features = [
  {
    icon: Database,
    title: "Product Catalog Management",
    description:
      "Create and manage products with custom attributes, SKUs, categories, pricing, and stock level settings.",
    href: "/features/product-catalog",
  },
  {
    icon: BarChart2,
    title: "Real-time Inventory Tracking",
    description:
      "Monitor stock levels across multiple locations with automated alerts for low inventory and detailed history logs.",
    href: "/features/inventory-tracking",
  },
  {
    icon: Map,
    title: "Multi-location Support",
    description:
      "Seamlessly manage inventory across different store locations with easy stock transfer capabilities.",
    href: "/features/multi-location",
  },
  {
    icon: Edit3,
    title: "Stock Adjustment Tools",
    description:
      "Record and track inventory changes with custom reason codes, audit trails, and adjustment history.",
    href: "/features/stock-adjustments",
  },
  {
    icon: ShoppingCart,
    title: "Sales Order Management",
    description:
      "Process customer orders efficiently with status tracking, customizable invoicing, and fulfillment monitoring.",
    href: "/features/sales-orders",
  },
  {
    icon: Users,
    title: "Customer Relationship Management",
    description:
      "Maintain comprehensive customer profiles with segmentation, purchase history, and specialized pricing tiers.",
    href: "/features/customer-management",
  },
  {
    icon: ShoppingBag,
    title: "Purchase Order System",
    description:
      "Create and track supplier orders with receiving functionality and automated reordering capabilities.",
    href: "/features/purchase-orders",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    description:
      "Manage supplier relationships, link products to suppliers, and track performance metrics.",
    href: "/features/supplier-management",
  },
  {
    icon: FileText,
    title: "Comprehensive Reporting",
    description:
      "Generate detailed reports for inventory levels, sales performance, purchase orders, and stock forecasting.",
    href: "/features/reporting",
  },
  {
    icon: Lock,
    title: "Role-based Access Control",
    description:
      "Secure user management with customizable permissions for different staff roles and responsibilities.",
    href: "/features/user-management",
  },
];

const Header = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // console.log("call");
    
    const userObject = Cookies?.get("user");

    if (userObject) {
      try {
        const jsonStr = decodeURIComponent(userObject);
        const dataJson = JSON.parse(jsonStr);
        setUserData(dataJson);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        {/* Left side logo and nav items */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              className=" w-32"
              src="/ninventoryPro.png"
              alt="inventory logo"
              width={200}
              height={200}
            />
          </Link>
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 max-w-max flex-1 items-center justify-center  xl:flex  hidden"
          >
            <ul className="group flex list-none items-center justify-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="group inline-flex h-9 items-center justify-center rounded-md bg-background  text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  <Button variant="ghost" className="rounded-sm">
                    {" "}
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                      <NavigationMenuContent className="md:w-[42rem] bg-white shadow-lg rounded-sm p-3">
                        {/* Header Section */}
                        <div className="border-b-2 flex justify-between pb-2 mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Features
                            </h3>
                          </div>
                          <div>
                            <span className="text-sm text-blue-500 cursor-pointer hover:underline">
                              View all
                            </span>
                          </div>
                        </div>

                        {/* Features Grid */}
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                          {features &&
                            features.map((item, index) => (
                              <div key={index} className="flex gap-4 ">
                                {/* Icon */}
                                <div>
                                  <item.icon className="text-blue-500 h-8 w-8" />
                                </div>

                                {/* Text Content */}
                                <div>
                                  <h2 className="text-sm hover:text-blue-500 cursor-pointer font-semibold text-gray-800">
                                    {item.title}
                                  </h2>
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Lower content section */}
                        <div className="border-t-2 flex justify-between pt-2">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                              Get started
                            </h3>
                            <p className="text-xs text-gray-400">
                              Am really excited for all these features out of
                              the box
                            </p>
                          </div>
                          <div>
                            <Button variant={"secondary"}>Get Started</Button>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="group inline-flex h-9 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  <Button variant={"ghost"} className="rounded-sm">
                    {" "}
                    Pricing
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right side buttons */}
        <div className=" md:flex items-center space-x-4">
          {userData?.isVerified ? (
            <>
              <Button variant="ghost" className="bg-gray-50 rounded-sm p-2">
                <Avatar>
                  <AvatarFallback>
                    {userData?.firstName?.charAt(0)}
                    {userData?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="default" className="bg-red-600 rounded-sm">
                <Link href="/register">Signup</Link>
              </Button>
            </>
          )}
        </div>

      
      
      </div>
    </header>
  );
};

export default Header;
