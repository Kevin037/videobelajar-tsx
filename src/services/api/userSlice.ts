import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { UpdateUserData, UserData, UserState } from '../types';

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null ,
  status: null
};

export const registerUserThunk = createAsyncThunk<boolean, UserData, { rejectValue: string }>(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      await api.post('/auth/register', userData);
      return true;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string; errors?: any } } };
        
        // Handle validation errors
        if (error.response?.data?.errors) {
          const validationErrors = error.response.data.errors;
          const firstError = Object.values(validationErrors)[0];
          return thunkAPI.rejectWithValue(Array.isArray(firstError) ? firstError[0] : String(firstError));
        }
        
        // Handle specific error messages
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          if (message.includes('email') && message.includes('already')) {
            return thunkAPI.rejectWithValue('Email sudah terdaftar');
          }
          if (message.includes('phone') && message.includes('already')) {
            return thunkAPI.rejectWithValue('Nomor telepon sudah terdaftar');
          }
          return thunkAPI.rejectWithValue(message);
        }
      }
      
      // Fallback error message
      return thunkAPI.rejectWithValue('Terjadi kesalahan, silakan coba lagi');
    }
  }
);

export const getUserById = createAsyncThunk<UserData, void, { rejectValue: string }>(
  'user/getById',
  async (_,thunkAPI) => {
    try {
      const res = await api.get('/auth/profile');
      if (res?.data?.data.photo != null) {
        localStorage.setItem("user_photo", res?.data?.data.photo); 
      }
      
      return res.data.data;
    } catch (err: unknown) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateUserThunk = createAsyncThunk<boolean, UpdateUserData, { rejectValue: string }>(
  'order/update',
  async (userData, thunkAPI) => {
    try {
      await api.patch(`/auth/update`, userData);

      return true;
    } catch (err: unknown) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateUserPhotoThunk = createAsyncThunk<boolean, FormData, { rejectValue: string }>(
  'user/updatePhoto',
  async (userData, thunkAPI) => {
    try {
      await api.post(`/auth/upload`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      return true; // res berisi data document baru dari Firestore
    } catch (err: unknown) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; // data user baru dari Firestore
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;// data user baru dari Firestore
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(updateUserPhotoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPhotoThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;// data user baru dari Firestore
      })
      .addCase(updateUserPhotoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      });
  },
});

export const { resetError, resetUser } = userSlice.actions;

export default userSlice.reducer;