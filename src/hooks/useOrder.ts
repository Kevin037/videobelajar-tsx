// hooks/useUser.js
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createOrderThunk, createReviewThunk, getMyClasses, getOrderById, getOrders, paidOrderThunk, updateOrderThunk } from '../services/api/orderSlice';
import { useEffect } from 'react';
import { ChangePaymentType, OrderDataType, ReviewDataType, useOrderType } from '@/services/types';
import { AppDispatch, RootState } from '@/services/store';

const useOrder = (id: number | null | undefined = null,params: string|null=null, classes = false): useOrderType => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { orderData, currentOrder, loading, error, status, orderLessons, myClassData } = useTypedSelector(state => state.order);

  const createOrder = (userData:OrderDataType) => {
    dispatch(createOrderThunk(userData));
  };

  const createReview = (reviewData:ReviewDataType) => {
    dispatch(createReviewThunk(reviewData));
  };

  const updateOrder = (orderData:ChangePaymentType) => {
    dispatch(updateOrderThunk(orderData));
  };

  const paidOrder = (id:number) => {
    dispatch(paidOrderThunk(id));
  };

    useEffect(() => {
      // if (order_id || user_id) {
        dispatch(getOrders(params)); 
      // }
      if (classes) {
        dispatch(getMyClasses(params));
      }
      if (id) {
        dispatch(getOrderById(id));
      }
    }, [dispatch,params,id, classes]);

  return { currentOrder, loading, error, createOrder, orderData, updateOrder, status, orderLessons, createReview, paidOrder, myClassData };
};

export default useOrder;
