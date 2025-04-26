// import { baseQueryWithReauth } from '@/hooks/customHook/apiHook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL,
    // credentials: 'include',
    prepareHeaders: (headers) => {
      const organisationId = Cookies.get('organisationId'); // Get the cookie value
      if (organisationId) {
        headers.set('organization-id', organisationId);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    
    
    authMe: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh', // Your refresh token endpoint
        method: 'POST',
        body: { refresh_token: refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthMeQuery, useRefreshTokenMutation,useRegisterMutation } = authApi;
