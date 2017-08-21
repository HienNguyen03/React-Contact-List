var firebase = require('firebase');

var AppActions = require('../actions/AppActions');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQYE361qwL3cgcTpqFp5gbsce0XLBE3nk",
  authDomain: "contactlist-570b7.firebaseapp.com",
  databaseURL: "https://contactlist-570b7.firebaseio.com",
  projectId: "contactlist-570b7",
  storageBucket: "contactlist-570b7.appspot.com",
  messagingSenderId: "10463975374"
};
firebase.initializeApp(config);

module.exports = {
  saveContact: function (contact) {
    this.firebaseRef = firebase.database().ref().child('contacts');
    this.firebaseRef.push({
      contact: contact
    });
  },

  getContacts: function () {
    this.firebaseRef = firebase.database().ref().child('contacts');
    this.firebaseRef.once('value', function (snapshot) {
      var contacts = [];
      snapshot.forEach(function (childSnapshot) {
        var contact = {
          id: childSnapshot.key,
          name: childSnapshot.val().contact.name,
          phone: childSnapshot.val().contact.phone,
          email: childSnapshot.val().contact.email
        };
        contacts.push(contact);
      });

      AppActions.receiveContacts(contacts);
    });
  },

  removeContact: function (contactId) {
    this.firebaseRef = firebase.database().ref().child(`contacts/${contactId}`);
    this.firebaseRef.remove();
  },

  updateContact: function (contact) {
    var contactId = contact.id;
    var updateContact = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    };
    this.firebaseRef = firebase.database().ref().child(`contacts/${contactId}/contact`);
    this.firebaseRef.update(updateContact);

  }
}
