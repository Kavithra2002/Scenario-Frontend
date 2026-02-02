"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from "lucide-react";

// Account data type - ready for backend integration
export interface AccountData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  employeeId: string;
  department: string;
  joinedDate: string;
  profilePicture?: string;
}

interface AccountPageProps {
  userType?: "user" | "admin" | "authorizer" | "system-admin";
}

export function AccountPage({ userType = "user" }: AccountPageProps) {
  // This will be replaced with backend data later
  // The backend will automatically determine which user's data to fetch based on authentication
  const [accountData, setAccountData] = useState<AccountData | undefined>(undefined);
  const [isLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<Partial<AccountData>>({});

  // Get initials for profile picture placeholder
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = async (field: string) => {
    // TODO: Save to backend
    // The backend will automatically know which user to update based on authentication
    // Example: await updateAccountField(userType, field, editedData[field]);
    setIsEditing({ ...isEditing, [field]: false });
    if (accountData && editedData[field]) {
      setAccountData({ ...accountData, [field]: editedData[field] as string });
    }
    setEditedData({ ...editedData, [field]: undefined });
  };

  const handleCancel = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
    setEditedData({ ...editedData, [field]: undefined });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to backend
      // The backend will automatically know which user to update based on authentication
      // Example: await uploadProfilePicture(userType, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (accountData) {
          setAccountData({ ...accountData, profilePicture: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Default placeholder data - will be replaced with backend data
  const displayData = accountData || {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    employeeId: "",
    department: "",
    joinedDate: "",
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* Account Section */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                        {displayData.profilePicture ? (
                          <img
                            src={displayData.profilePicture}
                            alt={displayData.fullName || "Profile"}
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        ) : (
                          getInitials(displayData.fullName)
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 rounded-full p-0"
                          asChild
                        >
                          <span>
                            <Pencil className="h-4 w-4" />
                          </span>
                        </Button>
                      </label>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground">
                        {displayData.fullName || "User Name"}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {displayData.role || "Role"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          document.querySelector('input[type="file"]')?.click();
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload new photo
                      </Button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Full Name</Label>
                        <p className="text-base font-medium mt-1">
                          {displayData.fullName || "—"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Phone</Label>
                        <p className="text-base font-medium mt-1">
                          {displayData.phone || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Mail</Label>
                        <p className="text-base font-medium mt-1">
                          {displayData.email || "—"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Joined Date</Label>
                        <p className="text-base font-medium mt-1">
                          {displayData.joinedDate
                            ? new Date(displayData.joinedDate).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        value={
                          isEditing.firstName
                            ? editedData.firstName ?? displayData.firstName
                            : displayData.firstName
                        }
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        onFocus={() => handleEdit("firstName")}
                        readOnly={!isEditing.firstName}
                        className={!isEditing.firstName ? "bg-muted" : ""}
                      />
                      {!isEditing.firstName && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("firstName")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.firstName && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("firstName")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("firstName")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <Input
                        id="lastName"
                        value={
                          isEditing.lastName
                            ? editedData.lastName ?? displayData.lastName
                            : displayData.lastName
                        }
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        onFocus={() => handleEdit("lastName")}
                        readOnly={!isEditing.lastName}
                        className={!isEditing.lastName ? "bg-muted" : ""}
                      />
                      {!isEditing.lastName && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("lastName")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.lastName && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("lastName")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("lastName")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        value={
                          isEditing.fullName
                            ? editedData.fullName ?? displayData.fullName
                            : displayData.fullName
                        }
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        onFocus={() => handleEdit("fullName")}
                        readOnly={!isEditing.fullName}
                        className={!isEditing.fullName ? "bg-muted" : ""}
                      />
                      {!isEditing.fullName && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("fullName")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.fullName && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("fullName")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("fullName")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <div className="relative">
                      <Input
                        id="employeeId"
                        value={
                          isEditing.employeeId
                            ? editedData.employeeId ?? displayData.employeeId
                            : displayData.employeeId
                        }
                        onChange={(e) => handleInputChange("employeeId", e.target.value)}
                        onFocus={() => handleEdit("employeeId")}
                        readOnly={!isEditing.employeeId}
                        className={!isEditing.employeeId ? "bg-muted" : ""}
                      />
                      {!isEditing.employeeId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("employeeId")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.employeeId && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("employeeId")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("employeeId")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Input
                        id="department"
                        value={
                          isEditing.department
                            ? editedData.department ?? displayData.department
                            : displayData.department
                        }
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        onFocus={() => handleEdit("department")}
                        readOnly={!isEditing.department}
                        className={!isEditing.department ? "bg-muted" : ""}
                      />
                      {!isEditing.department && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("department")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.department && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("department")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("department")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="relative">
                      <Input
                        id="role"
                        value={
                          isEditing.role
                            ? editedData.role ?? displayData.role
                            : displayData.role
                        }
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        onFocus={() => handleEdit("role")}
                        readOnly={!isEditing.role}
                        className={!isEditing.role ? "bg-muted" : ""}
                      />
                      {!isEditing.role && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => handleEdit("role")}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      )}
                      {isEditing.role && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave("role")}
                            className="h-6 px-2"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel("role")}
                            className="h-6 px-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
