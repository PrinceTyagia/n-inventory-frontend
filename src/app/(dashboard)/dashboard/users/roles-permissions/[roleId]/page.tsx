"use client";
import React, { useEffect, useState } from "react";
import { modulePermissions } from "../../../../../../../constant/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetRoleByOrgQuery,
  usePutRoleByOrgMutation,
} from "@/hooks/Api/role/roleHook";
import { useParams, useRouter } from "next/navigation";

// Permission data

const PermissionCard: React.FC<{
  moduleData: { module: string; permissions: string[] };
  selectedPermissions: string[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ moduleData, selectedPermissions, setSelectedPermissions }) => {
  const { module, permissions } = moduleData;

  const isChecked = (operation: string) =>
    selectedPermissions.includes(`${module}.${operation}`);

  const handleCheckboxChange = (operation: string) => {
    const key = `${module}.${operation}`;
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const moduleOps = permissions.map((op) => `${module}.${op}`);
    setSelectedPermissions((prev) =>
      checked
        ? [...new Set([...prev, ...moduleOps])]
        : prev.filter((perm) => !moduleOps.includes(perm))
    );
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="border p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{capitalize(module)}</h3>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={permissions.every((op) => isChecked(op))}
            onChange={handleSelectAllChange}
            className="w-4 h-4"
          />
        </label>
      </div>
      <div className="mt-2 space-y-1">
        {permissions.map((op) => (
          <label
            key={op}
            className="flex items-center rounded-md gap-2 text-sm capitalize"
          >
            <input
              type="checkbox"
              checked={isChecked(op)}
              onChange={() => handleCheckboxChange(op)}
              className="w-4 h-4 "
            />
            {op}
          </label>
        ))}
      </div>
    </div>
  );
};

const PermissionModuleList: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [putRoleByOrg, { isLoading, isSuccess, error }] =
  usePutRoleByOrgMutation();
  const { data } = useGetRoleByOrgQuery({ roleId: params.roleId });

  useEffect(() => {
    if (data?.role) {
      setRoleName(data.role.roleName || "");
      setRoleDescription(data.role.description || "");
      setSelectedPermissions(data.role.permissions || []);
    }
  }, [data]);

  const handleSubmit = async () => {
    // console.log("Submitting permissions:", selectedPermissions);
    if (!roleName || !roleDescription) {
      toast.error("Please enter role name and description");
      return;
    }
    const payload = {
        roleId:params.roleId,
      roleName: roleName,
      description: roleDescription,
      permissions: selectedPermissions,
    };
    try {
      const res = await putRoleByOrg(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/users/roles-permissions");
      }
    } catch (error: any) {
      console.log("error", error);

      toast.error(error?.data?.message);
    }
    // You can pass selectedPermissions to your API
    // axios.post("/api/roles", { permissions: selectedPermissions });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-4 text-gray-800">
        <Link href="/dashboard/users/roles-permissions">
          <ArrowLeftFromLine className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Link>
        Edit Role
      </h2>
      <h2 className="text-2xl font-bold"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 p-6 mb-4 gap-2 shadow-xs rounded-md">
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <Input
            type="text"
            value={roleName || ""}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="e.g., Inventory Manager"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Role Description
          </label>
          <Input
            type="text"
            value={roleDescription || ""}
            onChange={(e) => setRoleDescription(e.target.value)}
            placeholder="e.g., Manages inventory related tasks"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>
      <div className="p-6  gap-2 shadow-lg rounded-md ">
        <h2 className="text-xl font-semibold mb-2">
          Select Permissions the User will have access to
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {modulePermissions.map((mod) => (
            <PermissionCard
              key={mod.module}
              moduleData={mod}
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit} className="bg-[#d72325]">
          {isLoading ? "Update Role..." : "Update Role"}
        </Button>
      </div>
    </div>
  );
};

export default PermissionModuleList;
