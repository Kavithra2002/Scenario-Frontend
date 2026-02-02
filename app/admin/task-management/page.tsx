"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  RefreshCw,
  Info,
  Download,
  MoreVertical,
} from "lucide-react";

// Report data type - ready for backend integration
export interface Report {
  id: string;
  reportId: string;
  reportName: string;
  status: "confirmed" | "updating" | "not-started" | "rejected";
  lastUpdated: string;
  reportSize: string | null;
}

export default function AdminTaskManagement() {
  // State for reports data from backend
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCompanyQuery, setSearchCompanyQuery] = useState("");
  const [searchReportQuery, setSearchReportQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Function to fetch reports from backend
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API endpoint when backend is ready
      // Example:
      // const response = await fetch('/api/admin/reports');
      // if (!response.ok) throw new Error('Failed to fetch reports');
      // const data = await response.json();
      // setReports(data);
      
      // Placeholder for backend integration
      // Uncomment and update the endpoint when backend is ready
      // const response = await fetch('/api/admin/reports');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch reports');
      // }
      // const data = await response.json();
      // setReports(data);
      
      // For now, set empty array until backend is ready
      setReports([]);
    } catch (err) {
      // Handle error - set empty array and show error message
      setError(err instanceof Error ? err.message : 'Failed to load reports');
      setReports([]);
      console.error('Error fetching reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports based on search and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportName.toLowerCase().includes(searchReportQuery.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchReportQuery.toLowerCase());
    const matchesStatus = selectedStatus ? report.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Confirmed
          </Badge>
        );
      case "updating":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            Updating
          </Badge>
        );
      case "not-started":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Not Stared
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get action button based on status
  const getActionButton = (status: Report["status"], reportId: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handlePreview(reportId)}
          >
            Preview
          </Button>
        );
      case "updating":
        return (
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleContinue(reportId)}
          >
            Continue
          </Button>
        );
      case "not-started":
        return (
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => handleStart(reportId)}
          >
            Start
          </Button>
        );
      default:
        return null;
    }
  };

  const router = useRouter();

  // Handler functions - connected to backend
  const handleCreateReport = () => {
    router.push("/admin/create-report");
  };

  const handleUpdateReport = () => {
    router.push("/admin/update-report");
  };

  const handlePreview = async (reportId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/admin/reports/${reportId}/preview`);
      // Handle preview logic
      console.log("Preview report:", reportId);
    } catch (err) {
      console.error('Error previewing report:', err);
    }
  };

  const handleContinue = async (reportId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/admin/reports/${reportId}/continue`, {
      //   method: 'POST',
      // });
      // if (response.ok) {
      //   // Refresh reports list
      //   await fetchReports();
      // }
      console.log("Continue report:", reportId);
    } catch (err) {
      console.error('Error continuing report:', err);
    }
  };

  const handleStart = async (reportId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/admin/reports/${reportId}/start`, {
      //   method: 'POST',
      // });
      // if (response.ok) {
      //   // Refresh reports list
      //   await fetchReports();
      // }
      console.log("Start report:", reportId);
    } catch (err) {
      console.error('Error starting report:', err);
    }
  };

  const handleDownload = async (reportId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/admin/reports/${reportId}/download`);
      // const blob = await response.blob();
      // // Create download link
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `report-${reportId}.pdf`;
      // a.click();
      console.log("Download report:", reportId);
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  const handleInfo = async (reportId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/admin/reports/${reportId}`);
      // const data = await response.json();
      // // Show report details in modal or navigate to details page
      console.log("View info for report:", reportId);
    } catch (err) {
      console.error('Error fetching report info:', err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Report View
          </h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Company"
                value={searchCompanyQuery}
                onChange={(e) => setSearchCompanyQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Report Management Section */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {/* Top Row: Label and Action Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-medium text-foreground">
                    Showing Report List
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleCreateReport}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Report
                    </Button>
                    <Button
                      onClick={handleUpdateReport}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Report
                    </Button>
                  </div>
                </div>

                {/* Bottom Row: Search and Status Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative flex-1 sm:flex-initial sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search Report"
                      value={searchReportQuery}
                      onChange={(e) => setSearchReportQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
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
                      Not Stared
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
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Report ID</TableHead>
                      <TableHead className="font-semibold">Report Name</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Last Updated</TableHead>
                      <TableHead className="font-semibold">Report Size</TableHead>
                      <TableHead className="font-semibold">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground">
                              Loading data...
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              No financial data available
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Data will appear here once loaded
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.reportId}
                          </TableCell>
                          <TableCell>{report.reportName}</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell>{report.lastUpdated}</TableCell>
                          <TableCell>{report.reportSize || "—"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getActionButton(report.status, report.reportId)}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleInfo(report.reportId)}
                                className="h-8 w-8"
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                              {report.status === "confirmed" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDownload(report.reportId)}
                                  className="h-8 w-8"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleInfo(report.reportId)}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  {report.status === "confirmed" && (
                                    <DropdownMenuItem
                                      onClick={() => handleDownload(report.reportId)}
                                    >
                                      Download
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
