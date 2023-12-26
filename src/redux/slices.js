import { combineReducers, createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
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
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};
const root = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const persistedReducers = persistReducer(persistConfig, root);
