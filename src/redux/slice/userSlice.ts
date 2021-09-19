import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../model/User';

export interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: [{
    id: 'test',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/60d8aff8-d8e6-4582-aafc-8ae2d14363be-profile_image-300x300.png',
    brodcaster: true,
    displayName: 'undefinedrabbit',
    username: 'undefinedrabbit',
    isLurking: true,
  }, {
    id: 'test1',
    isLurking: false,
    brodcaster: false,
    username: 'undefinedrabbit',
    displayName: 'undefinedrabbit',
  }],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, payload:PayloadAction<User>) => {
      if (state.users.find((u) => u.id === payload.payload.id) === undefined) {
        state.users.push(payload.payload);
      }
    },
  },
});

export const { addUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
