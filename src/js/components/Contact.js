var React = require('react');

var AppActions = require('../actions/AppActions');

var Contact = React.createClass({
  handleRemove: function (i, j) {
    AppActions.removeContact(i);
  },

  handleEdit: function (i, j) {
    AppActions.editContact(i);
  },

  render: function () {
    let {contact} = this.props;
    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>
          <a href="#" className="btn btn-default" onClick={this.handleEdit.bind(this, contact)}>Edit</a> <a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, contact.id)}>Remove</a>
        </td>
      </tr>
    )
  }
});

module.exports = Contact;
