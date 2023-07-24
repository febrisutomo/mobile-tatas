import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './slice/authSlice';
import registerFormSlice from './slice/registerFormSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: {
    [authSlice.name]: persistReducer(persistConfig, authSlice.reducer),
    [registerFormSlice.name]: registerFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export default store;
export const persistor = persistStore(store);
