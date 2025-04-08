export interface Site {
    id: string;
    tt: string;
    customerPhone: string;
    location: {
      latitude: string;
      longitude: string;
    } | null;
    createdAt: string;
  }
  
  export const fetchSites = async (): Promise<Site[]> => {
    try {
      const response = await fetch('/api/tt');
      const data = await response.json();
  
      // No transformation needed if API returns the correct shape
      return data as Site[];
    } catch (error) {
      console.error('Failed to fetch sites:', error);
      return [];
    }
  };
  