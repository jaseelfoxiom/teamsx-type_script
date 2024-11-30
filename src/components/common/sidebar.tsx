// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import SidebarMenu from "./sidebar-menu"; // Import SidebarMenu component
// // import { PATHS } from "@/constants/paths"; // Import your paths

// // const SideBar: React.FC = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Explicitly type the state

// //   // Function to close the sidebar
// //   const handleSidebarClose = () => setIsSidebarOpen(false);

// //   // Function that will be passed to SidebarMenu to handle menu item selection
// //   const onMenuSelect = () => {
// //     setIsSidebarOpen(false); // Close sidebar when a menu item is selected
// //   };

// //   return (
// //     <aside
// //       className={`${
// //         isSidebarOpen ? "block" : "hidden"
// //       } hidden border-r bg-muted/40 md:block`}
// //     >
// //       <div className="flex h-full max-h-screen flex-col gap-2">
// //         <div className="flex h-14 items-center justify-between px-4 lg:h-[60px] lg:px-6">
// //           <Link to={PATHS.BASE_PATH} className="flex items-center gap-2 font-semibold">
// //             <span>Campkart</span>
// //           </Link>
// //           <div
// //             className="cursor-pointer"
// //             onClick={handleSidebarClose}
// //             title="Close Sidebar"
// //           >
// //             {/* Add an icon or button here for closing the sidebar */}
// //             <span>Close</span>
// //           </div>
// //         </div>
// //         {/* Pass onMenuSelect prop to SidebarMenu */}
// //         <SidebarMenu onMenuSelect={onMenuSelect} />
// //       </div>
// //     </aside>
// //   );
// // };

// // export default SideBar;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import SidebarMenu from "./sidebar-menu"; // Import SidebarMenu component
// import { PATHS } from "@/constants/paths"; // Import your paths

// interface SideBarProps {
//   className?: string; // Declare className as an optional prop
// }

// const SideBar: React.FC<SideBarProps> = ({ className }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Explicitly type the state

//   // Function to close the sidebar
//   const handleSidebarClose = () => setIsSidebarOpen(false);

//   // Function that will be passed to SidebarMenu to handle menu item selection
//   const onMenuSelect = () => {
//     setIsSidebarOpen(false); // Close sidebar when a menu item is selected
//   };

//   return (
//     <aside
//       className={`${className} ${isSidebarOpen ? "block" : "hidden"} border-r bg-muted/40 md:block md:translate-x-0 md:w-[280px]`}
//     >
//       <div className="flex h-full max-h-screen flex-col gap-2">
//         <div className="flex h-14 items-center justify-between px-4 lg:h-[60px] lg:px-6">
//           <Link to={PATHS.BASE_PATH} className="flex items-center gap-2 font-semibold">
//             <span>Campkart</span>
//           </Link>
//           <div
//             className="cursor-pointer"
//             onClick={handleSidebarClose}
//             title="Close Sidebar"
//           >
//             {/* Close Sidebar Icon */}
//             <i className="fa-solid fa-xmark" />
//           </div>
//         </div>
//         {/* Pass onMenuSelect prop to SidebarMenu */}
//         <SidebarMenu onMenuSelect={onMenuSelect} />
//       </div>
//     </aside>
//   );
// };

// export default SideBar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider"; // Assuming you have a theme provider
import SidebarMenu from "./sidebar-menu"; // Import SidebarMenu component
import { PATHS } from "@/constants/paths"; // Import your paths

interface SideBarProps {
  className?: string; // Allow dynamic className styling
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Explicitly type the state

  const { theme } = useTheme(); // Get current theme (assuming you have this in your theme provider)

  // Function to close the sidebar
  const handleSidebarClose = () => setIsSidebarOpen(false);

  // Function that will be passed to SidebarMenu to handle menu item selection
  const onMenuSelect = () => {
    setIsSidebarOpen(false); // Close sidebar when a menu item is selected
  };

  return (
    <aside
    //   className={`${className} ${isSidebarOpen ? "block" : "hidden"} border-r bg-muted/40 md:block md:translate-x-0 md:w-[280px] 
    //     ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    className={`${
                isSidebarOpen ? "block" : "hidden"
            } hidden border-r bg-muted/40 md:block`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between px-4 lg:h-[60px] lg:px-6">
          <Link to={PATHS.BASE_PATH} className="flex items-center gap-2 font-semibold">
            <span>Campkart</span>
          </Link>
          <div
            className="cursor-pointer"
            onClick={handleSidebarClose}
            title="Close Sidebar"
          >
            {/* Close Sidebar Icon */}
            <i className="fa-solid fa-xmark" />
          </div>
        </div>
        {/* Pass onMenuSelect prop to SidebarMenu */}
        <SidebarMenu onMenuSelect={onMenuSelect} />
      </div>
    </aside>
  );
};

export default SideBar;
