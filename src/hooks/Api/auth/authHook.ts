// import { baseQueryWithReauth } from '@/hooks/customHook/apiHook';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const authApi = createApi({
  reducerPath: 'authApi',
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
