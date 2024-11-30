import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

// Define the types for your parameters and expected data
interface FetchDataParams {
  page: number;
  limit: number;
  columnFilters: Record<string, any>; // You can replace `any` with the actual filter type, e.g., `Record<string, string>`
  searchTerm: string;
}

interface UseFetchDataProps<T> {
  key: string;
  page: number;
  limit: number;
  columnFilters: Record<string, any>; // Modify this based on your actual filters type
  searchTerm: string;
  fetchFunction: (page: number, limit: number, columnFilters: Record<string, any>, searchTerm: string) => Promise<T>; // `T` represents the response data type
}

const useFetchData = <T>({
  key,
  page,
  limit,
  columnFilters,
  searchTerm,
  fetchFunction
}: UseFetchDataProps<T>): UseQueryResult<T, Error> => {
  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey: [key, page, limit, columnFilters, searchTerm],
    queryFn: () => fetchFunction(page, limit, columnFilters, searchTerm),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 3600000, // Data is considered fresh for 1 hour
    refetchInterval: 3600000, // Refetch every hour
    // Additional configurations can be added here if needed (e.g., cacheTime, keepPreviousData)
  };

  return useQuery(queryOptions);
};

export default useFetchData;
