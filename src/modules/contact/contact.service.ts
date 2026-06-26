import { Contact } from "./contact.model";
import { IContact } from "./contact.interface";

const createContact = async (payload: IContact) => await Contact.create(payload);
const getAllContacts = async () => await Contact.find().sort({ createdAt: -1 });
const deleteContact = async (id: string) => await Contact.findByIdAndDelete(id); // Notun Delete option add kora holo

export const ContactService = { createContact, getAllContacts, deleteContact };