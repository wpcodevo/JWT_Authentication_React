import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IPostResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createPost: builder.mutation<IPostResponse, FormData>({
      query(post) {
        return {
          url: '/',
          method: 'POST',
          credentials: 'include',
          body: post,
        };
      },
    }),
    updatePost: builder.mutation<IPostResponse, { id: string; post: FormData }>(
      {
        query({ id, post }) {
          return {
            url: `/post/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: post,
          };
        },
      }
    ),
    getPost: builder.query<IPostResponse, string>({
      query(id) {
        return {
          url: `/post/${id}`,
          credentials: 'include',
        };
      },
    }),
    getAllPosts: builder.query<IPostResponse[], void>({
      query() {
        return {
          url: `/post`,
          credentials: 'include',
        };
      },
    }),
    deletePost: builder.mutation<IPostResponse, string>({
      query(id) {
        return {
          url: `/post/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
} = authApi;
