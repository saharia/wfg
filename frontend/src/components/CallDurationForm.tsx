import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dataSchema, initialData } from "./schema";
import type { FormSchema } from "./schema";

import EmailSection from "./content/EmailSection";
import PointsSection from "./content/PointsSection";
import SaveSection from "./content/SaveSection";
import { Box } from "@mui/material";

const CallDurationForm = () => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      points: initialData.map(p => ({
        time: p.time,
        value: String(p.value),
      })),
      email: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 400,          // 👈 REQUIRED
        }}
      >

        <EmailSection />
        <PointsSection />
        <SaveSection />
      </Box>
    </FormProvider>
  );
};

export default CallDurationForm;
