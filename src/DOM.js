import { tagContainer, toggleTodoComplete } from "./index";

// Control elements
const showControlBtn = document.getElementById("show-control");
const newTodoBtnLabel = document.getElementById("new-todo-btn-label");
const newTagBtnLabel = document.getElementById("new-tag-btn-label");
const newTodo = document.getElementById("new-todo");
const newTag = document.getElementById("new-tag");
const overlay = document.getElementById("overlay");

// Body
const todoBodyContainer = document.getElementById("display-container");
const todoArea = document.getElementsByClassName("todo-area");

// Form elements
const todoTitleField = document.getElementById("todo-title");
const todoDescField = document.getElementById("todo-desc");
const todoDueDateField = document.getElementById("todo-due-date");
const todoPriorityField = document.getElementById("todo-priority");
const todoTagField = document.getElementById("todo-tag");
const closeTodoModalBtn = document.getElementById("close-create-todo-modal-btn");
const createTodoBtn = document.getElementById("create-todo-btn");
const tagNameField = document.getElementById("new-tag-field");
const closeTagModalBtn = document.getElementById("close-create-tag-modal-btn");
const createTagBtn = document.getElementById("create-tag-btn");

todoDueDateField.valueAsDate = new Date();

showControlBtn.onclick = () => {
    if (newTodo.classList.contains("new-note-move-up") && newTag.classList.contains("new-tag-move-up")) {
        hideControl();
    } else {
        showControl();
    }
}

overlay.onclick = () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    })
}

newTodo.onclick = () => {
    const modal = document.getElementById("new-note-modal");
    openModal(modal);
    todoTitleField.focus();
    hideControl();
}

newTag.onclick = () => {
    const modal = document.getElementById("new-tag-modal");
    openModal(modal);
    tagNameField.focus();
    hideControl();
}

closeTodoModalBtn.onclick = () => {
    const modal = document.getElementById("new-note-modal");
    closeModal(modal);
}

closeTagModalBtn.onclick = () => {
    const modal = document.getElementById("new-tag-modal");
    closeModal(modal);
}

function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function hideControl() {
    newTodo.classList.remove("new-note-move-up");
    newTag.classList.remove("new-tag-move-up");
    newTodoBtnLabel.style.opacity = 0;
    newTagBtnLabel.style.opacity = 0;
}

function showControl() {
    newTodo.classList.add("new-note-move-up");
    newTag.classList.add("new-tag-move-up");
    newTodoBtnLabel.style.opacity = 1;
    newTagBtnLabel.style.opacity = 1;
}

function renderTagsInBody(tagsList) {
    todoBodyContainer.innerHTML = "";
    tagsList.forEach(tag => {
        const tagArea = document.createElement("div");
        tagArea.classList.add("tag-area");
        tagArea.dataset.name = tag.name;
        // tagArea.innerHTML = tag.name;

        const name = document.createElement("p");
        name.innerHTML = tag.name

        const todoArea = document.createElement("div");
        todoArea.classList.add("todo-area");
        todoArea.dataset.name = tag.name;

        tagArea.appendChild(name);
        tagArea.appendChild(todoArea);
        todoBodyContainer.appendChild(tagArea);
    });
}

function renderTagsInTodoModal(tagsList) {
    todoTagField.innerHTML = "";
    tagsList.forEach(tag => {
        const tagOption = document.createElement("option");
        tagOption.value = tag.name;
        tagOption.innerHTML = tag.name;
        todoTagField.appendChild(tagOption);
    })
}

function renderTags(tagsList) {
    renderTagsInBody(tagsList);
    renderTagsInTodoModal(tagsList);
}

function renderTodos(tagsList) {
    [...todoArea].forEach(area => {
        area.innerHTML = "";
    });

    tagsList.forEach(tag => {
        tag.forEach(todo => {
            const todoElement = document.createElement("div");
            todoElement.classList.add("todo-element");
            todoElement.dataset.name = todo.tag;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.name = todo.tag;
            checkbox.onclick = toggleTodoComplete.bind(todo);

            const span = document.createElement("span");
            span.innerHTML = todo.title;

            // const date = document.createElement("span");
            // date.innerHTML = todo.dueDate;

            if (todo.completed == true) {
                checkbox.checked = true;
            }

            if (todo.priority == "normal") {
                todoElement.style.borderLeft = "4px solid #A3BE8C";
            } else if (todo.priority == "medium") {
                todoElement.style.borderLeft = "4px solid #EBCB8B";
            } else if (todo.priority == "high") {
                todoElement.style.borderLeft = "4px solid #BF616A";
            }

            const div = document.createElement("div");
            div.appendChild(checkbox);
            div.appendChild(span);

            todoElement.appendChild(div);

            [...todoArea].forEach(area => {
                if (todo.tag == area.dataset.name) {
                    area.appendChild(todoElement);
                }
            });
        });
    });
}

function clearField() {
    tagNameField.value = null;
    todoTitleField.value = null;
    todoDescField.value = null;
    todoDueDateField.valueAsDate = new Date();
    todoPriorityField.value = "normal";
    // todoTagField.value = "Default";
}

export {
    renderTags,
    renderTodos,
    clearField,
    createTagBtn,
    closeTagModalBtn,
    tagNameField,
    createTodoBtn,
    closeTodoModalBtn,
    todoTitleField,
    todoDescField,
    todoDueDateField,
    todoPriorityField,
    todoTagField
};