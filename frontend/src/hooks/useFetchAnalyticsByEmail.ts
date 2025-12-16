import { fetchAnalyticsByEmail } from "../services/fetchAnalyticsByEmail";
import { useGlobalMutation } from "../utils/mutateAsync";

export const useFetchAnalyticsByEmail = () => {
  return useGlobalMutation(
    ({ email }: { email: string }) =>
      fetchAnalyticsByEmail(email)
  );
};
