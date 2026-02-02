"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

// Task data types - ready for backend integration
export interface Task {
  id: string;
  reportName: string;
  status: "Updating" | "Not Started" | "Confirmed" | "Rejected";
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function AuthorizerTaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API endpoint when backend is ready
        // Example:
        // const response = await fetch('/api/authorizer/tasks');
        // const data = await response.json();
        // setTasks(data);
        
        // Expected data format:
        // [
        //   {
        //     id: "T_001",
        //     reportName: "Weekly Economic Report",
        //     status: "Updating",
        //     assignedTo: "John Doe",
        //     dueDate: "2024-02-15",
        //     createdAt: "2024-01-20",
        //     updatedAt: "2024-02-01"
        //   },
        //   ...
        // ]
        
        // For now, keep empty array until backend is ready
        setTasks([]);
        setFilteredTasks([]);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on status and search query
  useEffect(() => {
    let filtered = tasks;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (task) => task.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Filter by search query (report name)
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.reportName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, selectedStatus, searchQuery]);

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Updating":
        return "bg-blue-500 text-white";
      case "Not Started":
        return "bg-orange-600 text-white";
      case "Confirmed":
        return "bg-green-600 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Report View
            </h1>
          </div>

          {/* Search Report Section with Status Filters */}
          <Card className="bg-zinc-800 dark:bg-zinc-900 border-zinc-700">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h2 className="text-base font-normal text-zinc-100 dark:text-zinc-50">
                  Showing Report List
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {/* Search Report */}
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search Report"
                      className="pl-10 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Status Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleStatusFilter("updating")}
                      className={`px-4 py-2 rounded-md font-medium text-sm ${
                        selectedStatus === "updating"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Updating
                    </Button>
                    <Button
                      onClick={() => handleStatusFilter("not started")}
                      className={`px-4 py-2 rounded-md font-medium text-sm ${
                        selectedStatus === "not started"
                          ? "bg-orange-700 hover:bg-orange-800 text-white"
                          : "bg-orange-600 hover:bg-orange-700 text-white"
                      }`}
                    >
                      Not Started
                    </Button>
                    <Button
                      onClick={() => handleStatusFilter("confirmed")}
                      className={`px-4 py-2 rounded-md font-medium text-sm ${
                        selectedStatus === "confirmed"
                          ? "bg-green-700 hover:bg-green-800 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      Confirmed
                    </Button>
                    <Button
                      onClick={() => handleStatusFilter("rejected")}
                      className={`px-4 py-2 rounded-md font-medium text-sm ${
                        selectedStatus === "rejected"
                          ? "bg-red-700 hover:bg-red-800 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      Rejected
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Table */}
          <Card className="bg-zinc-800 dark:bg-zinc-900 border-zinc-700">
            <CardContent className="pt-6">
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800">
                      <TableHead className="font-normal text-zinc-400">Report ID</TableHead>
                      <TableHead className="font-normal text-zinc-400">Report Name</TableHead>
                      <TableHead className="font-normal text-zinc-400">Status</TableHead>
                      <TableHead className="font-normal text-zinc-400">Assigned To</TableHead>
                      <TableHead className="font-normal text-zinc-400">Due Date</TableHead>
                      <TableHead className="font-normal text-zinc-400">Created At</TableHead>
                      <TableHead className="font-normal text-zinc-400">Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow className="border-zinc-700 hover:bg-zinc-800">
                        <TableCell colSpan={7} className="h-32 text-center">
                          <p className="text-sm text-zinc-400">
                            Loading tasks...
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : filteredTasks.length === 0 ? (
                      <TableRow className="border-zinc-700 hover:bg-zinc-800">
                        <TableCell colSpan={7} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-base font-medium text-zinc-300">
                              No tasks available
                            </p>
                            <p className="text-sm text-zinc-500">
                              Tasks will appear here once loaded from the backend
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTasks.map((task) => (
                        <TableRow key={task.id} className="border-zinc-700 hover:bg-zinc-800">
                          <TableCell className="font-medium text-zinc-200">
                            {task.id}
                          </TableCell>
                          <TableCell className="text-zinc-200">{task.reportName}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-zinc-200">{task.assignedTo}</TableCell>
                          <TableCell className="text-zinc-200">{task.dueDate}</TableCell>
                          <TableCell className="text-zinc-200">{task.createdAt}</TableCell>
                          <TableCell className="text-zinc-200">{task.updatedAt}</TableCell>
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

