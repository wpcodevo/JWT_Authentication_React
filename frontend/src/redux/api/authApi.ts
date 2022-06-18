import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/login.page';
import { RegisterInput } from '../../pages/register.page';
import { IGenericResponse } from './types';
import { userApi } from './userApi';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: 'login',
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
    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationCode: string }
    >({
      query({ verificationCode }) {
        return {
          url: `verifyemail/${verificationCode}`,
          method: 'GET',
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
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
  useVerifyEmailMutation,
} = authApi;
