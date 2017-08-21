var React = require('react');

var AppActions = require('../actions/AppActions');

var AddForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var contact = {
      name: this.refs.name.value.trim(),
      phone: this.refs.phone.value.trim(),
      email: this.refs.email.value.trim()
    };

    AppActions.saveContact(contact);
  },

  render: function () {
    return (
      <div className="well">
          <h3>Add Contact</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input ref="name" type="text" className="form-control" placeholder="Enter Name ..."/>
            </div>
            <div className="form-group">
              <input ref="phone" type="text" className="form-control" placeholder="Enter Phone ..."/>
            </div>
            <div className="form-group">
              <input ref="email" type="text" className="form-control" placeholder="Enter Email ..."/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    )
  }
});

module.exports = AddForm;
