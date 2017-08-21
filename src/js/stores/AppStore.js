var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppAPI = require('../utils/appAPI.js');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _contact_to_edit = '';

var AppStore = assign({}, EventEmitter.prototype, {
  getContacts: function () {
    return _contacts;
  },
  setContacts: function (contacts) {
    _contacts = contacts;
  },
  saveContact: function (contact) {
    _contacts.push(contact);
  },
  removeContact: function (contactId) {
    _contacts = _contacts.filter(item => item.id !== contactId);
  },
  setContactToEdit: function (contact) {
    _contact_to_edit = contact;
  },
  getContactToEdit: function () {
    return _contact_to_edit;
  },
  updateContact: function (contact) {
    _contacts = _contacts.filter(item => item.id !== contact.id);
    _contacts.push(contact);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
});


AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AppConstants.SAVE_CONTACT:
      //Store save
      AppStore.saveContact(action.contact);
      //Save to API
      AppAPI.saveContact(action.contact);
      //Emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_CONTACTS:
      AppStore.setContacts(action.contacts);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.REMOVE_CONTACT:
      //Store remove
      AppStore.removeContact(action.contactId);
      //Save to API
      AppAPI.removeContact(action.contactId);
      //Emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.EDIT_CONTACT:
      AppStore.setContactToEdit(action.contact);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.UPDATE_CONTACT:
      AppStore.updateContact(action.contact);
      AppAPI.updateContact(action.contact);
      AppStore.emit(CHANGE_EVENT);
      break;
  }

  return true;
});

module.exports = AppStore;
