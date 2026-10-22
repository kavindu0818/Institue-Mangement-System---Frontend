import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authSlice';
import attendanceReducer from './attendanceSlice';
import examsReducer from './examsSlice';
import scheduleReducer from './scheduleSlice';
import feesReducer from './feesSlice';
import announcementsReducer from './announcementsSlice';
import chatReducer from './chatSlice';
import materialsReducer from './materialsSlice';
import instituteReducer from './instituteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    exams: examsReducer,
    schedule: scheduleReducer,
    fees: feesReducer,
    announcements: announcementsReducer,
    chat: chatReducer,
    materials: materialsReducer,
    institute: instituteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
