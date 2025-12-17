import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useConfirm } from "../../hooks/useConfirm";
import { useFetchAnalyticsByEmail } from "../../hooks/useFetchAnalyticsByEmail";
import { useSaveAnalytics } from "../../hooks/useSaveCallDuration";
import { useUpdateAnalytics } from "../../hooks/useUpdateCallDuration";
import { useHandleError, useHandleSuccess } from "../../utils/normalizeError";
import { CALL_DURATION_KEY_LATEST } from "../../utils/queryKeys";
import type { FormSchema } from "../schema";

const SaveSection = () => {
  const {
    getValues,
    watch,
    formState: { isValid },
  } = useFormContext<FormSchema>();

  const points = watch("points").map((p) => ({
    time: p.time,
    value: Number(p.value),
  }));

  const { refetch, isFetching: isFetchPending } = useFetchAnalyticsByEmail(getValues("email"));
  const { mutateAsync: saveAnalytics, isPending: isSavePending } = useSaveAnalytics();
  const { mutateAsync: updateAnalytics, isPending: isUpdatePending } = useUpdateAnalytics();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const handleSave = async () => {
    const email = getValues("email");

    if (!email) {
      handleError("Email is required");
      return;
    }

    try {
      // 1️⃣ Check if data exists
      const response = await refetch();
      const isExisting = response?.data.analyticsCollection?.edges?.length > 0;

      // 2️⃣ Prompt overwrite if existing
      if (isExisting) {
        const overwrite = await confirm("Data already exists for this email. Overwrite?");
        if (!overwrite) return;
      }

      // 3️⃣ Save or update
      if (isExisting) {
        await updateAnalytics({ email, payload: JSON.stringify(points) });
      } else {
        await saveAnalytics({ email, payload: JSON.stringify(points) });
      }

      // 🔥 Update chart
      queryClient.setQueryData(CALL_DURATION_KEY_LATEST, points);

      handleSuccess("Call duration data saved successfully");
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <Box sx={{ pt: 2, borderTop: "1px solid #eee" }}>
      <Button
        type="button"
        variant="contained"
        fullWidth
        disabled={!isValid || isSavePending || isFetchPending || isUpdatePending}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
};

export default SaveSection;
