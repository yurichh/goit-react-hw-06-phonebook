import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/AddContact');
export const removeContact = createAction('contacts/RemoveContact');

const myReducer = createReducer(
  JSON.parse(localStorage.getItem('contacts')) || [],
  builder => {
    builder
      .addCase('contacts/AddContact', (state, action) => [
        ...state,
        action.payload,
      ])
      .addCase('contacts/RemoveContact', (state, action) =>
        state.filter(contact => contact.id !== action.payload.id)
      );
  }
);

export const store = configureStore({
  reducer: {
    contactList: myReducer,
  },
});
