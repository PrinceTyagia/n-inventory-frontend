import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const orgApi = createApi({
  reducerPath: 'orgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const organisationId = Cookies?.get('organisationId');
      if (organisationId) {
        headers.set('organization-id', organisationId);
      }
      return headers;
    },
  }),
  tagTypes:['Organization'],
  endpoints: (builder) => ({
    getAllOrganizations: builder.query({
      query: ({ page = 1, limit = 10, name = '', roleId = '' }) => ({
        url: `/org/all-org?page=${page}&limit=${limit}&search=${name}&roleId=${roleId}`,
        method: 'GET',
      }),
      providesTags:['Organization']
    }),
    getOrganizationsById: builder.query({
      query: ({ orgId  }) => ({
        url: `/org/${orgId}`,
        method: 'GET',
      }),
    }),
    deleteOrganization: builder.mutation({
      query: (orgId: string) => ({
        url: `/org/${orgId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"], // adjust according to your tags
    }),
    createOrganization:builder.mutation({
      query: (payload) => ({
        url: `org/create-org`,
        method: "POST",
        body:payload
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: '/org/verify-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetAllOrganizationsQuery , useGetOrganizationsByIdQuery,useDeleteOrganizationMutation, useCreateOrganizationMutation,useVerifyOtpMutation } = orgApi;
