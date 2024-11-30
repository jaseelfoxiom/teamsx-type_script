// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Header from "@/components/common/Header";
// import SideBar from "@/components/common/sidebar";

// function RootLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prevState) => !prevState);
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       {/* Sidebar: Always visible on medium and large screens, toggled on small screens */}
//       <SideBar 
//         className={`fixed inset-y-0 left-0 z-50 w-[80%] max-w-xs bg-white p-4 shadow-md transition-transform duration-300 ease-in-out md:relative md:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} 
//       />

//       <div className="flex flex-col flex-1 overflow-x-hidden">
//         <Header toggleSidebar={toggleSidebar} />
//         <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-x-hidden">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default RootLayout;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/sidebar";

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar: Always visible on medium and large screens, toggled on small screens */}
      <SideBar 
        className={`fixed inset-y-0 left-0 z-50 w-[80%] max-w-xs bg-white p-4 shadow-md transition-transform duration-300 ease-in-out md:relative md:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} 
      />

      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
