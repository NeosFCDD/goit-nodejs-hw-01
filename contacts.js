const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return;
    }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contactsData = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};