import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

type EmailForm = z.infer<typeof emailSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<boolean>;
  loading?: boolean;
}

const EmailDialog = ({ open, onClose, onSubmit, loading }: Props) => {
  const { control, handleSubmit, reset } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "", // 👈 IMPORTANT
    },
  });

  const handleFormSubmit = async (data: EmailForm) => {
    const success = await onSubmit(data.email);

    if (success) {
      reset();        // ✅ clear form
      onClose();      // optional: close dialog
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"   // 👈 makes dialog smaller
      fullWidth
    >
      <DialogTitle>Enter your email</DialogTitle>

      <DialogContent dividers>
        <form id="email-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                autoFocus
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </form>
      </DialogContent>

      {/* 👇 Footer actions */}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          form="email-form"   // 👈 submits the form from footer
          variant="contained"
          disabled={loading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default EmailDialog;
