'use strict'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos/';

const DELETE_BTN_CLASS = 'delete-btn';
const TODO_TASK_CLASS = 'to-do-item'
const TODO_TASK_SELECTOR = '.' + TODO_TASK_CLASS;
const DONE_CLASS = 'done';

const todoItemTemplate = document.querySelector('#todoItemTemplate').innerHTML;
const todoItemInput = document.querySelector('#newTodoItem');
const listEl = document.querySelector('#todoList');
const todoForm = document.querySelector('#todoForm');

let todoList = [];

todoForm.addEventListener('submit', onTodoFormSubmit);
listEl.addEventListener('click', onToDoListClick);

init();

function init() {
    fetchTodos();
};

function fetchTodos() {
    fetch(TODOS_URL)
        .then(res => res.json())
        .then(setTodos)
        .then(renderTodos)
};

function setTodos(list) {
    return todoList = list
};

function renderTodos(list) {
    let html = list.map(getTodoHtml).join('');
    listEl.innerHTML = html;
};

function getTodoHtml(todo) {
    return todoItemTemplate.replace('{{task}}', todo.title)
            .replace('{{doneClass}}', todo.completed ? DONE_CLASS : ' ')
            .replace('{{id}}', todo.id)
};

function onTodoFormSubmit(e) {
    e.preventDefault();
    createTaskElement(todoItemInput);
};

function onToDoListClick(e) {
    const taskEl = getTaskElement(e.target);
    switch (true) {
        case (e.target.classList.contains(DELETE_BTN_CLASS)):
            return deleteTodoTask(+taskEl.dataset.id, taskEl);
        case (e.target.classList.toggle(DONE_CLASS)):
            return toggleTask(+taskEl.dataset.id);
    };
};

function createTaskElement() {
    let title = todoItemInput.value
    if (title) {
        addTodoTask(title);
        resetForm();
    } else {
        alert('Invalid value');
    };
};

function addTodoTask(task) {
    const newTaskHtml = generateTodoTaskHtml(task);
    addTodoTaskHtml(newTaskHtml);
};

function generateTodoTaskHtml(task) {
    return todoItemTemplate.replace('{{task}}', task);
};

function addTodoTaskHtml(task) {
    return listEl.insertAdjacentHTML('beforeend', task);
};

function resetForm() {
    todoForm.reset();
};

function getTaskElement(el) {
    return el.closest(TODO_TASK_SELECTOR);
};

function toggleTask(elId) {
    let todo = todoList.find((todo) => todo.id === elId);
    todo.completed = !todo.completed;
    renderTodos(todoList);
};


function deleteTodoTask(elId, taskEl) {
    let todo = todoList.find((todo) => todo.id === elId);
    let todoId = todoList.indexOf(todo)
    todoList.splice(todoId, 1);
    taskEl.remove();
};


