import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import { normalizeError } from './normalizeError';

export function useGlobalMutation<TData, TVariables = void>(
  mutationFn: (vars: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, any, TVariables>
) {
  const mutation = useMutation<TData, any, TVariables>({
    mutationFn,
    ...options,
    onError: (error: any, variables, onMutateResult, context) => {
      // optional: global logging or toast
      const normalized = normalizeError(error);
      console.error('Global Mutation Error:', normalized);

      // call user-defined onError if any
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });

  // Wrap mutateAsync to throw normalized error
  const mutateAsync = async (vars: TVariables) => {
    try {
      return await mutation.mutateAsync(vars);
    } catch (err) {
      throw normalizeError(err); // throw in your standard format
    }
  };

  return { ...mutation, mutateAsync };
}
