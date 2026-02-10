"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sales = [
  { name: "Olivia Martin", email: "olivia@example.com", amount: "+$1,999.00" },
  { name: "Jackson Lee", email: "jackson@example.com", amount: "+$1,999.00" },
  { name: "Isabella Nguyen", email: "isabella@example.com", amount: "+$399.00" },
  { name: "William Kim", email: "will@example.com", amount: "+$99.00" },
  { name: "Sofia Davis", email: "sofia@example.com", amount: "+$299.00" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function RecentSales() {
  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${sale.name.replace(" ", "-").toLowerCase()}.png`} />
            <AvatarFallback>{getInitials(sale.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
