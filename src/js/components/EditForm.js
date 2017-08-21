var React = require('react');

var AppActions = require('../actions/AppActions');

var EditForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var contact = {
      id: this.props.contactToEdit.id,
      name: this.refs.name.value.trim(),
      phone: this.refs.phone.value.trim(),
      email: this.refs.email.value.trim()
    };

    AppActions.updateContact(contact);
  },

  handleChange: function (fieldName, event) {
    var newState = event.target.value;
    var selected = this.state.selected;
    selected.name = newState;
    this.setState({selected: selected});
  },

  render: function () {
    let {contactToEdit} = this.props;
    return (
      <div className="well">
          <h3>Edit Contact</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input ref="name" type="text" onChange={this.handleChange.bind(this, 'name')} value={contactToEdit.name} className="form-control" placeholder="Enter Name ..."/>
            </div>
            <div className="form-group">
              <input ref="phone" type="text" className="form-control" onChange={this.handleChange.bind(this, 'phone')} value={contactToEdit.phone} placeholder="Enter Phone ..."/>
            </div>
            <div className="form-group">
              <input ref="email" type="text" className="form-control" onChange={this.handleChange.bind(this, 'email')} value={contactToEdit.email} placeholder="Enter Email ..."/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    )
  }
});

module.exports = EditForm;
