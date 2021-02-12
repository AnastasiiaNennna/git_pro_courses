'use strict'

const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const DELETE_BTN_CLASS = 'delete-btn'
const EDIT_BTN_CLASS = 'edit-btn'
const CONTACT_SELECTOR = '.contactItem';

const contactNameInput = document.querySelector('#contactName');
const contactSurnameInput = document.querySelector('#contactSurname');
const contactPhoneInput = document.querySelector('#contactPhone');
const contactIdInput = document.querySelector('#contactId')
const addContactForm = document.querySelector('#contactForm');
const phonebookEl = document.querySelector('#phonebook')
const contactItemTemplate = document.querySelector('#contactItemTemplate').innerHTML

let contactList = [];

addContactForm.addEventListener('submit', onContactFormSubmit);
phonebookEl.addEventListener('click', onContactListClick);

const contactsResourse = new Http(CONTACTS_URL);

init()

function init() {
    fetchContacts()
}

function onContactListClick(e) {
    const contactEl = getContactElement(e.target);
    switch(true){
        case(e.target.classList.contains(DELETE_BTN_CLASS)):
            return deleteContact(contactEl.dataset.id);
        case(e.target.classList.contains(EDIT_BTN_CLASS)):
            return editContact(contactEl.dataset.id);
    };
};

function onContactFormSubmit(e) {
    e.preventDefault();
    let newContact = getFormData()
    if(newContact.id){
        return updateContact(newContact.id, newContact)
    } else {       
        createContact(newContact)
    }
};

function fetchContacts() {
    contactsResourse.list().then(setContacts).then(renderContacts)
};

function setContacts(list) {
    return contactList = list
};

function renderContacts(list) {
    let html = list.map(getContactHtml).join('');
    phonebookEl.innerHTML = html;
};

function getContactHtml(contact) {
    return contactItemTemplate.replace('{{id}}', contact.id)
                            .replace('{{name}}', contact.name)
                            .replace('{{surname}}', contact.surname)
                            .replace('{{phone}}', contact.phone)
};

function getContactElement(el) {
    return el.closest(CONTACT_SELECTOR);
};

function deleteContact(id) {
    contactList = contactList.filter(contact => contact.id !== id)
    contactsResourse.delete(id)
    renderContacts(contactList)
};

function editContact(id) {
    const editContact = contactList.find(contact => contact.id === id)
    fillContactForm(editContact)
};

function fillContactForm(contact) {
    return contactIdInput.value = contact.id, 
        contactNameInput.value = contact.name, 
        contactSurnameInput.value = contact.surname, 
        contactPhoneInput.value = contact.phone;
};

function getFormData() {
    return {
        id: contactIdInput.value,
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        phone: contactPhoneInput.value
    }
}

function updateContact(id, data) {
    contactsResourse.update(id, data).then(fetchContacts)
    resetForm()
}

function createContact(contact) {
    if(isContactValid(contact)){
        contactsResourse.create(contact)
        .then(data => {
            contactList.push(data)
            renderContacts(contactList)
        })
        resetForm()
    }
};

function isContactValid(contact) {
    return !!contact.name && !!contact.surname && !!contact.phone;
};

function resetForm() {
    addContactForm.reset();
};