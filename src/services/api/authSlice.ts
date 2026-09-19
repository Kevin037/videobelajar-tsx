import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import { AuthState, ErrorResponse, LoginCredentials, LoginResponse } from "../types";

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: false,
};

export const loginUserThunk = createAsyncThunk<
  string, 
  LoginCredentials,  
  {rejectValue: string}
>(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      const { token, user } = response.data;
      
      if (user) {
        localStorage.setItem("user", user.id);
        if (user.photo != null) {
          localStorage.setItem("user_photo", user.photo); 
        }
        localStorage.setItem("token", token);
        return token;
      }
      
      return thunkAPI.rejectWithValue("Login gagal, silakan coba lagi");
    } catch (err: any) {
      if (err.response?.data) {
        const errorData = err.response.data as ErrorResponse;
        return thunkAPI.rejectWithValue(errorData.message || "Login gagal");
      }
      // Handle network or other errors
      return thunkAPI.rejectWithValue("Terjadi kesalahan, silakan coba lagi");
    }
  }
);

export const logOutuserThunk = createAsyncThunk<
  boolean,
  void,
  {rejectValue: string}
>(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_photo");
      return true;
    } catch (err: unknown) {
      let errorMessage = "Logout gagal";
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: ErrorResponse }; message?: string };
        errorMessage = error.response?.data?.message ?? error.message ?? errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_photo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? "Login gagal";
      })
      .addCase(logOutuserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutuserThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
        state.user = null;
        state.error = null;
      })
      .addCase(logOutuserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Logout gagal";
        state.status = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;