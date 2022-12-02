// @ts-nocheck
import "../App.css";
import React, { Component } from "react";
import { ApiProvider, Contact } from "../api provider/api_provider";
import { PrimaryButton } from "@fluentui/react";
class AddContactDialog extends Component<
  {
    handleCancelAdd: Function;
    handleCancelUpdate: Function;
    isUpdate?: boolean;
    contact?: Contact;
  }
> {
  constructor(props) {
    super(props);
    this.props.isUpdate === undefined
      ? (this.state = {
          name: "",
          email: "",
          mobile: "",
          landline: "",
          website: "",
          address: "",
          nameWarning: "*",
          mobileWarning: "*",
          emailWarning: "",
        })
      : (this.state = {
          name: this.props.contact?.name,
          email: this.props.contact?.email,
          mobile: this.props.contact?.mobile,
          landline: this.props.contact?.landline,
          website: this.props.contact?.website,
          address: this.props.contact?.address,
          nameWarning: "*",
          mobileWarning: "*",
          emailWarning: "",
        });

    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleCancelUpdate = this.handleCancelUpdate.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);
    this.handleLandlineChange = this.handleLandlineChange.bind(this);
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleCancelAdd(e:any) {
    e.preventDefault();
    this.props.handleCancelAdd();
  }

  handleCancelUpdate(e: React.MouseEvent) {
    e.preventDefault();
    this.props.handleCancelUpdate();
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  handleMobileChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ mobile: event.target.value });
  }

  handleLandlineChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ landline: event.target.value });
  }

  handleWebsiteChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ website: event.target.value });
  }

  handleAddressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ address: event.target.value });
  }

  validateFields(): boolean {
    let nameFilter = /^[A-Za-z ]+$/;
    let mobileFilter = /^\d{10}$/;
    let emailFilter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let count = 0;

    if (this.state.name === "") {
      this.setState({ nameWarning: "Name can't be empty" });
      count++;
    } else {
      if (!nameFilter.test(this.state.name)) {
        this.setState({ nameWarning: "Enter valid name" });
        count++;
      } else {
        this.setState({ nameWarning: "*" });
      }
    }

    if (this.state.email != "") {
      if (!emailFilter.test(this.state.email)) {
        this.setState({ emailWarning: "Enter valid email" });
        count++;
      } else {
        this.setState({ emailWarning: "" });
      }
    }

    if (this.state.mobile === "") {
      this.setState({ mobileWarning: "Mobile can't be empty" });
      count++;
    } else {
      if (!mobileFilter.test(this.state.mobile)) {
        this.setState({ mobileWarning: "Enter valid number" });
        count++;
      } else {
        this.setState({ mobileWarning: "*" });
      }
    }

    return count > 0 ? false : true;
  }

  handleAdd(event) {
    let validation = this.validateFields();
    if (validation === true) {
      let contact = this.createContactDataObject(Date.now().toString());
      let dataArray = ApiProvider.getFromLocalStorage("users");
      dataArray.push(contact);
      ApiProvider.setLocalStorage("users", JSON.stringify(dataArray));
      window.location.reload();
    }
  }

  handleUpdate(e) {
    let validation = this.validateFields();
    let key = this.props.contact?.key;
    if (validation === true) {
      let contact = this.createContactDataObject(Date.now().toString());
      let userList = ApiProvider.getFromLocalStorage("users");
      let obj = userList.find((x: Contact, i) => {
        if (x.key === key) {
          userList[i] = contact;
          return true; 
        }
      });
      ApiProvider.setLocalStorage("users", JSON.stringify(userList));
      window.location.reload();
    }
  }

  createContactDataObject(key: string) {
    let contactDataObject = {
      key: key,
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      landline: this.state.landline,
      website: this.state.website,
      address: this.state.address,
    };
    return contactDataObject;
  }

  render() {
    return (
      <div className="contactBody">
        <div className="addContactDialog show" id="addContactDialog">
          <div>
            <div className="labelRow">
              <p className="addContactLabel">Name</p>
              <p className="addContactWarning">{this.state.nameWarning}</p>
            </div>
            <input
              className="addContactInput"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <div className="labelRow">
              <p className="addContactLabel">Email</p>
              <p className="addContactWarning">{this.state.emailWarning}</p>
            </div>
            <input
              className="addContactInput"
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <div className="addContactRow">
              <div className="parent">
                <div className="labelRowSmall">
                  <p className="addContactLabel">Mobile</p>
                  <p className="addContactWarning">
                    {this.state.mobileWarning}
                  </p>
                </div>
                <input
                  className="addContactInputHalfSize"
                  type="text"
                  value={this.state.mobile}
                  onChange={this.handleMobileChange}
                />
              </div>
              <div className="parent">
                <div className="labelRowSmall">
                  <p className="addContactLabel">Landline</p>
                  <p className="addContactWarning" id="landlineWarning"></p>
                </div>
                <input
                  className="addContactInputHalfSize"
                  type="text"
                  value={this.state.landline}
                  onChange={this.handleLandlineChange}
                />
              </div>
            </div>
            <div className="labelRow">
              <p className="addContactLabel">Website</p>
              <p className="addContactWarning" id="websiteWarning"></p>
            </div>
            <input
              className="addContactInput"
              type="text"
              value={this.state.website}
              onChange={this.handleWebsiteChange}
            />
            <p className="addContactLabel">Address</p>
            <textarea
              name="address"
              value={this.state.address}
              onChange={this.handleAddressChange}
            ></textarea>
          </div>
          {this.props.isUpdate === undefined ? (
            <PrimaryButton
              className="addButton showButton"
              onClick={this.handleAdd}
            >
              Add
            </PrimaryButton>
          ) : null}
          {this.props.isUpdate === undefined ? null : (
            <PrimaryButton
              className="updateButton showButton"
              onClick={this.handleUpdate}
            >
              Update
            </PrimaryButton>
          )}

          <PrimaryButton
            className="cancelButton"
            onClick={
              this.props.isUpdate === undefined
                ? this.handleCancelAdd
                : this.handleCancelUpdate
            }
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

export default AddContactDialog;
