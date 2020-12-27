'use strict'

let userToDoListEl = document.querySelector('#userToDoList');
let inputFieldEl = document.querySelector('#inputField');
let addToDoButtonEl = document.querySelector('#addToDo');

addToDoButtonEl.addEventListener('click', onBtnClick);

function onBtnClick() {
    let liEl = document.createElement('li');
    liEl.innerText = inputFieldEl.value;
    userToDoListEl.append(liEl);
    inputFieldEl.value = null;
};