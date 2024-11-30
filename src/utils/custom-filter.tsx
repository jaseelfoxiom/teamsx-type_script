// Define the type for each filter item in the gridFilters array
interface GridFilter {
    id: string; // The filter ID (e.g., "name", "isActive")
    value: any; // The filter value (could be string, boolean, array, etc.)
  }
  
  interface CustomFilters {
    [key: string]: any; // The result of the applied filters will be an object where the key is the filter name and the value is its corresponding value
  }
  
  export default function applyCustomFilters(gridFilters: GridFilter[]): CustomFilters {
    const modifiedFilters = gridFilters
      .map((f) => {
        switch (f.id) {
          case "name":
            return { query: f.value };
          case "isActive":
            return { active: f.value };
          case "category_name":
            return { categoryId: f.value };
          case "price":
            const [fromPrice, toPrice] = f.value as [number, number]; // Assuming price filter is an array with two numbers
            return {
              ...(fromPrice ? { fromPrice } : {}),
              ...(toPrice ? { toPrice } : {}),
            };
          default:
            return null;
        }
      })
      .filter(Boolean); // Filters out any null values
  
    // Reduce the filtered array into a single object with all applied filters
    const result = modifiedFilters.reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});
  
    return result;
  }
  