import { authApi } from '@/hooks/Api/auth/authHook';
import { countryApi } from '@/hooks/Api/country/countryHook';
import { orgApi } from '@/hooks/Api/organizations/organizationsHook';
import { roleApi } from '@/hooks/Api/role/roleHook';
import { userApi } from '@/hooks/Api/user/userHook';
import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';  // Import setupListeners

export const store = configureStore({
  reducer: {
    // Add the API reducer path to the store
    [countryApi.reducerPath]: countryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orgApi.reducerPath]: orgApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(countryApi.middleware)
  .concat(userApi.middleware)
  .concat(orgApi.middleware)
  .concat(roleApi.middleware)
  .concat(authApi.middleware),  // Add RTK Query middleware
});

// Call setupListeners to set up caching, polling, etc.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
