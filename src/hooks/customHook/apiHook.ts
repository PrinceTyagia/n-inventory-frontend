import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

// Base query with authorization header
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken'); // Get token from cookies
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Base query with re-authentication logic (only using cookies, no Redux store)
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions); // First attempt

  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get('refreshToken'); // Get refresh token from cookies
    if (!refreshToken) return result;

    // Try to refresh the token using the refresh token
    const refreshResult = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken,expiresInMins:1 }), // Send refresh token
      credentials: 'include', // Ensure cookies are included (if any)
    });

    const data = await refreshResult.json();

    if (data.accessToken && data.refreshToken) {
      // Store the new tokens in cookies
      Cookies.set('accessToken', data.accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
      Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

      // Retry the original request with the new access token
      result = await baseQuery(args, store, extraOptions);
    } else {
      // Handle error (e.g., logging out user if refresh fails)
      console.error('Refresh token failed or expired');
      // You can redirect the user to a login page or log them out if necessary
      // For example, you could redirect to login:
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('isAuth');


    }
  }

  return result;
};
