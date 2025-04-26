import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Link from "next/link";
import { ArrowRight, Database, ShoppingCart } from "lucide-react";

const HeroSection = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  return (
    <div className="relative  bg-red-950 text-gray-100 overflow-hidden min-h-[70vh]">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#b91c1c15_1px,transparent_1px),linear-gradient(to_bottom,#b91c1c15_1px,transparent_1px)]"
        style={{
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(60% 50% at 50% 0%, rgb(0, 0, 0) 70%, transparent 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 pt-14 md:pt-16  sm:px-6 lg:px-8">
        <div className="text-center mb-8 z-50">
          <div className="inline-flex font-roboto-mono items-center rounded-full px-4 py-1.5 text-xs bg-gray-50/5 text-gray-300 border border-gray-800">
            ✨ New: Multi-location inventory tracking now available
          </div>
        </div>
        <div className="relative text-center max-w-4xl mx-auto mb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/30 rounded-full blur-3xl" />
          <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute -left-10 top-0 rotate-6 hover:-rotate-6 p-4 rounded-2xl bg-red-900/50 border-red-800 backdrop-blur-sm transform transition-transform duration-300 ease-in-out hidden md:block">
            <Database className="w-6 h-6 text-red-400" />
          </div>
          <div className="absolute -right-13 top-12 -rotate-12 hover:rotate-12 p-4 rounded-2xl bg-red-900/50 border-red-800 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ">
            <ShoppingCart className=" w-6 h-6 text-red-400" />
          </div>
          <div className="absolute left-1/2 -top-32 rotate-12 hover:-rotate-12 p-4 rounded-2xl bg-red-900/50 border-red-800 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ">
            <ShoppingCart className=" w-6 h-6 text-red-400" />
          </div>
          <h1 className="text-xl font-roboto-mono md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-400 to-pink-400 hidden md:block">
            Simplify Your Inventory
            <br />
            Management with nInventory Pro
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-400 to-pink-400 md:hidden px-2">
            Simplify Inventory Management with nInventory Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Inventory Pro offers a comprehensive solution for businesses to
            track products, manage stock levels across multiple locations,
            process sales orders, and handle supplier relationships. Boost
            efficiency, reduce stockouts, and gain valuable insights with our
            powerful yet easy-to-use inventory management system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-full h-12 px-6 text-base"
              href="/register"
            >
              Start Free Trial
              <ArrowRight className=" ml-2 h-4 w-4" />
            </Link>
            <div>
              <button
                className="bg-transparent relative text-xl h-12 w-52 p-[1px] overflow-hidden"
                style={{ borderRadius: "1.75rem" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ borderRadius: "calc(1.68rem)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="absolute h-full w-full"
                    width="100%"
                    height="100%"
                  >
                    <rect
                      fill="none"
                      width="100%"
                      height="100%"
                      rx="30%"
                      ry="30%"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      display: "inline-block",
                      transform:
                        "translateX(95.5832px) translateY(48px) translateX(-50%) translateY(-50%)",
                    }}
                  >
                    <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
                  </div>
                </div>
                <div
                  className="relative border backdrop-blur-xl flex items-center justify-center w-full h-full text-sm antialiased bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 px-6"
                  style={{ borderRadius: "calc(1.68rem)" }}
                >
                  <Link href="/#demo">View Demo</Link>
                </div>
              </button>
            </div>
          </div>
          <div className="pt-8 pb-4 flex items-center  justify-center gap-8">
            <div className="">
              <div className="flex flex-row items-center justify-center w-full">
                <AnimatedTooltip items={people} />
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 576 512"
                  className="text-orange-400 w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 576 512"
                  className="text-orange-400 w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 576 512"
                  className="text-orange-400 w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 576 512"
                  className="text-orange-400 w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 576 512"
                  className="text-orange-400 w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
              </div>
              <p className="dark:text-slate-900">15 people trust it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
