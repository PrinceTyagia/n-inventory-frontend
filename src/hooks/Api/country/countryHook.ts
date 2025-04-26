import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.countrystatecity.in/v1',
    prepareHeaders: (headers) => {
      headers.set('X-CSCAPI-KEY', 'ODVvTUxZejcxdUtDNGRaMHBMZXZ3SGlKMWZlVEFVNVQ4dTJVVkhmYQ==');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountryWiseState: builder.query({
      query: () => '/countries/IN/states',
    }),
    getCountry: builder.query({
      query: () => '/countries',
    }),
    // Add the new endpoint to fetch cities by state
    getCitiesByState: builder.query({
      query: (stateCode: string) => `/countries/IN/states/${stateCode}/cities`,  // Dynamic endpoint for state code
    }),
  }),
});

// Export hooks for queries
export const { useGetCountryWiseStateQuery, useGetCitiesByStateQuery, useGetCountryQuery } = countryApi;
