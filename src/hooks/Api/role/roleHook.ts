import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const organisationId = Cookies.get('organisationId'); // Get the cookie value
      if (organisationId) {
        headers.set('organization-id', organisationId);
      }
      return headers;
    },
  }),
 tagTypes:['Role'],
  endpoints: (builder) => ({
    getAllRole: builder.query({
      query: ({ page = 1, limit = 10, name = '', roleId = '' }) => ({
        url: `/org/roles/all-roles?page=${page}&limit=${limit}&search=${name}&roleId=${roleId}`,
        method: 'GET',
      }),
      providesTags:['Role']
    }),
    postRoleByOrg: builder.mutation({
        query: (roleData) => ({
          url: '/org/roles/create-role',
          method: 'POST',
          body: roleData,
        }),
        invalidatesTags: ['Role'], 
    }),
    deleteRole: builder.mutation({
        query: (roleId: string) => ({
          url: `/org/roles/${roleId}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Role'], 
    }),
    getRoleByOrg:builder.query({
      query: ({ roleId  }) => ({
        url: `/org/roles/${roleId}`,
        method: 'GET',
      }),
    }),
    putRoleByOrg: builder.mutation({
      query: (roleData) => ({
        url: '/org/roles/update',
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: ['Role'], 
  }),
  }),
});

export const {  useGetAllRoleQuery,usePostRoleByOrgMutation,useDeleteRoleMutation, useGetRoleByOrgQuery, usePutRoleByOrgMutation } = roleApi;
