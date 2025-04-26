import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const user = JSON.parse(Cookies.get('user') || '{}');      
      const organisationId = user.organisationId
      if (organisationId) {
        headers.set('orgId', organisationId);
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
