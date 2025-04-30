import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const orgApi = createApi({
  reducerPath: 'orgApi',
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');
      const userCookie = Cookies.get('user');
  
      let organisationId: string | undefined;
  
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie);
          organisationId = user.organisationId || user.organizationId;
        } catch (error) {
          console.error('Failed to parse user cookie:', error);
        }
      }
  
      // Set headers only if values exist
      if (organisationId) {
        headers.set('orgId', organisationId);
      }
  
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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
