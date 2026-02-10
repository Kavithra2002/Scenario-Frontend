export default function Notification() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            View and manage your notifications.
          </p>
        </div>
      </main>
    </div>
  );
}

