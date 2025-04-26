"use client";
import React, { useState } from "react";
import { CalendarIcon, Download, Plus } from "lucide-react";
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
  Dialog,

  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pagination } from "@mui/material";
import { useDebounceValue } from "usehooks-ts";

import Link from "next/link";
import { useDeleteRoleMutation, useGetAllRoleQuery } from "@/hooks/Api/role/roleHook";
import { toast } from "sonner";

const Page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [page, setPage] = useState(1);
  const [roleId, setRoleId] = useState("");
  const [debouncedValue, setValue] = useDebounceValue("", 500);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
    const [deleteRole, { isLoading: isDeleting }] =
    useDeleteRoleMutation();
  const { data, isLoading } = useGetAllRoleQuery({
    page: page,
    limit: 10,
    name: debouncedValue,
    roleId: roleId,
  });
  const columns: GridColDef[] = [
    {
      field: "roleName",
      headerName: "Role Title",
      width: 150,
      align: "left",
      headerAlign: "center",
      filterable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      filterable: false,
    },

    {
      field: "createdAt",
      headerName: "createdAt",
      width: 150,
      filterable: false,
      align: "center",
      headerAlign: "center",
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
          <Button size="sm" variant="secondary">
         <Link href={`/dashboard/users/roles-permissions/${params?.row?._id}`}>
         Edit
         </Link>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectedRoleId(params?.row?._id);
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
      if (selectedRoleId) {
        // setIsDeleting(true);
        try {
          await deleteRole(selectedRoleId).unwrap();
          setOpenDialog(false);
          toast.success(" Role deleted successfully!"); // Success message
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
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-[#d72325]">
          🧑‍💼 Roles ({data?.totalRoles})
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>

          <Link href="/dashboard/users/roles-permissions/add-role">
            <Button className="bg-[#d72325]">
              <Plus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search role title..."
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
            <SelectItem value="67f26ed6aec65880db09d1a0">Superadmin</SelectItem>
            <SelectItem value="67f26f24aec65880db09d1a4">admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border">
        <DataGrid
          loading={isLoading}
          rows={data?.roles}
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
            count={data?.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
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
