"use client";

import { useState, useEffect } from "react";
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
  Download,
  MoreVertical,
  User,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// User data type - ready for backend integration
export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
  lastUpdated: string;
  contact: string;
  email: string;
}

export default function SystemAdminUserList() {
  // State for users data from backend
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  
  // Dialog states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  
  // Form states for Add User
  const [addUserForm, setAddUserForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    date: "",
    contact: "+94 074 444 4444",
    email: "samplemail@gmail.com",
  });
  
  // Form states for Update User
  const [updateUserForm, setUpdateUserForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    date: "",
    contact: "",
    email: "",
  });

  // Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API endpoint when backend is ready
      // Example:
      // const response = await fetch('/api/system-admin/users');
      // if (!response.ok) throw new Error('Failed to fetch users');
      // const data = await response.json();
      // setUsers(data);
      
      // Placeholder for backend integration
      // Uncomment and update the endpoint when backend is ready
      // const response = await fetch('/api/system-admin/users');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch users');
      // }
      // const data = await response.json();
      // setUsers(data);
      
      // For now, set empty array until backend is ready
      setUsers([]);
    } catch (err) {
      // Handle error - set empty array and show error message
      setError(err instanceof Error ? err.message : 'Failed to load users');
      setUsers([]);
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchUserQuery.toLowerCase());
    return matchesSearch;
  });

  // Handler functions - connected to backend
  const handleAddUserClick = () => {
    setIsAddUserOpen(true);
  };

  const handleUpdateUserClick = () => {
    setIsUpdateUserOpen(true);
  };

  const handleAddUserConfirm = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/system-admin/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     firstName: addUserForm.firstName,
      //     lastName: addUserForm.lastName,
      //     role: addUserForm.role,
      //     date: addUserForm.date,
      //     contact: addUserForm.contact,
      //     email: addUserForm.email,
      //   })
      // });
      // if (response.ok) {
      //   // Refresh users list
      //   await fetchUsers();
      //   setIsAddUserOpen(false);
      //   // Reset form
      //   setAddUserForm({
      //     firstName: "",
      //     lastName: "",
      //     role: "",
      //     date: "",
      //     contact: "+94 074 444 4444",
      //     email: "samplemail@gmail.com",
      //   });
      // }
      console.log("Add User confirmed:", addUserForm);
      setIsAddUserOpen(false);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleUpdateUserConfirm = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/system-admin/users/update', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     firstName: updateUserForm.firstName,
      //     lastName: updateUserForm.lastName,
      //     role: updateUserForm.role,
      //     date: updateUserForm.date,
      //     contact: updateUserForm.contact,
      //     email: updateUserForm.email,
      //   })
      // });
      // if (response.ok) {
      //   // Refresh users list
      //   await fetchUsers();
      //   setIsUpdateUserOpen(false);
      //   // Reset form
      //   setUpdateUserForm({
      //     firstName: "",
      //     lastName: "",
      //     role: "",
      //     date: "",
      //     contact: "",
      //     email: "",
      //   });
      // }
      console.log("Update User confirmed:", updateUserForm);
      setIsUpdateUserOpen(false);
    } catch (err) {
      console.error('Error updating users:', err);
    }
  };

  const handleExport = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/system-admin/users/export');
      // const blob = await response.blob();
      // // Create download link
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `users-export-${new Date().toISOString()}.csv`;
      // a.click();
      console.log("Export clicked");
    } catch (err) {
      console.error('Error exporting users:', err);
    }
  };

  const handleEdit = async (userId: string) => {
    try {
      // TODO: Implement edit functionality
      // const response = await fetch(`/api/system-admin/users/${userId}`);
      // const data = await response.json();
      // // Open edit modal or navigate to edit page
      console.log("Edit user:", userId);
    } catch (err) {
      console.error('Error editing user:', err);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(`/api/system-admin/users/${userId}`, {
      //   method: 'DELETE',
      // });
      // if (response.ok) {
      //   // Refresh users list
      //   await fetchUsers();
      // }
      console.log("Delete user:", userId);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleViewDetails = async (userId: string) => {
    try {
      // TODO: Implement view details functionality
      // const response = await fetch(`/api/system-admin/users/${userId}`);
      // const data = await response.json();
      // // Show user details in modal or navigate to details page
      console.log("View details for user:", userId);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Users
          </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {/* Filter Input Field */}
              <Input
                type="text"
                placeholder="Filter"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-40"
              />
              {/* Export Button */}
              <Button
                onClick={handleExport}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* User Management Section */}
          <Card className="mb-6 border-2">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Left Side: Label and Search */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">
                    Showing user list
                  </h2>
                  <div className="relative flex-1 sm:flex-initial sm:w-80">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search User"
                      value={searchUserQuery}
                      onChange={(e) => setSearchUserQuery(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAddUserClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                  <Button
                    onClick={handleUpdateUserClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="font-semibold">First Name</TableHead>
                      <TableHead className="font-semibold">Last Name</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Last Updated</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground">
                              Loading data...
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
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
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {user.userId}
                            </div>
                          </TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.lastUpdated}</TableCell>
                          <TableCell>{user.contact}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
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
                                  onClick={() => handleViewDetails(user.userId)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEdit(user.userId)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDelete(user.userId)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add User Dialog */}
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-first-name">First Name</Label>
                    <Input
                      id="add-first-name"
                      placeholder="Enter first name"
                      value={addUserForm.firstName}
                      onChange={(e) =>
                        setAddUserForm({ ...addUserForm, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-last-name">Last Name</Label>
                    <Input
                      id="add-last-name"
                      placeholder="Enter last name"
                      value={addUserForm.lastName}
                      onChange={(e) =>
                        setAddUserForm({ ...addUserForm, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-role">Role</Label>
                    <Select
                      value={addUserForm.role}
                      onValueChange={(value) =>
                        setAddUserForm({ ...addUserForm, role: value })
                      }
                    >
                      <SelectTrigger id="add-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="authorizer">Authorizer</SelectItem>
                        <SelectItem value="system-admin">System Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <Input
                        id="add-date"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={addUserForm.date}
                        onChange={(e) =>
                          setAddUserForm({ ...addUserForm, date: e.target.value })
                        }
                        className="pr-9"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-contact">Contact Number</Label>
                    <Input
                      id="add-contact"
                      value={addUserForm.contact}
                      onChange={(e) =>
                        setAddUserForm({ ...addUserForm, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-email">Email</Label>
                    <Input
                      id="add-email"
                      type="email"
                      value={addUserForm.email}
                      onChange={(e) =>
                        setAddUserForm({ ...addUserForm, email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddUserOpen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddUserConfirm}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Update User Dialog */}
          <Dialog open={isUpdateUserOpen} onOpenChange={setIsUpdateUserOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Update User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-first-name">First Name</Label>
                    <Input
                      id="update-first-name"
                      placeholder="Enter first name"
                      value={updateUserForm.firstName}
                      onChange={(e) =>
                        setUpdateUserForm({ ...updateUserForm, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-last-name">Last Name</Label>
                    <Input
                      id="update-last-name"
                      placeholder="Enter last name"
                      value={updateUserForm.lastName}
                      onChange={(e) =>
                        setUpdateUserForm({ ...updateUserForm, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-role">Role</Label>
                    <Select
                      value={updateUserForm.role}
                      onValueChange={(value) =>
                        setUpdateUserForm({ ...updateUserForm, role: value })
                      }
                    >
                      <SelectTrigger id="update-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="authorizer">Authorizer</SelectItem>
                        <SelectItem value="system-admin">System Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <Input
                        id="update-date"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={updateUserForm.date}
                        onChange={(e) =>
                          setUpdateUserForm({ ...updateUserForm, date: e.target.value })
                        }
                        className="pr-9"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-contact">Contact Number</Label>
                    <Input
                      id="update-contact"
                      value={updateUserForm.contact}
                      onChange={(e) =>
                        setUpdateUserForm({ ...updateUserForm, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-email">Email</Label>
                    <Input
                      id="update-email"
                      type="email"
                      value={updateUserForm.email}
                      onChange={(e) =>
                        setUpdateUserForm({ ...updateUserForm, email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsUpdateUserOpen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateUserConfirm}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
