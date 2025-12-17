import { useQuery } from "@tanstack/react-query";
import { CALL_DURATION_KEY_LATEST } from "../utils/queryKeys";
import type { ChatOption } from "../components/CallDurationChart";


export const useLastAnalyticsResult = () => {
  const { data } = useQuery<ChatOption[]>({ // 👈 Tell useQuery what to expect
    queryKey: CALL_DURATION_KEY_LATEST,
    queryFn: () => [], // Return empty array instead of null
    enabled: false,
    staleTime: Infinity,
  });

  return data;
};