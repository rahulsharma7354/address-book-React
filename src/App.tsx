import "./App.css";
import React, { Component } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBarSection";
import { ApiProvider, Contact } from "./api provider/api_provider";
import ContactDetails from "./components/ContactInfo";
import ContactCardList from "./components/List";
import AddContactDialog from "./components/AddContactDialog";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showAddDialog: false,
      showUpdateDialog: false,
      savedContacts: [],
      selectedContact: null,
    };
    this.handleAddDialog = this.handleAddDialog.bind(this);
    this.handleUpdateDialog = this.handleUpdateDialog.bind(this);
    this.showContact = this.showContact.bind(this);
    let apiProvider = new ApiProvider();
    apiProvider.checkLocalStorage();
  }

  handleAddDialog() {
    this.setState({ showAddDialog: !this.state.showAddDialog });
  }

  handleUpdateDialog() {
    this.setState({ showUpdateDialog: !this.state.showUpdateDialog });
  }

  showContact(id: string) {
    console.log(id);
    let userList = ApiProvider.getFromLocalStorage("users");
    function getData(x: Contact) {
      if (x.key === id) {
        return 1;
      }
    }
    let filterList = userList.filter(getData);
    let selected: Contact = filterList[0];
    this.setState({
      selectedContact: selected,
    });
  }

  componentDidMount() {
    console.log("Fetching Data");
    let contactData: Array<Contact> = ApiProvider.getFromLocalStorage("users");
    if (contactData.length !== 0) {
      this.setState({
        savedContacts: contactData,
        selectedContact: contactData[0],
      });
    }
  }

  render() {
    return (
      <div className="scaffold">
        <Header></Header>
        <NavBar handleDialog={this.handleAddDialog}></NavBar>
        <div className="body">
          <div className="savedContacts">
            <p className="contactHeading">CONTACTS</p>
            {this.state.savedContacts.length !== 0 ? (
              <ContactCardList
                contacts={this.state.savedContacts}
                onClick={this.showContact}
              ></ContactCardList>
            ) : (
              <div className="emptyMessage"><b>No Contacts</b></div>
            )}
          </div>
          {this.state.selectedContact !== null ? (
            <ContactDetails
              contact={this.state.selectedContact}
              handleDialog={this.handleUpdateDialog}
            ></ContactDetails>
          ) : null}
          {this.state.showUpdateDialog === true ? (
            <AddContactDialog
              handleCancelAdd={this.handleAddDialog}
              handleCancelUpdate={this.handleUpdateDialog}
              isUpdate={true}
              contact={this.state.selectedContact}
            ></AddContactDialog>
          ) : null}
          {this.state.showAddDialog === true ? (
            <AddContactDialog
              handleCancelAdd={this.handleAddDialog}
              handleCancelUpdate={this.handleUpdateDialog}
            ></AddContactDialog>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
