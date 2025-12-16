import { saveAnalytics } from "../services/saveAnalytics";
import { useGlobalMutation } from "../utils/mutateAsync";

export const useSaveAnalytics = () => {
  return useGlobalMutation(
    ({ email, payload }: { email: string; payload: string }) =>
      saveAnalytics(email, payload)
  );
};
