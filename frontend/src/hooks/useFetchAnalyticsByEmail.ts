import { fetchAnalyticsByEmail } from "../services/fetchAnalyticsByEmail";
import { useGlobalQuery } from "../utils/queryAsync";

export const useFetchAnalyticsByEmail = (email: string) => {
  return useGlobalQuery(
    ["call-duration", email],
    async ({ queryKey }) => {
      const email: string = queryKey[1] as string;
      return fetchAnalyticsByEmail(email);
    },
    {
      enabled: false,
    }
  );
};
