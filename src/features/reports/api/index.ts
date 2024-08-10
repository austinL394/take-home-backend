import { SubjectData, SubjectResponse, SubjectResponseSchema, SearchFilters } from '../types';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient, { axiosClientPDF } from 'utils/axiosClient';
import { ZodError } from 'zod';

export const HS_ORG_ID = '5c10e8a9206814e3d0c1e405582b977f97d25a61284865b668f061d7800eb2e9';



export const useSubject = (subjectId: string): UseQueryResult<SubjectData> => {

  return useQuery({
    queryKey: ['getSubject', subjectId],
    queryFn: async ({ queryKey }: { queryKey: [string, string] }) => {
      const [_key, subjectId] = queryKey;
      const { data } = await axiosClient.get(`/organizations/${HS_ORG_ID}/subjects/${subjectId}`, {
        headers: {
        },
      });
      try {
        const validated = SubjectResponseSchema.parse(data);
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

export const usePDFDownloader = () => {

  return async (subjectId: string, fileHash: string): Promise<Blob> => {
    let started = false;
    const response = await axiosClientPDF.post(
      '/pdf/report',
      {
        url: `/print/reports/${subjectId}/ecg/${fileHash}`,
        format: 'letter',
      },
      {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (!started && progressEvent.loaded) {
            started = true;
            console.log('transfer started');
          }
        },
      },
    );

    if (!response.data) {
      throw new Error('Failed to download PDF');
    }

    return response.data;
  };
};

export const useLocations = () => {

  return useQuery({
    queryKey: ['getLocations'],
    queryFn: async ({ queryKey }: { queryKey: [string] }) => {
      const [_key] = queryKey;
      const { data } = await axiosClient.get(`/organizations/${HS_ORG_ID}/sites`, {
        headers: {
        },
      });
      return data;
    },
  });
};


export const useSubjects = (filterParams: SearchFilters) => {

  return useQuery({
    queryKey: ['getSubjects', filterParams],
    queryFn: async ({ queryKey }: { queryKey: [string, SearchFilters] }) => {
      const [_key, { query, acquisitionFrom, acquisitionTo, scanLocation, selectedAIResult, selectedPriorityType }] =
        queryKey;
      const params: { [key: string]: string | Date | null | undefined } = {
        search: query,
        AcquisitionDate_start: acquisitionFrom?.toISOString()?.substring(0, 10),
        AcquisitionDate_end: acquisitionTo?.toISOString()?.substring(0, 10),
        SiteName: scanLocation,
        results: selectedAIResult,
        Priority: selectedPriorityType,
      };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });

      const { data } = await axiosClient.get(`/organizations/${HS_ORG_ID}/subjects`, {
        params,
        headers: {
        },
      });
      return data;
    },
  });
};
