import { InboxIcon } from "lucide-react";
import React from "react";

// Define the component as a functional React component with TypeScript
const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
      <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full dark:bg-gray-800">
        <InboxIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          No Requset Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there's no data to display.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
