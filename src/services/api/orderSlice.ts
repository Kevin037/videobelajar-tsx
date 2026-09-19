import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { ChangePaymentType, ClassDataType, Order, OrderDataType, ReviewDataType, Section } from '../types';

interface OrderState {
  orderData: Order[];
  orderLessons: Section[];
  myClassData: ClassDataType[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | boolean | null;
  status: boolean | null;
}

const initialState: OrderState = {
  orderData: [],
  orderLessons: [],
  myClassData: [],
  currentOrder: null,
  loading: false,
  error: null,
  status: null,
};

export const createOrderThunk = createAsyncThunk<Order, OrderDataType, { rejectValue: string }>(
  'order/create',
  async (orderData, thunkAPI) => {
    try {
      const res = await api.post(`/orders`, orderData);
      return res?.data.data;
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

export const createReviewThunk = createAsyncThunk<boolean, ReviewDataType, { rejectValue: string }>(
  'order/review',
  async (reviewData, thunkAPI) => {
    try {
      await api.post(`/orders/review`, reviewData);
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

export const updateOrderThunk = createAsyncThunk<boolean, ChangePaymentType, { rejectValue: string }>(
  'order/update',
  async (orderData, thunkAPI) => {
    try {
      await api.patch(`/orders/change_payment/`, orderData);
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

export const paidOrderThunk = createAsyncThunk<boolean, number, { rejectValue: string }>(
  'order/paid',
  async (id, thunkAPI) => {
    try {
      await api.patch(`/orders/process_payment`, id);
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

export const getOrders = createAsyncThunk<Order[], string | null, { rejectValue: string }>(
  'order/fetch',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/orders',{params});
      return response?.data?.data;
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

export const getMyClasses = createAsyncThunk<ClassDataType[], string | null, { rejectValue: string }>(
  'order/myClasses',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/auth/classes',{params});
      return response?.data?.data;
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

export const getOrderById = createAsyncThunk<
  { order: Order; orderLessons: Section[] },
  number,
  { rejectValue: string }
>(
  'order/getById',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('/orders/' + id);
      return {
        order: res?.data?.data,
        orderLessons: res?.data.orderLessons
      }
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetorder: (state) => {
      state.orderData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload; // data user baru dari Firestore
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        // state.orderLessons = action.payload.orderLessons;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(updateOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // data user baru dari Firestore
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.orderLessons = action.payload.orderLessons;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(createReviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReviewThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(paidOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paidOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // data user baru dari Firestore
      })
      .addCase(paidOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(getMyClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.myClassData = action.payload;
        // state.orderLessons = action.payload.orderLessons;
      })
      .addCase(getMyClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
  },
});

export const { resetorder } = orderSlice.actions;

export default orderSlice.reducer;