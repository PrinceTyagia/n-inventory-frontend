import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const roleApi = createApi({
  reducerPath: 'roleApi',
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
