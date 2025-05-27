import { useState } from 'react';

export function useApiTesting() {
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testApi = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`${url} 回應:`, data);
      setLastResponse({ url, data, status: response.status });
      
      return data;
    } catch (error) {
      console.error('API 錯誤:', error);
      setLastResponse({ url, error: (error as Error).message, status: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testApi,
    lastResponse,
    isLoading
  };
}