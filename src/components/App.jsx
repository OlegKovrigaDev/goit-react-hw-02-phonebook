import React, { Component } from 'react';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { addContact, deleteContact, filterChange } from 'functions';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };



  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    const checkContactName = (name) => {
      if (contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);
        return;
      }
    }
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}>
        <h1>Phonebook</h1>
        <ContactForm
          checkContactName={checkContactName}
          addContact={contact => addContact(contact, this.setState.bind(this))}
        />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onFilterChange={e => filterChange(e, this.setState.bind(this))}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={contactId =>
            deleteContact(contactId, this.setState.bind(this))
          }
        />
      </div>
    );
  }
}
