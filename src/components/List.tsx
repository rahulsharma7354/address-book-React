// @ts-nocheck
import "../App.css";
import React, { Component } from "react";
import { Contact } from "../api provider/api_provider";
import ContactCard from "./Contacts";
class ContactCardList extends Component<{
  contacts: Array<Contact>;
  onClick: Function;
}> {
  constructor(props) {
    super(props);
    this.state = { contacts: this.props.contacts };
    this.showContact = this.showContact.bind(this);
  }

  showContact(id: string) {
    this.props.onClick(id);
  }
  render() {
    const contactList = this.props.contacts.map((contact) => {
      console.log(contact);
      return (
        <ContactCard
          key={contact.key}
          contact={contact}
          showContact={this.showContact}
        ></ContactCard>
      );
    });
    return <>{contactList}</>;
  }
}

export default ContactCardList;
