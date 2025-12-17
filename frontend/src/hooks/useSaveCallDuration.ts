import { useQueryClient } from "@tanstack/react-query";
import { saveAnalytics } from "../services/saveAnalytics";
import { useGlobalMutation } from "../utils/mutateAsync";
import { CALL_DURATION_KEY } from "../utils/queryKeys";

export const useSaveAnalytics = () => {
  const queryClient = useQueryClient();
  return useGlobalMutation(
    ({ email, payload }: { email: string; payload: string }) =>
      saveAnalytics(email, payload),
    {
      onSuccess: (_data, variables) => {
        /**
         * payload is a string
         * convert it back to chart-friendly object
         */
        const chartData = JSON.parse(variables.payload);

        // 🔥 Update chart instantly
        queryClient.setQueryData(CALL_DURATION_KEY, chartData);
      },
    }
  );
};
