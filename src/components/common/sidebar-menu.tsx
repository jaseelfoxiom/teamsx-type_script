import React from "react";
import {
  Home,
  GraduationCap,
  ClipboardList,
  List,
  Book,
  Settings,
  BellRing,
  School,
  HelpCircle,
  PlusCircle,
  
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
// import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { PATHS } from "@/constants/paths";

// Define types for the SidebarItem structure
interface SidebarItem {
  category?: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

// Define the props type for SidebarMenu
interface SidebarMenuProps {
  onMenuSelect: () => void;
}

function SidebarMenu({ onMenuSelect }: SidebarMenuProps) {
  const navigate = useNavigate();
  
  // Define the sidebar items with their types
  const sidebarItems: SidebarItem[] = [
    {
      category: "Main",
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      path: PATHS.BASE_PATH,
    },
    {
        category: "Requests",
        label: "Add Request",
        icon: <ClipboardList className="h-4 w-4" />, // Add an icon for "Add Request"
        path: PATHS.ADD_REQUEST, // Ensure this path is defined in PATHS
      },
    // You can add more items here like the commented-out ones.
  ];

  return (
    <>
      <nav className="px-2 text-sm font-medium lg:px-4">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <NavLink
              onClick={onMenuSelect}
              to={item.path}
              end
              className={({ isActive, isPending }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-3 md:py-2 transition-all my-1 text-[0.81rem]",
                  isPending
                    ? "text-muted-foreground"
                    : "hover:text-primary dark:hover:text-white",
                  isActive
                    ? "bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/50 backdrop-blur-md bg-opacity-80"
                    : "text-muted-foreground hover:text-primary dark:hover:text-white",
                ].join(" ")
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Optional card section, currently commented */}
      {/* <div className="mt-auto p-2 md:p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <Button
            size="sm"
            className="w-full uppercase"
            onClick={() => navigate(PATHS.Enrollment)}
          >
            📚<span className="mx-2">Enroll Student</span>
          </Button>
        </Card>
      </div> */}
    </>
  );
}

export default SidebarMenu;
