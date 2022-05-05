import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/login.page';
import { RegisterInput } from '../../pages/register.page';
import customFetchBase from './customFetchBase';
import { IUser } from './types';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, RegisterInput>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;
