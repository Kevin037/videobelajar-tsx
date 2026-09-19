import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CompleteModuleThunk, fetchExamByNo, fetchOrderLessonById, submitTestThunk, updateAnswerThunk } from '../services/api/lessonSlice';
import { AnswerDataType, UseLessonResult } from '@/services/types';
import { AppDispatch, RootState } from '@/services/store';

const useLesson = (
  id?: number | string | null, 
  orderId: number | string | null = null, 
  type: string | null = null, 
  no: number | string | null = null): UseLessonResult => {
  const dispatch = useDispatch<AppDispatch>();

  const {selectedLesson,beforeLesson,afterLesson,test,tests,status,submitStatus,answerStatus,resultData} = useSelector((state: RootState) => state.lesson);
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { error, loading } = useTypedSelector(state => state.class);

  const updateAnswer = (AnswerData: AnswerDataType) => {
    dispatch(updateAnswerThunk(AnswerData));
  };

  const submitTest = (orderLessonId: number | string) => {
    dispatch(submitTestThunk(orderLessonId));
  };

  const completeModule = (id: number | string) => {
    dispatch(CompleteModuleThunk(id));
  };

  useEffect(() => {
    if (no) {
      dispatch(fetchExamByNo(no));
    }
    if (id) {
      dispatch(fetchOrderLessonById(id)); 
    }
  }, [dispatch,id,orderId,type,no]);

  return { selectedLesson, loading, error, beforeLesson, afterLesson, test, tests, updateAnswer,status, submitTest, submitStatus, completeModule,answerStatus, resultData };
};

export default useLesson;