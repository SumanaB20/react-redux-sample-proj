import React from 'react';
import 'react-calendar/dist/Calendar.css';

import './UserModal.css';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    const { addOrEdit } = this.props;
    this.state = {
      name: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.name) ? this.props.selectedUser.name: '',
      email: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.email) ? this.props.selectedUser.email: '',
      phone: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.phone) ? this.props.selectedUser.phone: '',
      company: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.company) ? this.props.selectedUser.company: '',
      designation: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.designation) ? this.props.selectedUser.designation: '',
      address: (addOrEdit === 'Edit' && this.props.selectedUser && this.props.selectedUser.address) ? this.props.selectedUser.address: '',
      nameError: '',
      emailError: '',
      phoneError: '',
      companyError: '',
      designationError: '',
      addressError: '',
      messageDisplay: '',
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddOrEdit = this.handleAddOrEdit.bind(this);
    this.messageDisplay = this.messageDisplay.bind(this);
  }

  handleRequestClose() {
    this.props.closeModal();
  }

  handleAddOrEdit() {
    console.log(this.state);
    const { name, email, phone, company, designation, address } = this.state;
    let nameError = '';
    let emailError = '';
    let phoneError = '';
    let companyError = '';
    let designationError = '';
    let addressError = '';

    if (name === '') {
      nameError = 'Enter name';
    } else {
      nameError = '';
    }
    if (email === '') {
      emailError = 'Enter email';
    } else {
      const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegx.test(String(email).toLowerCase())) {
        emailError = 'Enter valid email';
      } else {
        emailError = '';
      }
    }
    console.log('phone.length: ', phone.length);
    if (phone === '') {
      phoneError = 'Enter phone';
    } else {
      const phoneRegx = /^\d{10}$/;
      if (phone.length !== 10) {
        phoneError = 'Enter valid number';
      } else if (!phoneRegx.test(String(phone).toLowerCase())) {
        phoneError = 'Enter valid number';
      } else {
        phoneError = '';
      }
    }
    if (company === '') {
      companyError = 'Enter company';
    } else {
      companyError = '';
    }
    if (designation === '') {
      designationError = 'Enter designation';
    } else {
      designationError = '';
    }
    if (address === '') {
      addressError = 'Enter address';
    } else {
      addressError = '';
    }

    this.setState(prevState => ({
      nameError,
      emailError,
      phoneError,
      companyError,
      designationError,
      addressError,
    }));

    if (nameError === '' && emailError === '' && phoneError === '' && companyError === '' && designationError === '' && addressError === '') {
      this.props.onSubmit(this.state, this.props.addOrEdit, this.props.selectedUser._id);
    }
  }

  messageDisplay(message) {
    this.setState(prevState => ({
      messageDisplay: message,
    }));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: value,
    }));
  }

  renderForm() {
    const { name, email, phone, company, designation, address, messageDisplay } = this.state;
    const { nameError, emailError, phoneError, companyError, designationError, addressError } = this.state;
    return (
      <div>
        <label for="fname">First Name</label>
        <input
          className="name-input"
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={this.handleChange}
        />
        {nameError && <div className="errorField">{nameError}</div>}

        <label for="lname">Email</label>
        <input
          className="name-input"
          type="text"
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={this.handleChange}
        />
        {emailError && <div className="errorField">{emailError}</div>}

        <label for="lname">Phone</label>
        <input
          className="name-input"
          type="text"
          id="phone"
          name="phone"
          placeholder="Your phone"
          value={phone}
          onChange={this.handleChange}
        />
        {phoneError && <div className="errorField">{phoneError}</div>}

        <label for="lname">Company</label>
        <input
          className="name-input"
          type="text"
          id="company"
          name="company"
          placeholder="Your company"
          value={company}
          onChange={this.handleChange}
        />
        {companyError && <div className="errorField">{companyError}</div>}

        <label for="lname">Designation</label>
        <input
          className="name-input"
          type="text"
          id="designation"
          name="designation"
          placeholder="Your designation"
          value={designation}
          onChange={this.handleChange}
        />
        {designationError && <div className="errorField">{designationError}</div>}

        <label for="lname">Address</label>
        <input
          className="name-input"
          type="text"
          id="address"
          name="address"
          placeholder="Your address"
          value={address}
          onChange={this.handleChange}
        />
        {addressError && <div className="errorField">{addressError}</div>}

        <input type="submit" value="Submit" onClick={this.handleAddOrEdit} />

        {messageDisplay &&
          <div className="successMessages">
            {messageDisplay}
          </div>
        }
      </div>
    );
  }

  render() {
    const { addOrEdit } = this.props;
    return (
      <div className="user-modal-container-overlay">
        <div className="user-modal-container">
          <div>
            <div className="close-bg-icon">
              <div className="close-icon" onClick={this.handleRequestClose}>
                <i className="fa fa-close"></i>
              </div>
            </div>
            <div className="user-modal-title">
              {addOrEdit === 'Add' ? 'Add User' : 'Edit User' }
            </div>
            { this.renderForm() }
          </div>
        </div>
      </div>
    );
  }
}

export default UserModal;
