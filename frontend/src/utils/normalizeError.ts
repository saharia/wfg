// utils/handleError.ts
import { useToast } from "../context/ToastContext";

export interface NormalizedError {
  success: false;
  message: string;
  errors?: any;
}

export const normalizeError = (error: any): NormalizedError => {
  // Supabase / GraphQL response format
  const body = error?.response?.body ? JSON.parse(error.response.body) : null;

  let message = "Something went wrong";
  let errors = null;

  if (body?.message) {
    message = body.message;
    errors = body?.errors || null;
  } else if (body?.errors && Array.isArray(body.errors) && body.errors.length > 0) {
    message = body.errors[0].message || message;
    errors = body.errors;
  } else if (error?.message) {
    message = error.message;
  }

  return { success: false, message, errors };
};

// React hook version for showing MUI toast
export const useHandleError = () => {
  const { showToast } = useToast();

  return (error: any) => {
    const normalized = normalizeError(error);
    showToast({ message: normalized.message, severity: "error" });
    console.error("API Error:", normalized);
    return normalized;
  };
};

// React hook version for showing MUI toast on success
export const useHandleSuccess = () => {
  const { showToast } = useToast();

  return (message: string) => {
    showToast({ message, severity: "success" });
    console.log("Success:", message);
  };
};