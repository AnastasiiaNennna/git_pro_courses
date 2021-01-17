'use strict'

const DELETE_BTN_CLASS = 'delete-btn';
const TO_DO_TASK_CLASS = 'to-do-item'
const TO_DO_TASK_SELECTOR = '.' + TO_DO_TASK_CLASS;
const COMPLETE_TASK_CLASS = 'done';

const toDoTemplate = document.querySelector('#toDoTemplate').innerHTML;
const toDoInput = document.querySelector('#newToDoItem');
const toDolist = document.querySelector('#toDolist');
const toDoForm = document.querySelector('#toDoForm');

toDoForm.addEventListener('submit', onToDoFormSubmit);
toDolist.addEventListener('click', onToDoListClick);

function onToDoFormSubmit(e) {
    e.preventDefault();
    createTaskElement(toDoInput);
};

function onToDoListClick(e) {
    const toDoTaskItem = getToDoTaskRow(e.target);
    switch (true) {
        case (isDeleteBtn(e.target)):
            return deleteToDoTask(toDoTaskItem);
        case (isTaskItem(e.target)):
            return toggleTask(e.target);
    };
};

function createTaskElement(inp) {
    if (isInputValid(inp)) {
        const newTask = getToDoTask(inp);
        addToDoTask(newTask);
        resetForm();
    } else {
        alert('Fill To Do input!');
    };
};

function isInputValid(inp) {
    return inp.value !== '';
};

function getToDoTask(inp) {
    const task = inp.value;
    return task;
};

function addToDoTask(task) {
    const newTaskHtml = generateToDoTaskHtml(task);
    addToDoTaskHtml(newTaskHtml);
};

function generateToDoTaskHtml(task) {
    return toDoTemplate.replace('{{task}}', task);
};

function addToDoTaskHtml(task) {
    return toDolist.insertAdjacentHTML('beforeend', task);
};

function resetForm() {
    toDoForm.reset();
};

function isDeleteBtn(el) {
    return el.classList.contains(DELETE_BTN_CLASS);
};

function isTaskItem(el) {
    return el.classList.contains(TO_DO_TASK_CLASS);
};

function getToDoTaskRow(el) {
    return el.parentElement.closest(TO_DO_TASK_SELECTOR);
};

function deleteToDoTask(el) {
    el.remove();
};

function toggleTask(el) {
    return el.classList.toggle(COMPLETE_TASK_CLASS);
};