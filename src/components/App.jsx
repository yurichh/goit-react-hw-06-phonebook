import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Notiflix from 'notiflix';

import React from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkNameForRepeat = contactName => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === contactName.toLowerCase()
    );
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
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
    setContacts(prev => [...prev, obj]);
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(c =>
      c.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <h1 className="title">Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <section className="contacts-wrapper">
        {(contacts.length === 0 && (
          <h1 style={{ marginTop: 80, fontSize: 44 }}>
            Ooops... No contacts here
          </h1>
        )) || (
          <>
            <h1 className="title">Contacts</h1>
            <Filter handleFilter={handleFilter} />
            <ContactList
              contactsArray={getVisibleContacts()}
              handleDelete={handleDelete}
            />
          </>
        )}
      </section>
    </>
  );
};

export default App;
