import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { connect } from 'react-redux'

import UserModal from "../UserModal";
import { css } from "@emotion/core";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import { addUser, addUserProgress, editUser, editUserProgress, filterUser, filterUserProgress, deleteUser, deleteUserProgress } from '../../Actions/UserActions.js';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './InitialPage.css';

const mapStateToProps = state => ({
  userProps: state.userProps,
});
const mapDispatchToProps = dispatch => ({
  addUser: data => dispatch(addUser(data)),
  addUserProgress: () => dispatch(addUserProgress()),
  editUser: data => dispatch(editUser(data)),
  editUserProgress: () => dispatch(editUserProgress()),
  filterUser: data => dispatch(filterUser(data)),
  filterUserProgress: () => dispatch(filterUserProgress()),
  deleteUser: id => dispatch(deleteUser(id)),
  deleteUserProgress: () => dispatch(deleteUserProgress()),
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class InitialPage extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
    console.log('userProps:', this.props.userProps);
    const usersList = this.props.userProps.usersList;
    this.state = {
      usersList,
      loading: true,
      selectedUser: [],
      addOrEdit: '',
      showAddEditModal: false,
    };
    this.handleUserItemClick = this.handleUserItemClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(prevState => ({
        loading: false,
      }));
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.userProps.deleteUserInProgress);
    if (prevProps.userProps.deleteUserInProgress !== this.props.userProps.deleteUserInProgress) {
      this.setState(prevState => ({
        usersList: this.props.userProps.usersList,
        selectedUser: [],
      }));
      this.props.deleteUserProgress();
    }
    if (prevProps.userProps.addUserInProgress !== this.props.userProps.addUserInProgress || (prevProps.userProps.editUserInProgress !== this.props.userProps.editUserInProgress)) {
      this.setState(prevState => ({
        usersList: this.props.userProps.usersList,
      }));
      this.props.editUserProgress();
      this.props.addUserProgress();
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: value,
    }));
    this.props.filterUser(value);
    this.setState(prevState => ({
      selectedUser: [],
    }));
  }

  handleUserItemClick (data) {
    this.setState(prevState => ({
      selectedUser: data,
    }));
  }

  showModal(data) {
    if (data) {
      this.setState(prevState => ({
        showAddEditModal: true,
        addOrEdit: 'Edit',
      }));
    } else {
      this.setState(prevState => ({
        showAddEditModal: true,
        addOrEdit: 'Add',
      }));
    }
  }

  deleteUser(data) {
    this.props.deleteUser(data._id);
  }


  closeModal() {
    this.setState(prevState => ({
      showAddEditModal: false,
    }));
  }

  onSubmit(data, addOrEdit, id) {
    let { usersList } = this.state;
    const { name, email, phone, company, designation, address } = data;
    if (addOrEdit === 'Add') {
      const item = {
        _id: (usersList.length + 1),
        color: this.getRandomColor(),
        name,
        email,
        phone,
        company,
        designation,
        address,
      };
      this.props.addUser(item);
      this.childRef.current.messageDisplay('Succesfully Created.....');
    } else {
      this.props.editUser({ ...data, id });
      this.childRef.current.messageDisplay('Succesfully Edited.....');
    }

    console.log('users: ', usersList);
    this.setState(prevState => ({
      usersList,
    }));
  }

  // Created simple navbar for design purpose
  renderMenu() {
    return (
      <div>
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <Toggle />
            <Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem>
            </Nav>
        </SideNav>
        <div className="nav-bar-slide">
          <div className="navbar">
            <div className="search-icon">
              <i className="fa fa-search"></i>
            </div>
            <div id="navbar-right">
              <div className="add-btn">
                <i className="fa fa-plus"></i> Add
              </div>
              <div className="email-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="dd-name">
                Sumana
                <i className="fa fa-sort-down dd-icon"></i>
              </div>
              <div className="notify-icon">
                <i className="fa fa-bell"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderContactList() {
    const { usersList } = this.state;
    return usersList.map((item, i) => {
      const color = item.color;
      return (
        <div
          key={'user-' + i}
          className="user-item"
          onClick={() => this.handleUserItemClick(item)}
        >
          <div className="user-avatar-name">
            <section title=".squaredFour">
              <div className="squaredFour">
                <input type="checkbox" value="None" id={'check' + i} name={'check' + i} />
                <label htmlFor={'check' + i}></label>
              </div>
            </section>
            <div className="avatar-circle" style={{ backgroundColor: color }}>
              <span className="initials">{item.name.match(/\b(\w)/g).join('').toUpperCase()}</span>
            </div>
            <div className="user-name-email">
              <div className="user-item-name">{item.name}</div>
              <div className="user-email">{item.email} </div>
            </div>
          </div>
          <div>
            <div className="user-company">{item.company}</div>
          </div>
        </div>
      );
    });
  }

  renderUserDetails() {
    const { selectedUser } = this.state;
    if (selectedUser.name) {
      return (
        <div className="user-table">
          <div className="edit-delete-btn">
            <button className="edit-icon-btn" type="submit" onClick={()=>this.showModal(selectedUser)}>
              <i className="fa fa-edit"></i>
            </button>
            <button className="edit-icon-btn" type="submit" onClick={()=>this.deleteUser(selectedUser)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
          <div className="user-detail-container">
            <div className="avatar-detail-circle" style={{ backgroundColor: selectedUser.color }}>
              <span className="detail-initials">{selectedUser.name.match(/\b(\w)/g).join('').toUpperCase()}</span>
            </div>
            <div className="user-name-email">
              <div className="user-detail-name">{selectedUser.name}</div>
              <div className="user-detail-email">{selectedUser.designation} </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="left-td">First name: </td>
                  <td className="right-td">{selectedUser.name}</td>
                </tr>
                <tr>
                  <td className="left-td">Email: </td>
                  <td className="right-td">{selectedUser.email}</td>
                </tr>
                <tr>
                  <td className="left-td">Phone: </td>
                  <td className="right-td">{selectedUser.phone}</td>
                </tr>
                <tr>
                  <td className="left-td">Company: </td>
                  <td className="right-td">{selectedUser.company}</td>
                </tr>
                <tr>
                  <td className="left-td">address: </td>
                  <td className="right-td">{selectedUser.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  render() {
    const { loading, selectedUser, addOrEdit, usersList, showAddEditModal, search } = this.state;
    if (loading) {
      return (
        <div className="sweet-loading">
          <ScaleLoader
            css={override}
            size={150}
            color={'#123abc'}
            loading={loading}
          />
        </div>
      );
    }

    return (
      <div>
        { this.renderMenu() }
        <div className="contact-container">
          <div className="contact-list-container">
            <div className="contact-icon-title">
              <i className="fa fa-address-book"></i>
              <div className="title-subtitle">
                <div className="title"> Contacts </div>
                <div className="subtitle">
                  Welecome to FlatCRM contact page
                </div>
              </div>
            </div>
            <div className="search-add-btn">
              <div className="search-input-btn">
                <input className="search-input" type="text" placeholder="Search.." name="search" value={search} onChange={this.handleChange}/>
                <button className="search-icon-btn" type="submit"><i className="fa fa-search"></i>
                </button>
              </div>
              <button className="add-icon-btn" type="submit" onClick={() => this.showModal()}><i className="fa fa-plus"></i>
              Add Contact</button>
            </div>
            <div className="contact-list">
              {
                usersList.length > 0 &&
                <div>
                  { this.renderContactList() }
                </div>
              }
              {
                usersList.length === 0 &&
                <div className="no-data">
                 No user/s found.!
                </div>
              }
              {this.renderUserDetails() }
            </div>
          </div>
        </div>
        {
          showAddEditModal &&
          <UserModal
            ref={this.childRef}
            addOrEdit={addOrEdit}
            selectedUser={selectedUser}
            closeModal={this.closeModal}
            onSubmit={this.onSubmit}
          />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);
