'use strict'

const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const DELETE_BTN_SELECTOR = '.delete-btn';
const EDIT_BTN_SELECTOR = '.edit-btn';
const CONTACT_SELECTOR = '.contactItem';

const EMPTY_CONTACT = {
    id: '',
    name: '',
    surname: '',
    phone: ''
};

const $contactNameInput = $('#contactName');
const $contactSurnameInput = $('#contactSurname');
const $contactPhoneInput = $('#contactPhone');
const $contactIdInput = $('#contactId');
const $phonebookEl = $('#phonebook');
const $contactInputs = $('.contact-input')
const $contactItemTemplate = $('#contactItemTemplate').html();

const $formModal = $('#formModal').dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
        Save: () => {
            saveContact();
            closeModal();
        },
        Cancel: closeModal,
    },
    show: {
        effect: 'drop',
        duration: 400
    },
    hide: {
        effect: 'clip',
        duration: 400
    },
    close: resetForm,
});

$formModal.find('form').on('submit', ((e) => {
    e.preventDefault();
    saveContact();
    closeModal();
}));

$('#addContactBtn').on('click', onAddBtnClick);
$phonebookEl.on('click', DELETE_BTN_SELECTOR, onDeleteBtnClick)
    .on('click', EDIT_BTN_SELECTOR, onEditBtnClick)

let contactList = [];

const contactsResourse = new Http(CONTACTS_URL);

init();

function init() {
    fetchContacts();
};

function onAddBtnClick() {
    openModal();
};

function onDeleteBtnClick(e) {
    const id = getContactId(e.target);
    deleteContact(id);
};

function onEditBtnClick(e) {
    const id = getContactId(e.target);
    editContact(id);
};

function openModal() {
    $formModal.dialog('open');
};

function closeModal() {
    $formModal.dialog('close');
};

function fetchContacts() {
    contactsResourse.list().then(setContacts).then(renderContacts);
};

function setContacts(list) {
    return contactList = list;
};

function renderContacts(list) {
    let html = list.map(getContactHtml).join('');
    $phonebookEl.append(html);
};

function getContactHtml(contact) {
    return $contactItemTemplate.replace('{{id}}', contact.id)
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{phone}}', contact.phone)
};

function getContactId(el) {
    return $(el).closest(CONTACT_SELECTOR).data('id');
};

function deleteContact(id) {
    // contactList.filter(contact => contact.id !== id);
    contactsResourse.delete(id);
    const $el = getContactElement(id);
    $el && $el.remove();
};

function getContactElement(id) {
    return $phonebookEl.find(`[data-id='${id}']`);
};

function editContact(id) {
    const editContact = contactList.find((el) => el.id == id);
    fillContactForm(editContact);
    openModal(getContactId(id));
};

function fillContactForm(contact) {
    return $contactIdInput.val(contact.id),
        $contactNameInput.val(contact.name),
        $contactSurnameInput.val(contact.surname),
        $contactPhoneInput.val(contact.phone);
};

function saveContact() {
    const newContact = getContactData();
    if (newContact.id) {
        updateContact(newContact.id, newContact);
    } else {
        createContact(newContact);
    };
};

function getContactData() {
    return {
        ...EMPTY_CONTACT,
        id: $('#contactId').val(),
        name: $('#contactName').val(),
        surname: $('#contactSurname').val(),
        phone: $('#contactPhone').val()
    };
};

function updateContact(id, contact) {
    contactsResourse.update(id, contact);
    contactList = contactList.map((el) => el.id == contact.id ? contact : el);
    getContactElement(contact.id).replaceWith(getContactHtml(contact));
};

function createContact(contact) {
    if (isFormValid()) {
        contactsResourse.create(contact)
            .then(data => {
                contactList.push(data);
                $phonebookEl.append(getContactHtml(data));
            });
    } else {
        openDialog();
    };
};

function isFormValid() {
    return $('#contactName').val() && $('#contactSurname').val() && $('#contactPhone').val();
};

function openDialog() {
    $('#dialog').dialog({
        show: {
            effect: 'bounce',
            duration: 300,
        },
        hide: {
            effect: 'fold',
            duration: 400,
        },
    });
};

function resetForm() {
    $contactInputs.val('');
};