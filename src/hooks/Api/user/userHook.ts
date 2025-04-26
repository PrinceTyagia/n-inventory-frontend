import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userApi = createApi({
  reducerPath: 'userApi',
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

  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page = 1, limit = 10, name = '', roleId = '' }) => ({
        url: `/users/all?page=${page}&limit=${limit}&search=${name}&roleId=${roleId}`,
        method: 'GET',
      }),
    }),
    getAllUserByOrg: builder.query({
      query: ({ page = 1, limit = 10, name = '', roleId = '',invite = false }) => ({
        url: `/users/by-org?page=${page}&limit=${limit}&search=${name}&roleId=${roleId}&invite=${invite}`,
        method: 'GET',
      }),
    }),
    postVerifyInviteUser:builder.mutation({
      query: (credentials) => ({
        url: '/users/invite-user/verify',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
});

export const {  useGetAllUserQuery,useGetAllUserByOrgQuery,usePostVerifyInviteUserMutation } = userApi;
