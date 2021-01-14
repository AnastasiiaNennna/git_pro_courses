'use strict'

const DELETE_BTN_CLASS = 'delete-btn';
const TO_DO_TASK_ROW = '.to-do-item';
const COMPLETE_TASK_CLASS = 'done';

const toDoTemplate = document.querySelector('#toDoTemplate').innerHTML;
const toDoInput = document.querySelector('#newToDoItem');
const toDolist = document.querySelector('#toDolist');
const toDoForm = document.querySelector('#toDoForm');

toDoForm.addEventListener('submit', onToDoFormSubmit);
toDolist.addEventListener('click', onToDoBtnClick);
toDolist.addEventListener('click', onToDoTaskClick);

function onToDoFormSubmit(e) {
    e.preventDefault();
    createTaskElement(toDoInput);
};

function onToDoBtnClick(e) {
    if (getDeleteBtn(e.target)){
        const toDoTaskItem = getToDoTaskRow(e.target);
        deleteToDoTask(toDoTaskItem);
    };
};

function onToDoTaskClick(e) {
    e.preventDefault();
    getCompletedTask(e.target);
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

function getDeleteBtn(el) {
    return el.classList.contains(DELETE_BTN_CLASS);
};

function getToDoTaskRow(el) {
    return el.parentElement.closest(TO_DO_TASK_ROW);
};

function deleteToDoTask(el) {
    el.remove();
};

function getCompletedTask(el) {
    return el.classList.toggle(COMPLETE_TASK_CLASS);
};