// Constants and Utility Imports
import { URLS } from "@/constants/apiUrls";
import { apiCall } from "@/service/apiCall";
import applyCustomFilters from "@/utils/custom-filter";

// Define the generic ApiResponse interface
export interface ApiResponse<T> {
  status: boolean;
  message: {
    data: T;
  };
}

// Define the GridFilter interface
interface GridFilter {
  id: string;  // Unique identifier for the filter
  field: string;
  value: any;
}

// Define UserData type for the user data response
interface UserData {
  docs: any[];  // Replace `any` with actual type of user data if needed
  totalDocs: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Function to fetch users with pagination and custom filters
export const fetchUser  = async (
  page: number,
  limit: number,
  columnFilters: Record<string, any> = {},
  searchTerm: string
): Promise<UserData | undefined> => {
  // Convert columnFilters to GridFilter[] format
  const gridFilters: GridFilter[] = Object.entries(columnFilters).map(([field, value], index) => ({
    id: `filter-${index}`,  // Generate a unique id for each filter
    field,
    value,
  }));

  // Apply custom filters (function `applyCustomFilters` should return the query object)
  const query = applyCustomFilters(gridFilters);

  // Make the API call to fetch user data
  const response = await apiCall<ApiResponse<UserData>>(
    "get", // HTTP method
    URLS.USER, // Endpoint URL
    {}, // Headers (if any)
    { page, limit, ...query, query: searchTerm } // Query parameters including pagination and filters
  );

  // Return the response data if the call was successful
  if (response?.status) {
    const data = response.message.data;
    return {
      docs: data.docs,  // User data array
      totalDocs: data.totalDocs,  // Total number of documents (users)
      hasPreviousPage: data.hasPreviousPage,  // Pagination flag for previous page
      hasNextPage: data.hasNextPage,  // Pagination flag for next page
    };
  }

  // If the API call fails or the status is not true, return undefined
  return undefined;
};