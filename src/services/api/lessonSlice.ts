import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { AnswerDataType, LessonState, PageLessonTypes, resultDataType, selectedLessonTypes, TestData } from '../types';

const initialState: LessonState = {
  beforeLesson: null,
  selectedLesson: null,
  afterLesson: null,
  test: null,
  tests: [],
  loading: false,
  error: null,
  status: false,
  submitStatus: false,
  answerStatus: false,
  resultData: null
};

export const fetchOrderLessonById = createAsyncThunk<
  { lesson: selectedLessonTypes; beforeLesson: PageLessonTypes; afterLesson: PageLessonTypes },
  number | string,
  { rejectValue: string }
>(
  'orderLesson/getById',
  async (id, thunkAPI) => {
    try {
      const lesson = await api.get('/my_classes/'+id);
      return {
        lesson : lesson?.data.data,
        beforeLesson: lesson?.data.beforeLesson,
        afterLesson: lesson?.data.afterLesson
      }
    } catch (err) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchExamByNo = createAsyncThunk<
  { test: TestData; tests: TestData[]; resultData: resultDataType },
  number | string,
  { rejectValue: string }
>(
  'test/getByNo',
  async (no, thunkAPI) => {
    try {
      const res = await api.get('/my_classes/test/'+no);
      return {
        test : res?.data?.test,
        tests: res?.data?.tests,
        resultData: res?.data?.resultData
      }
    } catch (err : unknown) {
        let errorMessage = "Something went wrong";
        if (typeof err === "object" && err !== null && "response" in err) {
          const error = err as { response?: { data?: string }; message?: string };
          errorMessage = error.response?.data ?? error.message ?? errorMessage;
        }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateAnswerThunk = createAsyncThunk<boolean, AnswerDataType, { rejectValue: string }>(
  'order/update',
  async (AnswerData, thunkAPI) => {
    try {
      await api.patch('/my_classes/send_answer',AnswerData);
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

export const CompleteModuleThunk = createAsyncThunk<boolean, number | string, { rejectValue: string }>(
  'order_lesson/complete',
  async (id, thunkAPI) => {
    console.log(id);
    
    try {
      await api.patch('/my_classes/process',{id});
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

export const submitTestThunk = createAsyncThunk<boolean, number | string, { rejectValue: string }>(
  'test/submit',
  async (orderLessonId, thunkAPI) => {
    try {
      await api.patch('/my_classes/submit',{id:orderLessonId});
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

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetclass: (state) => {
      state.selectedLesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderLessonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLesson = action.payload.lesson;
        state.beforeLesson = action.payload.beforeLesson;
        state.afterLesson = action.payload.afterLesson;
      })
      .addCase(fetchOrderLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(fetchExamByNo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExamByNo.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload.test;
        state.tests = action.payload.tests;
        state.resultData = action.payload.resultData;
      })
      .addCase(fetchExamByNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(updateAnswerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswerThunk.fulfilled, (state) => {
        state.loading = false;
        state.answerStatus = true; // data user baru dari Firestore
      })
      .addCase(updateAnswerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(submitTestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTestThunk.fulfilled, (state) => {
        state.loading = false;
        state.submitStatus = true;
      })
      .addCase(submitTestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
      .addCase(CompleteModuleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CompleteModuleThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true; // data user baru dari Firestore
      })
      .addCase(CompleteModuleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? true;
      })
  },
});

export const { resetAll, resetError } = lessonSlice.actions;

export default lessonSlice.reducer;