import React from 'react'; // Explicitly import React
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryClientProvider } from './provider/QueryClientProvider';
import { Toaster } from './components/ui/toaster';
import { PATHS } from './constants/paths';  // Assuming PATHS is defined in 'constants/paths'
import Login from './page/Auth/Login';
import RootLayout from './layout/RootLayout';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './page/Dashboard/Dashboard';
import { AuthProvider } from "./provider/AuthProvider";
import AddRequest from './page/Request/AddRequest';
// Create the router configuration
const router = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: <Login />, // Login page
  },
  {
    path: PATHS.BASE_PATH,
    element: <RootLayout />, // Root layout, common layout for the app
    children: [
      {
        element: <ProtectedRoute component={Dashboard} />, // Protected route for the Dashboard
        index: true, // Default route (home page) under the root layout
      },
      // Uncomment and configure the routes as needed:
      {
        path: PATHS.ADD_REQUEST,
        element: <ProtectedRoute component={AddRequest} />, // Example for category page
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>


    <ReactQueryClientProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ReactQueryClientProvider>
    </AuthProvider>
   
  </ThemeProvider>
);
