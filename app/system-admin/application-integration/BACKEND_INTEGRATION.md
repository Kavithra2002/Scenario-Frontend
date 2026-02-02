# Application Integration – Backend API Contract

When the backend is ready, wire the Application Integration page to these endpoints.

## 1. Load configuration (on page load)

- **GET** `/api/system-admin/integration/database`  
  Returns: `{ host, port, databaseName, username, password }` (password may be masked or omitted for GET).

- **GET** `/api/system-admin/integration/server`  
  Returns: `{ apiBaseUrl, requestTimeoutMs, environment }` where `environment` is `"development" | "staging" | "production"`.

- **GET** `/api/system-admin/integration/config`  
  Returns: `{ entries: [{ key, value }, ...] }`.

## 2. Save configuration

- **PUT** `/api/system-admin/integration/database`  
  Body: `{ host, port, databaseName, username, password }`.

- **PUT** `/api/system-admin/integration/server`  
  Body: `{ apiBaseUrl, requestTimeoutMs, environment }`.

- **PUT** `/api/system-admin/integration/config`  
  Body: `{ entries: [{ key, value }, ...] }`.

## 3. Test database connection

- **POST** `/api/system-admin/integration/database/test`  
  Body: `{ host, port, databaseName, username, password }`.  
  Returns: `{ success: boolean, message?: string }`.

---

In `page.tsx`, replace the placeholder logic in `fetchConfig`, `saveDatabaseConfig`, `saveServerConfig`, `saveOtherConfig`, and `testDatabaseConnection` with `fetch()` calls to the above endpoints.
