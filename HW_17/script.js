const USERS_URL = 'https://api.github.com/users/';

const loginEl = document.querySelector('#user-login');
const btnEl = document.querySelector('#btn');
const dataEl = document.querySelector('#user-data-wrap');

btnEl.addEventListener('click', onBtnClick);

function onBtnClick() {
        const userLogin = getUserLogin();
        fetch(USERS_URL + userLogin)
            .then((res) => {
                if (!res.ok) {
                    throw Error(`User not found: ` + res.status);
                }
                return res.json();
            })
            .then((data) => showUserData(data))
            .catch((err) => alert(err));
};

function getUserLogin() {
    return loginEl.value;
};

function showUserData(data) {
    dataEl.innerHTML = `<div>
                            <img src="${data.avatar_url}">
                            <a href="${data.html_url}">${data.login}</a>
                        </div>
                        <div> ${data.public_repos} public repositories </div>
                        <div> ${data.followers} followers </div>
                        <div> ${data.following} following </div>`;
};
