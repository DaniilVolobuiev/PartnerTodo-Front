import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../API/axios';
import { HYDRATE } from 'next-redux-wrapper';
import { getAuth, postPartnerName } from '@/API/requests';

// export const getUserData = createAsyncThunk(
//   'items/getUserStatus',
//   async (params: Record<string, string>) => {
//     const data = await axios.post('/auth/login', params);
//     return data.data;
//   },
// );

export const getMe = createAsyncThunk('auth/getMe', async (token: string) => {
  return getAuth(token);
});

// export const registerUser = createAsyncThunk(
//   'items/registerUser',
//   async (params: Record<string, string>) => {
//     const data = await axios.post('/auth/register', params);
//     return data.data;
//   },
// );

export const addPartner = createAsyncThunk(
  'auth/addPartner',
  async (partnerName: Record<string, string>) => {
    return postPartnerName(partnerName);
  },
);

const initialState: any = {
  data: null,
  status: 'loading',
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    login(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.authReducer.data;
    },
    createBuilder: (builder) => {
      builder.addCase(getMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      });
      builder.addCase(getMe.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      });
      builder.addCase(getMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
    },

    //       builder.addCase(getUserData.fulfilled, (state, action) => {
    //         state.status = 'success';
    //         state.data = action.payload;
    //       });
    //       builder.addCase(getUserData.rejected, (state) => {
    //         state.status = 'error';
    //         state.data = null;
    //       });
    //       builder.addCase(getMe.pending, (state) => {
    //         state.status = 'loading';
    //         state.data = null;
    //       });
    // builder.addCase(getMe.fulfilled, (state, action) => {
    //   state.status = 'success';
    //   state.data = action.payload;
    //       });
    //       builder.addCase(getMe.rejected, (state) => {
    //         state.status = 'error';
    //         state.data = null;
    //       });
    //       builder.addCase(registerUser.pending, (state) => {
    //         state.status = 'loading';
    //         state.data = null;
    //       });
    //       builder.addCase(registerUser.fulfilled, (state, action) => {
    //         state.status = 'success';
    //         state.data = action.payload;
    //       });
    //       builder.addCase(registerUser.rejected, (state) => {
    //         state.status = 'error';
    //         state.data = null;
    //       });
    //     },
  },
});

export const selectAuth = (state) => Boolean(state.authReducer.data);

export const { logout, login } = authReducer.actions;

export default authReducer.reducer;
