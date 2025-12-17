import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TextField, Button, Box, FormControl, FormHelperText } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import type { FormSchema } from "../schema";
import { useFetchAnalyticsByEmail } from "../../hooks/useFetchAnalyticsByEmail";
import { useHandleError, useHandleSuccess } from "../../utils/normalizeError";
import { CALL_DURATION_KEY_LATEST } from "../../utils/queryKeys";

const EmailSection = () => {
  const { control, getValues, formState: { errors }, setValue } = useFormContext<FormSchema>();
  const queryClient = useQueryClient();

  const email = useWatch({
    control,
    name: "email",
  });

  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();

  const { refetch, isFetching } = useFetchAnalyticsByEmail(getValues("email"));

  const handleLoad = async () => {
    try {
      const response = await refetch();

      const payload =
        response?.data.analyticsCollection?.edges?.[0]?.node?.payload;

        
        if (!payload) {
        handleError("No data found for this email");
        return;
      }

      const points = JSON.parse(payload);
      
      // 🔥 Update chart
      queryClient.setQueryData(CALL_DURATION_KEY_LATEST, points);

      // 🔥 Update form values
      points.forEach((p: any, index: number) => {
        setValue(`points.${index}.value`, String(p.value), {
          shouldValidate: true,
        });
      });

      handleSuccess("Data loaded successfully");
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
      <FormControl fullWidth error={!!errors.email}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              size="small"
              fullWidth
              error={!!errors.email}
            />
          )}
        />
        <FormHelperText sx={{ minHeight: 20 }}>
          {errors.email?.message || " "}
        </FormHelperText>
      </FormControl>

      <Button
        variant="outlined"
        disabled={!email || isFetching || !!errors.email}
        sx={{ height: 40, alignSelf: "flex-start" }}
        onClick={handleLoad}
      >
        Load
      </Button>
    </Box>

  );
};

export default EmailSection;
