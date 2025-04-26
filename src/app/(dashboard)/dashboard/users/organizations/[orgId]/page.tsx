"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetOrganizationsByIdQuery } from "@/hooks/Api/organizations/organizationsHook";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

const ViewOrganization = () => {
  const params = useParams();
  console.log("slug", params.orgId);

  const [organization, setOrganization] = useState<any>(null);
  let { data } = useGetOrganizationsByIdQuery({ orgId: params?.orgId });

  console.log("data", data);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-4 text-gray-800">
        <Link href="/dashboard/users/organizations">
          <ArrowLeftFromLine className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Link>
        🏢 {data?.data?.orgName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Card */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            📌 Basic Info
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>Slug:</strong> {data?.data?.slug}
            </li>
            <li>
              <strong>Email:</strong> {data?.data?.email}
            </li>
            <li>
              <strong>Status:</strong> {data?.data?.orgStatus}
            </li>
            <li>
              <strong>Admin Name:</strong> {data?.data?.adminName}
            </li>
            <li>
              <strong>Active:</strong>{" "}
              {data?.data?.isActive ? "✅ Yes" : "❌ No"}
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            🌐 Contact & Web
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>Contact Number:</strong>{" "}
              {organization?.contactNumber || "-"}
            </li>
            <li>
              <strong>Alternate Email:</strong>{" "}
              {organization?.alternateEmail || "-"}
            </li>
            <li>
              <strong>Support Phone:</strong>{" "}
              {organization?.supportPhone || "-"}
            </li>
            <li>
              <strong>Support Email:</strong>{" "}
              {organization?.supportEmail || "-"}
            </li>
            <li>
              <strong>Website:</strong> {organization?.website || "-"}
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            🏠 Address
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>Address:</strong> {organization?.address || "-"}
            </li>
            <li>
              <strong>City:</strong> {organization?.city || "-"}
            </li>
            <li>
              <strong>Zipcode:</strong> {organization?.zipcode || "-"}
            </li>
            <li>
              <strong>Timezone:</strong> {data?.data?.timezone}
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            💳 Billing Info
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>Billing Plan:</strong> {data?.data?.billingPlan}
            </li>
            <li>
              <strong>Price:</strong> ₹{data?.data?.price}
            </li>
            <li>
              <strong>Billing Cycle:</strong> {data?.data?.billingCycle}
            </li>
            <li>
              <strong>Next Billing:</strong>{" "}
              {data?.data?.nextBillingDate || "-"}
            </li>
            <li>
              <strong>Subscription Ends:</strong>{" "}
              {data?.data?.subscriptionEndsAt || "-"}
            </li>
            <li>
              <strong>Payment Mode:</strong> {data?.data?.paymentMode}
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            📃 Tax Info
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>GSTIN:</strong> {organization?.gstin || "-"}
            </li>
            <li>
              <strong>PAN:</strong> {organization?.panNumber || "-"}
            </li>
            <li>
              <strong>License No:</strong> {organization?.licenseNumber || "-"}
            </li>
            <li>
              <strong>Tax Rate:</strong> {organization?.taxRate || 0}%
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            ⚙️ Settings
          </h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>
              <strong>Multi-location:</strong>{" "}
              {data?.data?.enableMultiLocation ? "✅ Enabled" : "❌ Disabled"}
            </li>
            <li>
              <strong>Inventory Alerts:</strong>{" "}
              {data?.data?.enableInventoryAlerts ? "✅ On" : "❌ Off"}
            </li>
            <li>
              <strong>Preferred Language:</strong>{" "}
              {data?.data?.preferredLanguage}
            </li>
            <li>
              <strong>Org Notes:</strong> {organization?.orgNotes || "None"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewOrganization;
