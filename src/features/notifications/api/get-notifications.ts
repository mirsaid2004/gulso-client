import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApiResponse, NotificationResponse } from "@/types";

export const getNotifications = (): Promise<ApiResponse<NotificationResponse[]>> =>
  api.get("/notifications");

export const useNotifications = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 0,
    refetchInterval: 2_000,
  });
