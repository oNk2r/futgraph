import { useState, useEffect, useCallback } from "react";
import { DashboardTelemetry } from "../types/dashboard";

export function useDashboard() {
  const [data, setData] = useState<DashboardTelemetry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTelemetry = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
  }, [fetchTelemetry]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTelemetry,
  };
}
