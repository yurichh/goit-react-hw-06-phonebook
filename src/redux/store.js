import { configureStore, createSlice } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
/* _________________________________________ Slice for contacts ____________________________________________*/

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    removeContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

/* _________________________________________ Slice for filter ____________________________________________*/

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
/* _________________________________________ PERSIST ____________________________________________*/

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};
const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

/* _________________________________________ STORE ____________________________________________*/

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger],
});

export const persistor = persistStore(store);
