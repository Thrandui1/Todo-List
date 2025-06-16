import "/src/scss/style.css";

const cons = console.log;
const inputText = document.querySelector('#input-text');
const form = document.querySelector('#form');
const containerList = document.querySelector('.container__list');
const containerListString = document.querySelector('.container-list__string');
const containerHeader = document.querySelector('.container__header');
const headerName = document.querySelector('#header-name');


let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach(function (task) {
        randerTask(task);
    });
}

checkStatusName();

form.addEventListener('submit', addTask);

containerList.addEventListener('click', deleteList);

containerList.addEventListener('click', doneList);


function addTask(e) {
    e.preventDefault();

    const samText = inputText.value;

    const newTask = {
        id: Date.now(),
        text: samText,
        done: false
    };

    tasks.push(newTask);

    randerTask(newTask);

    inputText.value = '';
    inputText.focus();

    checkStatusName();
    saveToLocalStorage();

}

function deleteList(e) {
    if (e.target.dataset.action === 'delete') {
        const deleteList = e.target.parentElement.parentElement.parentElement;
        const id = Number(deleteList.id);

        const index = tasks.findIndex(function (tusk) {
            if (tusk.id === id) {
                return true;
            }
        })

        tasks.splice(index, 1);
        deleteList.remove();
    }

    checkStatusName();
    saveToLocalStorage();
}

function doneList(e) {
    if (e.target.dataset.action === 'done') {
        const doneList = e.target.parentElement.parentElement.parentElement;

        const id = Number(doneList.id);

        const task = tasks.find(function (task) {
            if (task.id === id) {
                return true;
            }
        });

        task.done = !task.done;

        const span = doneList.querySelector('span');
        span.classList.toggle('span-done');
        saveToLocalStorage();
    }
}

function checkStatusName() {
    if (containerList.children.length > 0) {
        headerName.innerText = 'Есть дела на сегодня';
    } else {
        headerName.innerText = 'Список дел пуст';
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function randerTask(task) {
    const statusDone = task.done ? 'span-done' : '';

    const listHTML = `
     <li id="${task.id}">
<div class="container-list__string">

                <div class="string-left">

                    <div class="string-span">
                        <span class="${statusDone}">${task.text}</span>
                    </div>

                </div>

                <div class="string-button">

                    <button type="button" data-action = "done">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 24 24">
                            <path fill="#14a800" d=" M9 16.2L4.8 12l-1.4 1.4L9 19L21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                    </button>

                    <button type="button" data-action = "delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 20 20">
                            <path fill="#f00000"
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>

                </div>
            </div>
</li>`;

    containerList.insertAdjacentHTML('beforeend', listHTML);
}


