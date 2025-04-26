"use client";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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

import { Pagination } from "@mui/material";
import { useDebounceValue } from "usehooks-ts";
import {
  useDeleteOrganizationMutation,
  useGetAllOrganizationsQuery,
} from "@/hooks/Api/organizations/organizationsHook";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";




const Page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [page, setPage] = useState(1);
  const [roleId, setRoleId] = useState("");
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const { data, isLoading } = useGetAllOrganizationsQuery({
    page: page,
    limit: 5,
    name: debouncedValue,
    roleId: roleId,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [deleteOrganization, { isLoading: isDeleting }] =
    useDeleteOrganizationMutation();
  console.log("data", data);
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Profile Image",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center p-2">
          <Image
          unoptimized
            alt={params?.row?.name}
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
      field: "orgName",
      headerName: "Org Name",
      // renderCell: (params) => (
      //   <div className="flex  items-center p-2 gap-2">
      //     <p>{params?.row?.orgName}</p>
      //     {/* <p>{params?.row?.lastName}</p> */}
      //   </div>
      // ),
      width: 150,
      align: "left",
      headerAlign: "left",
      filterable: false,
    },
    {
      field: "adminName",
      headerName: "Admin Name",
      width: 200,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      filterable: false,
    },
  
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 160,
      filterable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orgStatus",
      headerName: "Org Status",
      width: 160,
      filterable: false,
      headerAlign: "center",
      align: "center",
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
            <Link href={`/dashboard/users/organizations/${params?.row?._id}`}>
              View
            </Link>
          </Button>
  
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectedOrgId(params?.row?._id);
              setOpenDialog(true);
            }}
          >
            delete
          </Button>
          {/* You can add delete confirmation modal if needed */}
        </div>
      ),
    },
  ];
  const handleDelete = async () => {
    if (selectedOrgId) {
      // setIsDeleting(true);
      try {
        await deleteOrganization(selectedOrgId).unwrap();
        setOpenDialog(false);
        toast.success("Organization and users deleted successfully!"); // Success message
      } catch (err) {
        console.error("Error deleting org:", err);
        toast.error("Failed to delete the organization."); // Error message
      } finally {
        // setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-full   overflow-auto w-full p-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-[#d72325]">
            🏢 Organizations ({data?.pagination?.totalResults || 0})
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search users..."
            className="w-full"
            type="text"
            onChange={(event) => {
              setValue(event.target.value);
              setPage(1);
            }}
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
        <div className="bg-white flex flex-col overflow-auto rounded-xl shadow-md  border w-full ">
          <DataGrid
            loading={isLoading}
            rows={data?.data || []}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            hideFooter
            hideFooterPagination
            disableRowSelectionOnClick
            rowSelection={false}
          />

          <div className="flex justify-end p-2">
            <Pagination
              count={data?.pagination?.totalPages || 0}
              page={data?.pagination?.page || 1}
              onChange={(_, value) => setPage(value)}
            />
          </div>
        </div>
        
      </div>
      <div className="z-[80]">
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="max-h-[80vh] overflow-y-auto z-[80] ">
        <DialogHeader>
              <DialogTitle className="sr-only">Confirm Deletion</DialogTitle>
              {/* 'sr-only' class hides the title visually, but makes it accessible */}
            </DialogHeader>
          <p>
            Are you sure you want to delete this organization and all its users?
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    
    </div>

      
    </>
  );
};

export default Page;
