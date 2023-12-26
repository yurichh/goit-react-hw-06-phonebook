import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

/* _________________________________________ PERSIST ____________________________________________*/
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};
const root = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const persistedReducers = persistReducer(persistConfig, root);

/* _________________________________________ STORE ____________________________________________*/

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
