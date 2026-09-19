import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchClassById, getClassCategories, getClasses } from '../services/api/classSlice';
import { AppDispatch, RootState } from '@/services/store';
import { UseClassParams, useClassType } from '@/services/types';

const useClass = ({id=null,limit=0,category_id = null, price = null, duration = null, search = null, order_by = null}: UseClassParams): useClassType => {
  const dispatch = useDispatch<AppDispatch>();
  const {classData, selectedClass, classFacilities, classCategoriesData} = useSelector((state: RootState) => state.class);
  const limitedClass = classData.slice(0,limit);
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { loading } = useTypedSelector(state => state.class);

  useEffect(() => {
    dispatch(getClasses({category_id, price, duration, search, order_by, limit}));
    dispatch(getClassCategories());
    if (id) {
      dispatch(fetchClassById(id)); 
    }
  }, [dispatch, category_id, price, duration, search, order_by,id, limit]);

  return { classData, loading, selectedClass, limitedClass, classFacilities, classCategoriesData};
};

export default useClass;
