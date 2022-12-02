// @ts-nocheck
import "../App.css";
import edit from './media/edit1.jpg'
import delete2 from './media/delete2.png'
import React, { Component } from "react";
import { ApiProvider, Contact } from "../api provider/api_provider";

class ContactDetails extends Component<
  { contact: Contact; handleDialog: Function }
  
> {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  editContact(e:undefined) {
    e.preventDefault();
    this.props.handleDialog!();
  }

  deleteContact() {
    let userList = ApiProvider.getFromLocalStorage("users");
    let key = this.props.contact.key;
    function getData(x: Contact) {
      if (x.key === key) {
        return 0;
      }
      return 1;
    }
    let updatedUserList = userList.filter(getData);
    ApiProvider.setLocalStorage("users", JSON.stringify(updatedUserList));
    window.location.reload();
  }

  render() {
    const item = this.props.contact;
    return (
      <div className="contactBody">
        <div className="contactDetailCard" id="contactDetailCard">
          <div className="contactDetailsHeading">
            <p className="contactName boldName" id="nameDetail">
              {item.name}
            </p>
            <div className="editDiv" onClick={this.editContact}>
              <img className="editIcon" src={edit} alt="edit" />
              <p>EDIT</p>
            </div>
            <div className="deleteDiv" onClick={this.deleteContact}>
              <img
                className="deleteIcon"
                src={delete2}
                alt="delete"
              />
              <p>DELETE</p>
            </div>
          </div>
          <div className="row">
            <p className="detailsStyle">Email:</p>
            <p className="detailsStyle" id="emailDetail">
              {item.email}
            </p>
          </div>
          <div className="row">
            <p className="noPaddingMargin detailsStyle">Mobile:</p>
            <p className="noPaddingMargin detailsStyle" id="mobileDetail">
              {item.mobile}
            </p>
          </div>
          <div className="row">
            <p className="noPaddingMargin detailsStyle">Landline:</p>
            <p className="noPaddingMargin detailsStyle" id="landlineDetail">
              {item.landline}
            </p>
          </div>
          <div className="row">
            <p className="detailsStyle">Website:</p>
            <p className="detailsStyle" id="websiteDetail">
              {item.website}
            </p>
          </div>
          <div className="row">
            <p className="detailsStyle">Address:&nbsp;</p>
            <div className="contactAddress">
              <p className="detailsStyle" id="addressDetail1">
                {item.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactDetails;
