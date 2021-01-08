'use strict'

let userToDoListEl = document.querySelector('#userToDoList');
let inputFieldEl = document.querySelector('#inputField');
let addToDoButtonEl = document.querySelector('#addToDo');

addNewTask('New task')

addToDoButtonEl.addEventListener('click', addOnBtnClick);

function addOnBtnClick() {
    if (inputFieldEl.value) {
        addNewTask(inputFieldEl.value)
        clearInput()
    }
};

function addNewTask(title) {
    let taskEl = document.createElement('li');
    taskEl.textContent = title;
    userToDoListEl.append(taskEl);
}

function clearInput() {
    inputFieldEl.value = '';
}

// my HW

// let userToDoListEl = document.querySelector('#userToDoList');
// let inputFieldEl = document.querySelector('#inputField');
// let addToDoButtonEl = document.querySelector('#addToDo');

// addToDoButtonEl.addEventListener('click', onBtnClick);

// function onBtnClick() {
//     let taskEl = document.createElement('li');
//     taskEl.innerText = inputFieldEl.value;
//     userToDoListEl.append(taskEl);
//     inputFieldEl.value = null;
// };