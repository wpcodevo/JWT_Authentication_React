import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../api/types';

interface IUserState {
  user: IUser | null;
  access_token: string | null;
}

const initialState: IUserState = {
  user: null,
  access_token: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setAccessToken } = userSlice.actions;
