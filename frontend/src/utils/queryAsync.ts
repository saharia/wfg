import { useQuery, type QueryKey, type QueryFunctionContext } from '@tanstack/react-query';
import { normalizeError } from './normalizeError';

export function useGlobalQuery<TData, TError = any>(
  queryKey: QueryKey,
  queryFn: (context: QueryFunctionContext<QueryKey>) => Promise<TData>,
  options?: Omit<Parameters<typeof useQuery<TData, TError>>[0], 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn: async (context: QueryFunctionContext<QueryKey>) => {
      try {
        return await queryFn(context);
      } catch (err) {
        const normalized = normalizeError(err);
        console.error('Global Query Error:', normalized);
        throw normalized;
      }
    },
    ...options, // safe spread; do NOT include onError here
  });
}
