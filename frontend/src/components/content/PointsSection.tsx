import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import type { FormSchema } from "../schema";

const PointsSection = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormSchema>();

  const liveData = watch("points");

  return (
    <Box sx={{ flex: 1, overflowY: "auto", pr: 1, pt: 1 }}>
      {liveData.map((item, index) => (
        <Box key={item.time} sx={{ mb: 2 }}>
          <Controller
            name={`points.${index}.value`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                inputMode="numeric"
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
  );
};

export default PointsSection;
