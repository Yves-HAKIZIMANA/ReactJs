import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: null,
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = slice.actions;

export default slice.reducer;
