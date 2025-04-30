import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userApi = createApi({
  reducerPath: 'userApi',
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
