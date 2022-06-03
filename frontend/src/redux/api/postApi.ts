import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IPostResponse } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBase,
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    createPost: builder.mutation<IPostResponse, FormData>({
      query(post) {
        return {
          url: '/posts',
          method: 'POST',
          credentials: 'include',
          body: post,
        };
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (result: { data: { post: IPostResponse } }) =>
        result.data.post,
    }),
    updatePost: builder.mutation<IPostResponse, { id: string; post: FormData }>(
      {
        query({ id, post }) {
          return {
            url: `/posts/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: post,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'Posts', id },
                { type: 'Posts', id: 'LIST' },
              ]
            : [{ type: 'Posts', id: 'LIST' }],
        transformResponse: (response: { data: { post: IPostResponse } }) =>
          response.data.post,
      }
    ),
    getPost: builder.query<IPostResponse, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          credentials: 'include',
        };
      },
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    getAllPosts: builder.query<IPostResponse[], void>({
      query() {
        return {
          url: `/posts`,
          credentials: 'include',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Posts' as const,
                id,
              })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (results: { data: { posts: IPostResponse[] } }) =>
        results.data.posts,
    }),
    deletePost: builder.mutation<IPostResponse, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
} = postApi;
