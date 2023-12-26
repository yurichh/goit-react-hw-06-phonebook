import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { useSelector } from 'react-redux';

const App = () => {
  const contacts = useSelector(state => state.contacts);

  return (
    <>
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <section className="contacts-wrapper">
        {(contacts.length === 0 && (
          <h1 style={{ marginTop: 80, fontSize: 44 }}>
            Ooops... No contacts here
          </h1>
        )) || (
          <>
            <h1 className="title">Contacts</h1>
            <Filter />
            <ContactList />
          </>
        )}
      </section>
    </>
  );
};

export default App;
