import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          email: data.email,
          password: data.password,
          isEmployee: true,
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for getting user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
