"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { SquareArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleCall } from "@/actions/history";
import { getCurrentUser } from "@/actions/user";
import { CallHistory } from "@/types";
import { toast } from "react-toastify";

const SingleHistory = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [call, setCall] = useState<CallHistory | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await getCurrentUser();
        const callData = await getSingleCall(user.email, id);
        if (!callData) {
          return (
            <div className="bg-white text-black flex items-center flex-col justify-center">
              <h1>The page you are looking for does not exist.</h1>
              <Link href={"/history"}>
                <Button variant={"secondary"}>
                  Go back
                  <SquareArrowLeft className="ml-2" />
                </Button>
              </Link>
            </div>
          );
        } else {
          setCall(callData);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching call details:", error);
        toast.error(error.message || "Error fetchin call details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
      case "in-progress":
      case "ringing":
        return "bg-blue-500 text-white";
      case "no-answer":
      case "busy":
        return "bg-red-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!call) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/history" passHref>
          <Button variant="ghost" size="icon">
            <SquareArrowLeft className="size-10" />
            <span className="sr-only">Exit</span>
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Call ID: {call.call_id}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(call.call_id);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy Call ID</span>
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Call Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailItem label="From" value={call.call_from} />
            <DetailItem label="To" value={call.call_to} />
            <DetailItem
              label="Date & Time"
              value={`${call.call_date} at ${call.call_time}`}
            />
            <DetailItem
              label="Duration"
              value={`${call.call_duration} seconds`}
            />
            <DetailItem
              label="Status"
              value={
                <Badge className={getStatusColor(call.call_status)}>
                  {call.call_status}
                </Badge>
              }
            />
            <DetailItem
              label="Direction"
              value={
                <Badge variant="outline">
                  {call.inbound ? "Inbound" : "Outbound"}
                </Badge>
              }
            />
            <DetailItem
              label="Price"
              value={`$${call.price ? call.price.toFixed(2) : "0.00"}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {call.call_transcript || "No transcript available"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {call.summary || "No summary available"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <audio controls className="w-full" src="/demo-recording.mp3">
              Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{label}</p>
      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
}

// Loading state
function Loading() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-6 w-48" />
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SingleHistory;
