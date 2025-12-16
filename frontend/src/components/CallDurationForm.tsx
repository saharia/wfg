import { TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dataSchema, initialData } from "./schema";
import type { FormSchema } from "./schema";
import { useSaveAnalytics } from "../hooks/useSaveCallDuration";
import { useState } from "react";
import EmailDialog from "./dialogs/EmailDialog";
import { useHandleError, useHandleSuccess } from "../utils/normalizeError";
import { useFetchAnalyticsByEmail } from "../hooks/useFetchAnalyticsByEmail";
import { useConfirm } from "../hooks/useConfirm";
import { useUpdateAnalytics } from "../hooks/useUpdateCallDuration";

const CallDurationForm = () => {

  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const defaultValues: FormSchema = {
    points: initialData.map((p) => ({
      time: p.time,
      value: String(p.value),
    })),
  };

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(dataSchema),
    defaultValues,
  });

  const liveData = watch("points");
  const points = watch("points").map((p) => ({
    time: p.time,
    value: Number(p.value),
  }));


  const { mutateAsync: saveAnalytics, isPending: isSavePending } = useSaveAnalytics();
  const { mutateAsync: fetchAnalytics, isPending: isFetchPending } = useFetchAnalyticsByEmail();
  const { mutateAsync: updateAnalytics, isPending: isUpdatePending } = useUpdateAnalytics();

  const saveData = async (email: string, overwriteMessage: string, isExisting: boolean) => {
    try {
      if (isExisting) {
        await updateAnalytics({ email, payload: JSON.stringify(points) });
      } else {
        await saveAnalytics({ email, payload: JSON.stringify(points) });
      }
      handleSuccess(overwriteMessage);
    } catch (err: any) {
      throw err;
    }
  };

  const handleSave = async (email: string): Promise<boolean> => {
    try {
      const response = await fetchAnalytics({ email });
      const isExisting = response?.analyticsCollection?.edges.length > 0;
      if (isExisting) {
        const overwrite = await confirm("Are you sure to overwrite the existing data?");
        if (!overwrite) return false; // user cancelled
      }
      await saveData(email, "Call duration data saved successfully", isExisting);
      setOpen(false);
      return true;
    } catch (err: any) {
      handleError(err);
      return false;
    }
  };


  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 350,
        }}
      >
        {/* Scrollable content */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          {liveData.map((item, index) => (
            <Box key={item.time} sx={{ mb: 2 }}>
              <Controller
                name={`points.${index}.value`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"                 // 👈 IMPORTANT
                    inputMode="numeric"         // 👈 numeric keyboard
                    {...field}
                    margin="dense"
                    label={`YValue ${item.time + 1}`}
                    size="small"
                    fullWidth
                    error={!!errors.points?.[index]?.value}
                    helperText={errors.points?.[index]?.value?.message}
                  />
                )}
              />
            </Box>
          ))}
        </Box>

        {/* Sticky footer */}
        <Box
          sx={{
            pt: 2,
            borderTop: "1px solid #eee",
            backgroundColor: "#fff",
          }}
        >
          <Button
            type="button"
            variant="contained"
            fullWidth
            disabled={!isValid || isSavePending || isFetchPending || isUpdatePending}
            onClick={() => setOpen(true)}
          >
            Save
          </Button>
        </Box>
      </Box>
      <EmailDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        loading={isSavePending || isFetchPending || isUpdatePending}
      />
    </>
  );
};

export default CallDurationForm;
