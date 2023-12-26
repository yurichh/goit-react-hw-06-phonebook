import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/slices';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const [state, setState] = useState({ name: '', number: '' });

  const checkNameForRepeat = contactName => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === contactName.toLowerCase()
    );
  };

  const handleAddContact = obj => {
    if (checkNameForRepeat(obj.name)) {
      Notiflix.Notify.warning(`${obj.name} is already in contacts`, {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }
    dispatch(addContact(obj));
  };
  const createContactObj = e => {
    e.preventDefault();

    if (!state.name || !state.number) {
      Notiflix.Notify.warning('Ooops... Something missed', {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    const newContactObj = {
      name: state.name,
      number: state.number,
      id: nanoid(),
    };

    handleAddContact(newContactObj);
    setState({ name: '', number: '' });
  };
  const handleChange = ({ target: { name, value } }) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form action="submit" className="add-form" autoComplete="on">
      <label htmlFor="name" className="add-label">
        Name
      </label>
      <input
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={handleChange}
        type="text"
        name="name"
        required
        value={state.name}
        className="add-input"
      />
      <label htmlFor="number" className="add-label">
        Number
      </label>
      <input
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        onChange={handleChange}
        type="tel"
        name="number"
        required
        value={state.number}
        className="add-input"
      />
      <button className="add-btn" type="submit" onClick={createContactObj}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
