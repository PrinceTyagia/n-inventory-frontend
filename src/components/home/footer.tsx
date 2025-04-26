import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 md:px-8 lg:px-16 rounded-t-[2.5rem] relative overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
  </div>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
  <div className="relative">
    <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          Manage your Inventory with Inventory Pro
        </h2>
        <p className="text-gray-400 max-w-xl text-base">
          Inventory Pro offers a comprehensive solution for businesses to track
          products, manage stock levels across multiple locations, process sales
          orders, and handle supplier relationships.
        </p>
      </div>
      <div className="flex gap-4 md:flex-row flex-col">
        <button className="px-6 md:!py-1 py-3 border border-gray-700 hover:border-emerald-500 rounded-full text-gray-300 hover:text-emerald-400 transition-all duration-300 block">
          Get Support
        </button>
        <Link
          className="group inline-flex items-center px-4 md:px-6 py-2.5 bg-gradient-to-r from-[#00bf8f] to-[#001510] text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 relative overflow-hidden "
          href="#"
        >
          <span className="relative z-10 flex items-center gap-4 text-sm md:text-base">
            Purchase Now
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black transition-transform group-hover:rotate-45">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-up-right w-6 h-4"
              >
                <path d="M13 5H19V11" />
                <path d="M19 5L5 19" />
              </svg>
            </div>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        <div className="lg:col-span-4">
          <Link className="flex items-center space-x-2" href="/">
            <div className="">
              <Image
                className="w-32 "
                src="/ninventoryPro.png"
                alt="inventory log"
              unoptimized
              />
            </div>
          </Link>
          <div className="flex flex-col mt-6">
            <h3 className="text-base font-semibold mb-4 text-gray-200">
              Social Media Links
            </h3>
            <div className="flex gap-4">
              <Link
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-emerald-500/20 transition-all duration-300"
                href="#"
              >
                <Image
                  alt="https://cdn-icons-png.flaticon.com/128/5968/5968764.png icon"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                 
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: "transparent" }}
                  unoptimized
                  src="/_next/image?url=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F5968%2F5968764.png&w=48&q=75"
                />
              </Link>
              <Link
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-emerald-500/20 transition-all duration-300"
                href="#"
              >
                <Image
                  alt="https://cdn-icons-png.flaticon.com/128/3670/3670151.png icon"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                 unoptimized
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: "transparent" }}
                 
                  src="/_next/image?url=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F3670%2F3670151.png&w=48&q=75"
                />
              </Link>
              <Link
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-emerald-500/20 transition-all duration-300"
                href="#"
              >
                <Image
                  alt="https://cdn-icons-png.flaticon.com/128/145/145807.png icon"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                 
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: "transparent" }}
                 unoptimized
                  src="/_next/image?url=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F145%2F145807.png&w=48&q=75"
                />
              </Link>
              <Link
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-emerald-500/20 transition-all duration-300"
                href="#"
              >
                <Image
                  alt="https://cdn-icons-png.flaticon.com/128/3670/3670176.png icon"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                 
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: "transparent" }}
                  unoptimized
                  src="/_next/image?url=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F3670%2F3670176.png&w=48&q=75"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold mb-4 text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/#pricing"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/docs"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Documentation
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/showcase"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Showcase
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/agency"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Agency Site
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="https://wa.me/message/5USU26346OWRF1"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-base font-semibold mb-4 text-gray-200">
            Services
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="/"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                hello
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="https://wa.me/message/5USU26346OWRF1"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                hello
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="https://wa.me/message/5USU26346OWRF1"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                hello
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                href="https://wa.me/message/5USU26346OWRF1"
              >
                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                hello
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-base font-semibold mb-4 text-gray-200">
            Contact Information
          </h3>
          <ul className="space-y-4">
            <li className="text-gray-400 text-sm flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </span>
              Phone: {/* */}+91 9149391653
            </li>
            <li className="text-gray-400 text-sm flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </span>
              Email: {/* */}princetyagi199816@gmail.com
            </li>
            <li className="text-gray-400 text-sm flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </span>
              Address:
              <br />
              Delhi
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">
          © {/* */}2025{/* */}{" "}
          <Link className="hover:text-emerald-400 transition-colors" href="/">
            NSoftware
          </Link>{" "}
          {/* */}|
          <Link className="hover:text-emerald-400 transition-colors ml-2" href="#">
            Privacy Policy
          </Link>{" "}
          {/* */}|
          <Link className="hover:text-emerald-400 transition-colors ml-2" href="#">
            Terms &amp; Conditions
          </Link>{" "}
          {/* */}|
          <Link className="hover:text-emerald-400 transition-colors ml-2" href="#">
            Accessibility
          </Link>
        </div>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer