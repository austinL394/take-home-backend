import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient, { axiosClientPDF } from 'utils/axiosClient';
import { ZodError } from 'zod';
import { Collection, CollectionsResponseSchema } from '../types';

export const useCollections = (): UseQueryResult<Collection[]> => {
  return useQuery({
    queryKey: ['getCollections'],
    queryFn: async ({ queryKey }: { queryKey: [string] }) => {
      const [_key] = queryKey;
      const { data } = await axiosClient.get(`/collections/`, {
        headers: {},
      });
      try {
        const validated = CollectionsResponseSchema.parse(data);
        return validated.result;
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          console.log(JSON.stringify(e.errors, null, 2));
        }
        throw e;
      }
    },
  });
};
