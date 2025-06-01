"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Home,
  Package,
  Settings,
  Truck,
  Users,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/sidebar-provider";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Partners",
      path: "/partners",
      icon: Users,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: Package,
    },
    {
      name: "Assignments",
      path: "/assignments",
      icon: Truck,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "h-full border-r bg-background transition-all duration-300 relative",
        isOpen ? "w-64" : "w-[55px]"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b justify-between">
        {isOpen ? (
          <>
            <h1 className="font-bold text-xl">DataFlow</h1>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggle}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Collapse sidebar</span>
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mx-auto"
            onClick={toggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Expand sidebar</span>
          </Button>
        )}
      </div>
      <div className="space-y-1 py-4">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium transition-colors",
              pathname === route.path
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <route.icon className={cn("h-5 w-5", isOpen && "mr-2")} />
            {isOpen && (
              <span className="transition-opacity duration-300">
                {route.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
