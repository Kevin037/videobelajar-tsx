import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFacilities } from '../data';
import api from '../api';
import { classCategoriesType, classDateItem, ClassState, ClassType, FacilityItem, GetClassesParams } from '../types';

const initialState: ClassState = {
  selectedClass: null,
  classData: [],
  classFacilities: [],
  classCategoriesData: [],
  loading: false,
  error: null,
};

export const getClasses = createAsyncThunk<
  classDateItem[],
  GetClassesParams,
  { rejectValue: string }
>(
  'class/fetch',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/classes',{params});
      return response.data.data;
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

export const getClassCategories = createAsyncThunk<
  classCategoriesType[],
  void,
  { rejectValue: string }
>(
  'class_categories/fetch',
  async (_,thunkAPI) => {
    try {
      const response = await api.get('/class_categories');
      const data = response.data.data;
      data.push({ id: 0, name: 'Semua Kelas' });
      data.sort((a:classCategoriesType, b:classCategoriesType) => a.id - b.id);
      return data;
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

export const fetchClassById = createAsyncThunk<
  { classData: ClassType; classFacilities: FacilityItem[] },
  number,
  { rejectValue: string }
>(
  'class/getById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get('/classes/' + id);
      const updatedFacilities = getFacilities().map((item) => ({
        ...item,
        value: response.data.data?.[item.key] ?? null
      }));
      return {
        classData: response.data.data,
        classFacilities: updatedFacilities
      };
    } catch (err:unknown) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetclass: (state) => {
      state.classData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action:PayloadAction<classDateItem[]>) => {
        state.loading = false;
        state.classData = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(getClassCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassCategories.fulfilled, (state, action: PayloadAction<classCategoriesType[]>) => {
        state.loading = false;
        state.classCategoriesData = action.payload;
      })
      .addCase(getClassCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClass = action.payload.classData;
        state.classFacilities = action.payload.classFacilities;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      });
  },
});

export const { resetAll, resetError, resetclass } = classSlice.actions;

export default classSlice.reducer;