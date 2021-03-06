'use strict'

let phonebook = document.querySelector('#phonebook');
let contactNameEl = document.querySelector('#contactName');
let contactPhoneEl = document.querySelector('#contactPhone');
let contactEmailEl = document.querySelector('#contactEmail');
let addContactEl = document.querySelector('#addContact');

addContactEl.addEventListener('click', onAddBtnClick);

function onAddBtnClick() {
    if (isInputValid()) {
        addNewContact();
        clearInput();
    } else {
        alert('Fill in all contact details');
    };
}

function addNewContact() {
    let phonebookEl = document.createElement('ul');
    phonebookEl.className = 'userPhonebookList';
    phonebook.append(phonebookEl);
    phonebookEl.appendChild(addPhonebookButton())
    phonebookEl.appendChild(addPhonebookEl(contactNameEl));
    phonebookEl.appendChild(addPhonebookEl(contactPhoneEl));
    phonebookEl.appendChild(addPhonebookEl(contactEmailEl));
    
    phonebookEl.firstChild.addEventListener ('click', () => phonebookEl.remove()) ;
};

function addPhonebookEl(el) {
    let contactEl = document.createElement('li');
    contactEl.textContent = el.value;
    return contactEl;    
};

function addPhonebookButton() {
    let removeButton = document.createElement('button');
    removeButton.textContent = 'REMOVE';
    return removeButton;
};

function clearInput() {
    contactNameEl.value = '';
    contactPhoneEl.value = '';
    contactEmailEl.value = '';
};

function isInputValid() {
   return contactNameEl.value && contactPhoneEl.value && contactEmailEl.value;
}