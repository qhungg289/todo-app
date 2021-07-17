// Control elements
const showControlBtn = document.getElementById("show-control");
const newTodoBtnLabel = document.getElementById("new-todo-btn-label");
const newTagBtnLabel = document.getElementById("new-tag-btn-label");
const newTodo = document.getElementById("new-todo");
const newTag = document.getElementById("new-tag");
const overlay = document.getElementById("overlay");

// Body
const todoBodyContainer = document.getElementById("todo-main-container");

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
    console.log("todo clicked");
    hideControl();
}

newTag.onclick = () => {
    const modal = document.getElementById("new-tag-modal");
    openModal(modal);
    console.log("tag clicked");
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
        tagArea.classList.add("tag-area")
        tagArea.innerHTML = tag.name;
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

export { renderTags, createTagBtn, tagNameField, closeTagModalBtn };