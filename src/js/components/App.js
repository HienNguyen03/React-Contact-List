var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');
var ContactList = require('./ContactList.js');
var EditForm = require('./EditForm.js');

function getAppState () {
  return {
    contacts: AppStore.getContacts(),
    contactToEdit: AppStore.getContactToEdit()
  };
}

var App = React.createClass({
  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    let {contactToEdit, contacts} = this.state;
    if (contactToEdit == '') {
      var form = <AddForm />
    } else {
      var form = <EditForm contactToEdit={contactToEdit}/>
    }

    return (
      <div>
        {form}
        <ContactList contacts={contacts}/>
      </div>
    )
  },

  _onChange: function () {
    this.setState(getAppState());
  }
});

module.exports = App;