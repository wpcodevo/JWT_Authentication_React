import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostResponse } from '../api/types';

interface IPostState {
  post: IPostResponse | null;
}

const initialState: IPostState = {
  post: null,
};

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    postState: (state, action: PayloadAction<IPostResponse>) => {
      state.post = action.payload;
    },
  },
});

export default postSlice.reducer;

export const { postState } = postSlice.actions;
