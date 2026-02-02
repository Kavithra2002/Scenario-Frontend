"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Server,
  Settings,
  CheckCircle2,
  XCircle,
  Loader2,
  Save,
  TestTube,
  Plus,
  Trash2,
} from "lucide-react";

// Types - ready for backend integration
export interface DatabaseConfig {
  host: string;
  port: string;
  databaseName: string;
  username: string;
  password: string;
}

export interface ServerConfig {
  apiBaseUrl: string;
  requestTimeoutMs: string;
  environment: "development" | "staging" | "production";
}

export interface ConfigEntry {
  key: string;
  value: string;
}

const DEFAULT_DB: DatabaseConfig = {
  host: "",
  port: "5432",
  databaseName: "",
  username: "",
  password: "",
};

const DEFAULT_SERVER: ServerConfig = {
  apiBaseUrl: "",
  requestTimeoutMs: "30000",
  environment: "development",
};

export default function SystemAdminApplicationIntegration() {
  // Database
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>(DEFAULT_DB);
  const [dbSaving, setDbSaving] = useState(false);
  const [dbTestStatus, setDbTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [dbTestMessage, setDbTestMessage] = useState<string>("");

  // Server
  const [serverConfig, setServerConfig] = useState<ServerConfig>(DEFAULT_SERVER);
  const [serverSaving, setServerSaving] = useState(false);

  // Other config (key-value)
  const [configEntries, setConfigEntries] = useState<ConfigEntry[]>([]);
  const [configSaving, setConfigSaving] = useState(false);
  const [newConfigKey, setNewConfigKey] = useState("");
  const [newConfigValue, setNewConfigValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all integration config from backend on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Replace with actual API when backend is ready
        // Example:
        // const [dbRes, serverRes, configRes] = await Promise.all([
        //   fetch('/api/system-admin/integration/database'),
        //   fetch('/api/system-admin/integration/server'),
        //   fetch('/api/system-admin/integration/config'),
        // ]);
        // if (dbRes.ok) { const data = await dbRes.json(); setDbConfig(data); }
        // if (serverRes.ok) { const data = await serverRes.json(); setServerConfig(data); }
        // if (configRes.ok) { const data = await configRes.json(); setConfigEntries(data.entries || []); }

        // Placeholder: keep defaults until backend is ready
        setDbConfig(DEFAULT_DB);
        setServerConfig(DEFAULT_SERVER);
        setConfigEntries([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load configuration");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleDbChange = (field: keyof DatabaseConfig, value: string) => {
    setDbConfig((prev) => ({ ...prev, [field]: value }));
    setDbTestStatus("idle");
  };

  const testDatabaseConnection = async () => {
    setDbTestStatus("testing");
    setDbTestMessage("");

    try {
      // TODO: Replace with actual backend endpoint when ready
      // Example:
      // const response = await fetch('/api/system-admin/integration/database/test', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dbConfig),
      // });
      // const data = await response.json();
      // if (data.success) { setDbTestStatus('success'); setDbTestMessage(data.message || 'Connected'); }
      // else { setDbTestStatus('error'); setDbTestMessage(data.message || 'Connection failed'); }

      // Placeholder: simulate test (replace with real API call)
      await new Promise((r) => setTimeout(r, 800));
      setDbTestStatus("error");
      setDbTestMessage("Backend not connected. Wire /api/system-admin/integration/database/test to test.");
    } catch (err) {
      setDbTestStatus("error");
      setDbTestMessage(err instanceof Error ? err.message : "Connection test failed");
    }
  };

  const saveDatabaseConfig = async () => {
    setDbSaving(true);
    try {
      // TODO: Replace with actual API when backend is ready
      // const response = await fetch('/api/system-admin/integration/database', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dbConfig),
      // });
      // if (!response.ok) throw new Error('Failed to save database config');
      // Success toast/notification

      await new Promise((r) => setTimeout(r, 500));
      setDbTestStatus("idle");
    } catch (err) {
      console.error("Save database config failed:", err);
    } finally {
      setDbSaving(false);
    }
  };

  const handleServerChange = (field: keyof ServerConfig, value: string) => {
    setServerConfig((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "requestTimeoutMs" && { requestTimeoutMs: value }),
      ...(field === "environment" && {
        environment: value as ServerConfig["environment"],
      }),
    }));
  };

  const saveServerConfig = async () => {
    setServerSaving(true);
    try {
      // TODO: Replace with actual API when backend is ready
      // const response = await fetch('/api/system-admin/integration/server', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(serverConfig),
      // });
      // if (!response.ok) throw new Error('Failed to save server config');

      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error("Save server config failed:", err);
    } finally {
      setServerSaving(false);
    }
  };

  const addConfigEntry = () => {
    if (!newConfigKey.trim()) return;
    setConfigEntries((prev) => [...prev, { key: newConfigKey.trim(), value: newConfigValue.trim() }]);
    setNewConfigKey("");
    setNewConfigValue("");
  };

  const removeConfigEntry = (index: number) => {
    setConfigEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const saveOtherConfig = async () => {
    setConfigSaving(true);
    try {
      // TODO: Replace with actual API when backend is ready
      // const response = await fetch('/api/system-admin/integration/config', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ entries: configEntries }),
      // });
      // if (!response.ok) throw new Error('Failed to save configuration');

      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error("Save config failed:", err);
    } finally {
      setConfigSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading configuration…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Application Integration
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Database, server, and other configuration. When the backend is ready, use the
              commented API endpoints to connect.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </div>
          )}

          <Tabs defaultValue="database" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="database" className="gap-2">
                <Database className="h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="server" className="gap-2">
                <Server className="h-4 w-4" />
                Server
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2">
                <Settings className="h-4 w-4" />
                Other config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="database" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Database setup</CardTitle>
                  <CardDescription>
                    Connection details for the application database. Use &quot;Test connection&quot;
                    when the backend is wired.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Host</Label>
                      <Input
                        id="db-host"
                        placeholder="localhost"
                        value={dbConfig.host}
                        onChange={(e) => handleDbChange("host", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Port</Label>
                      <Input
                        id="db-port"
                        placeholder="5432"
                        value={dbConfig.port}
                        onChange={(e) => handleDbChange("port", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database name</Label>
                    <Input
                      id="db-name"
                      placeholder="app_db"
                      value={dbConfig.databaseName}
                      onChange={(e) => handleDbChange("databaseName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="db-username">Username</Label>
                      <Input
                        id="db-username"
                        placeholder="db_user"
                        value={dbConfig.username}
                        onChange={(e) => handleDbChange("username", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Password</Label>
                      <Input
                        id="db-password"
                        type="password"
                        placeholder="••••••••"
                        value={dbConfig.password}
                        onChange={(e) => handleDbChange("password", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={testDatabaseConnection}
                      disabled={dbTestStatus === "testing"}
                    >
                      {dbTestStatus === "testing" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="mr-2 h-4 w-4" />
                      )}
                      Test connection
                    </Button>
                    {dbTestStatus === "success" && (
                      <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4" /> {dbTestMessage || "Connected"}
                      </span>
                    )}
                    {dbTestStatus === "error" && dbTestMessage && (
                      <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                        <XCircle className="h-4 w-4" /> {dbTestMessage}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end border-t pt-4">
                    <Button onClick={saveDatabaseConfig} disabled={dbSaving}>
                      {dbSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save database config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="server" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Server setup</CardTitle>
                  <CardDescription>
                    API base URL, timeout, and environment. Backend can expose these via
                    /api/system-admin/integration/server.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-base-url">API base URL</Label>
                    <Input
                      id="api-base-url"
                      placeholder="https://api.example.com"
                      value={serverConfig.apiBaseUrl}
                      onChange={(e) => handleServerChange("apiBaseUrl", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="request-timeout">Request timeout (ms)</Label>
                      <Input
                        id="request-timeout"
                        type="number"
                        placeholder="30000"
                        value={serverConfig.requestTimeoutMs}
                        onChange={(e) => handleServerChange("requestTimeoutMs", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="environment">Environment</Label>
                      <select
                        id="environment"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={serverConfig.environment}
                        onChange={(e) => handleServerChange("environment", e.target.value)}
                      >
                        <option value="development">Development</option>
                        <option value="staging">Staging</option>
                        <option value="production">Production</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end border-t pt-4">
                    <Button onClick={saveServerConfig} disabled={serverSaving}>
                      {serverSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save server config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Other configuration</CardTitle>
                  <CardDescription>
                    Key-value settings (e.g. feature flags, logging level). Persisted via backend
                    when /api/system-admin/integration/config is implemented.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      placeholder="Key (e.g. LOG_LEVEL)"
                      className="max-w-[200px]"
                      value={newConfigKey}
                      onChange={(e) => setNewConfigKey(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addConfigEntry()}
                    />
                    <Input
                      placeholder="Value"
                      className="max-w-[200px]"
                      value={newConfigValue}
                      onChange={(e) => setNewConfigValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addConfigEntry()}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addConfigEntry}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {configEntries.length > 0 && (
                    <div className="space-y-2">
                      <Label>Entries</Label>
                      <ul className="space-y-2 rounded-md border p-2">
                        {configEntries.map((entry, index) => (
                          <li
                            key={`${entry.key}-${index}`}
                            className="flex items-center justify-between gap-2 rounded bg-muted/50 px-3 py-2"
                          >
                            <span className="font-mono text-sm">
                              {entry.key} = {entry.value || "(empty)"}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeConfigEntry(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex justify-end border-t pt-4">
                    <Button onClick={saveOtherConfig} disabled={configSaving}>
                      {configSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
