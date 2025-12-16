import { updateAnalytics } from "../services/updateAnalytics";
import { useGlobalMutation } from "../utils/mutateAsync";

export const useUpdateAnalytics = () => {
  return useGlobalMutation(
    ({ email, payload }: { email: string; payload: string }) =>
      updateAnalytics(email, payload)
  );
};
