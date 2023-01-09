const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  console.log(contactId);
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((item) => item.id == contactId);
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const indx = await data.findIndex((item) => item.id == contactId);
  if (indx === -1) {
    return;
  }
  const removeItem = data.splice(indx, 1);
  const newContacts = await data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return removeItem;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
