"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Task data type - ready for backend integration
export interface Task {
  id: string;
  reportId: string;
  reportName: string;
  status: "updating" | "not-started" | "in-progress" | "completed" | "pending";
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskManagementProps {
  tasks?: Task[];
  isLoading?: boolean;
}

export default function TaskManagement() {
  // This will be replaced with backend data later
  const [tasks] = useState<Task[] | undefined>(undefined);
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Status button variants mapping
  const getStatusButtonVariant = (status: Task["status"]) => {
    switch (status) {
      case "updating":
        return "default" as const;
      case "not-started":
        return "outline" as const;
      case "in-progress":
        return "secondary" as const;
      case "completed":
        return "default" as const;
      case "pending":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  const getStatusButtonClassName = (status: Task["status"]) => {
    switch (status) {
      case "updating":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "not-started":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      case "in-progress":
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      case "completed":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "pending":
        return "bg-orange-600 hover:bg-orange-700 text-white";
      default:
        return "";
    }
  };

  const formatStatus = (status: Task["status"]) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Task View</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Header with Search and Status Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-medium text-foreground">
                  Showing Report List
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative flex-1 sm:flex-initial sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search Report"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {/* Status Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedStatus === "updating" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setSelectedStatus(
                          selectedStatus === "updating" ? null : "updating"
                        )
                      }
                      className={
                        selectedStatus === "updating"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-blue-100 hover:bg-blue-200 text-gray-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-gray-200"
                      }
                    >
                      Updating
                    </Button>
                    <Button
                      variant={selectedStatus === "not-started" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setSelectedStatus(
                          selectedStatus === "not-started" ? null : "not-started"
                        )
                      }
                      className={
                        selectedStatus === "not-started"
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-yellow-100 hover:bg-yellow-200 text-gray-700 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-gray-200"
                      }
                    >
                      Not Started
                    </Button>
                    <Button
                      variant={selectedStatus === "confirmed" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setSelectedStatus(
                          selectedStatus === "confirmed" ? null : "confirmed"
                        )
                      }
                      className={
                        selectedStatus === "confirmed"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-green-100 hover:bg-green-200 text-gray-700 dark:bg-green-900 dark:hover:bg-green-800 dark:text-gray-200"
                      }
                    >
                      Confirmed
                    </Button>
                    <Button
                      variant={selectedStatus === "rejected" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setSelectedStatus(
                          selectedStatus === "rejected" ? null : "rejected"
                        )
                      }
                      className={
                        selectedStatus === "rejected"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-red-100 hover:bg-red-200 text-gray-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-gray-200"
                      }
                    >
                      Rejected
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground">
                              Loading tasks...
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : !tasks || tasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              No tasks available
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Tasks will appear here once loaded from the backend
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">
                            {task.reportId}
                          </TableCell>
                          <TableCell>{task.reportName}</TableCell>
                          <TableCell>
                            <Button
                              variant={getStatusButtonVariant(task.status)}
                              size="sm"
                              className={getStatusButtonClassName(task.status)}
                            >
                              {formatStatus(task.status)}
                            </Button>
                          </TableCell>
                          <TableCell>
                            {task.assignedTo || "—"}
                          </TableCell>
                          <TableCell>
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell>
                            {task.createdAt
                              ? new Date(task.createdAt).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell>
                            {task.updatedAt
                              ? new Date(task.updatedAt).toLocaleDateString()
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
