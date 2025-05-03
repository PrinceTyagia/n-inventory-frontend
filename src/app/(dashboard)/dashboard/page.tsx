"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
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
    <div className="h-full min-h-0 flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Organisation Info</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Organisation ID:</span> {userData?.organisationId || "Not found"}</p>
          <p><span className="font-semibold">Organisation Name:</span> {userData?.organisation || "Not found"}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
