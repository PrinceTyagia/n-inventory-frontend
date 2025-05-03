"use client";
import React, { useState } from "react";
import { CalendarIcon, Download, Plus, Upload, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  useGetAllUserByOrgQuery,
  useGetAllUserQuery,
} from "@/hooks/Api/user/userHook";
import { Pagination } from "@mui/material";
import { useDebounceValue } from "usehooks-ts";
import Cookies from "js-cookie";
import Image from "next/image";

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Profile Image",
    width: 100,
    renderCell: (params) => (
      <div className="flex justify-center items-center p-2">
        <Image
        unoptimized
        width={10}
        height={10}
        priority
          alt={params?.row?.firstName}
          src={params?.value || "/placeholder.webp"}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    ),
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "firstName",
    headerName: "Name",
    renderCell: (params) => (
      <div className="flex gap-2">
        <p>{params?.row?.firstName}</p>
        <p>{params?.row?.lastName}</p>
      </div>
    ),
    width: 150,
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    filterable: false,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 160,
    filterable: false,
  },
  {
    field: "roleName",
    headerName: "Role",
    width: 150,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => <p>{params?.row?.roleName || "N/A"}</p>,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 250,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <div className="flex justify-center items-center p-2 gap-2">
        <Button size="sm" variant="outline">
          View
        </Button>
        <Button size="sm" variant="secondary">
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          delete
        </Button>
        {/* You can add delete confirmation modal if needed */}
      </div>
    ),
  },
];

const Page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [page, setPage] = useState(1);
  const [roleId, setRoleId] = useState("");
  const [invite,setInvite] = useState(false)
  // console.log("invite",invite);
  
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const isSuperAdmin = user?.role === "superAdmin";
  const { data: data1, isLoading: isLoading1 } = useGetAllUserQuery(
    {
      page: page,
      limit: 10,
      name: debouncedValue,
      roleId: roleId,
    },
    {
      skip: !isSuperAdmin, // will skip the query if not superAdmin
    }
  );
  const { data: data2, isLoading: isLoading2 } = useGetAllUserByOrgQuery(
    {
      page: page,
      limit: 10,
      name: debouncedValue,
      roleId: roleId,
      invite:invite
    },
    {
      skip: isSuperAdmin,
    }
  );

  return (
    <Tabs value={invite ? "invites" : "users"}>
      {
        !isSuperAdmin && (<TabsList>
          <TabsTrigger
            className="w-44 hover:text-[#d72325] cursor-pointer"
            value="users"
            onClick={() => setInvite(false)}
          >
            Users
          </TabsTrigger>
          
      
          <TabsTrigger
            className="hover:text-[#d72325] cursor-pointer"
            value="invites"
            onClick={() => setInvite(true)}
          >
            Invites
          </TabsTrigger>
            </TabsList>)
      }
    

      <TabsContent value={invite ? "invites" : "users"}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-[#d72325]">
            👥 Users ({data1?.totalUsers || data2?.totalUsers})
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Invite
            </Button>
            <Button className="bg-[#d72325]">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search users..."
            className="w-full"
            type="text"
            onChange={(event) => setValue(event.target.value)}
          />

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Role Filter */}
          <Select
            onValueChange={(value) => {
              setRoleId(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="67f26ed6aec65880db09d1a0">
                Superadmin
              </SelectItem>
              <SelectItem value="67f26f24aec65880db09d1a4">admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border">
          <DataGrid
            loading={isLoading1 || isLoading2}
            rows={data1?.users || data2?.users}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            hideFooter
            hideFooterPagination
            disableRowSelectionOnClick
          />
          <div className="flex justify-self-end p-2">
            <Pagination
              count={data1?.totalPages || data2?.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </div>
        </div>
      </TabsContent>

    </Tabs>
  );
};
export default Page;
