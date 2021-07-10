import { setToDoAsCompleleted } from "./app"

let formTitle = document.getElementById("title");
let formDesc = document.getElementById("description");
let formDate = document.getElementById("due-date");
let formPriority = document.getElementById("priority");
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
            setToDoAsCompleleted(todoCheckbox.dataset.index);
            todoCheckbox.classList.remove("checkboxes-main");
            todoLabel.classList.add("completed");
            todoContainer.remove();
            setIndexCheckBoxesOnMainList();
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
    resetFormValue,
    setIndexCheckBoxesOnMainList
};