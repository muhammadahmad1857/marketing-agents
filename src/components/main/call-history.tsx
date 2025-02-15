"use client";

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Trash2Icon,
  EyeIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./dataTable";
import Link from "next/link";
import { deleteHistory } from "@/actions/history";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface CallHistory {
  _id: string;
  call_id: string;
  call_to: string;
  call_from: string;
  call_date: string;
  call_time: string;
  call_duration: string;
  call_transcript: string;
  call_status: string;
  user_email: string;
  summary: string;
  price: number;
  inbound: boolean;
};

export function CallHistoryTable({ data }: { data: CallHistory[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const handleDelete = async (callId: string, userEmail: string) => {
    setDeletingId(callId);
    try {
      const response = await deleteHistory(callId, userEmail);
      toast.success(response.message);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete the history item");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<CallHistory>[] = [
    {
      accessorKey: "inbound",
      header: "",
      cell: ({ row }) => (
        <div className="w-4">
          {row.original.inbound ? (
            <ArrowDownIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowUpIcon className="h-4 w-4 text-blue-500" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "call_id",
      header: "Call ID",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.original.call_id}>
          {row.original.call_id}
        </div>
      ),
    },
    {
      accessorKey: "call_duration",
      header: "Duration",
      cell: ({ row }) => (
        <div>
          {row.original.call_duration ? `${row.original.call_duration}s` : "-"}
        </div>
      ),
    },
    {
      accessorKey: "call_date",
      header: "Date",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.call_date}</div>
      ),
    },
    {
      accessorKey: "call_time",
      header: "Time",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.call_time}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className={row.original.price ? "text-center" : ""}>
          {row.original.price ? `$${row.original.price.toFixed(3)}` : "-"}
        </div>
      ),
    },
    {
      accessorKey: "call_to",
      header: "To",
    },
    {
      accessorKey: "call_from",
      header: "From",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Button
            onClick={() =>
              handleDelete(row.original.call_id, row.original.user_email)
            }
            variant="destructive"
            size="sm"
            className="h-8 px-2"
            disabled={deletingId === row.original.call_id}
          >
            {deletingId === row.original.call_id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2Icon className="h-4 w-4 sm:mr-1" />
            )}
            <span className="hidden sm:inline">
              {deletingId === row.original.call_id ? "Deleting..." : "Delete"}
            </span>
          </Button>
          <Link href={`/history/${row.original.call_id}`}>
            <Button variant="secondary" size="sm" className="h-8 px-2">
              <EyeIcon className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">View</span>
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
