import {
    setToDoAsCompleleted,
    todosCurrent,
    todosCompleted,
    todoUserDefined
} from "./app"

let formTitle = document.getElementById("title");
let formDesc = document.getElementById("description");
let formDate = document.getElementById("due-date");
let formPriority = document.getElementById("priority");
let formLabel = document.getElementById("label");
let formButton = document.getElementById("create");
let newLabelText = document.getElementById("label-field");
let newLabelButton = document.getElementById("new-label");
let list = document.getElementById("todo-list");
let completedList = document.getElementById("completed-list");

function appendTodosToList(title, description) {
    let todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.value = title;
    todoCheckbox.classList.add("checkboxes-main");

    todoCheckbox.onclick = () => {
        if (todoCheckbox.checked) {
            console.log(`${todoCheckbox.dataset.index} checked`);
            setToDoAsCompleleted(todoCheckbox.dataset.index, todosCurrent, todosCompleted);
            todoCheckbox.classList.remove("checkboxes-main");
            todoContainer.remove();
            setIndexCheckBoxesOnMainList();
            showCompletedTodos(todosCompleted);
        }
        // else {
        //     console.log(`${todoCheckbox.dataset.index} unchecked`);
        //     todoLabel.classList.remove("completed");
        // }
    };

    let todoLabel = document.createElement("label");
    todoLabel.appendChild(document.createTextNode(title));

    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-items");

    todoContainer.appendChild(todoCheckbox);
    todoContainer.appendChild(todoLabel);
    list.appendChild(todoContainer);
}

function showCompletedTodos(list) {
    completedList.innerHTML = "";

    list.forEach(todo => {
        let todoCheckbox = document.createElement("input");
        todoCheckbox.type = "checkbox";
        todoCheckbox.value = todo.title;
        todoCheckbox.checked = true;
        // todoCheckbox.disabled = true;

        let todoLabel = document.createElement("label");
        todoLabel.appendChild(document.createTextNode(todo.title));
        todoLabel.classList.add("completed");

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("completed-todo-items");

        todoContainer.appendChild(todoCheckbox);
        todoContainer.appendChild(todoLabel);
        completedList.appendChild(todoContainer);
    })
}

function addValuesToLabelOption(userDefine) {
    formLabel.innerHTML = "";

    userDefine.forEach(item => {
        let option = document.createElement("option");
        option.value = item.name;
        option.innerHTML = item.name;
        formLabel.appendChild(option);
    })
}

function resetFormValue() {
    formTitle.value = null;
    formDesc.value = null;
    formDate.value = null;
    formPriority.value = "low";
}

function setIndexCheckBoxesOnMainList() {
    let checkboxes = document.getElementsByClassName("checkboxes-main");
    for (let i = 0; i < checkboxes.length; i++) {
        [...checkboxes][i].setAttribute("data-index", `${i}`);
    }
}

export {
    formTitle,
    formDesc,
    formDate,
    formPriority,
    formButton,
    newLabelText,
    newLabelButton,
    appendTodosToList,
    showCompletedTodos,
    addValuesToLabelOption,
    resetFormValue,
    setIndexCheckBoxesOnMainList
};