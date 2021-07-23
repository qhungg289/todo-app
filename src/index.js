import "./style.css"
import { todoGenerator } from "./todoGenerator"
import * as DOM from "./DOM";

let defaultTag = [];
defaultTag.name = "Main";
defaultTag.show = true;
let tagContainer = [defaultTag];

// Init render
DOM.renderTags(tagContainer);
DOM.renderTodos(tagContainer);

// Create new tag
function createNewTag(field) {
    let tag = [];
    tag.name = field;
    tag.show = true;
    tagContainer.push(tag);
    DOM.closeTagModalBtn.click();
    DOM.renderTags(tagContainer);
    DOM.renderTodos(tagContainer);
    DOM.clearField();
    console.log(tagContainer);
}

function checkForNameDuplicate(field) {
    for (let i = 0; i < tagContainer.length; i++) {
        if (field == tagContainer[i].name) {
            return true;
        }
    }
}

DOM.createTagBtn.onclick = () => {
    if (checkForNameDuplicate(DOM.tagNameField.value) == true) {
        alert("Name already exist!");
    } else if (DOM.tagNameField.value == "") {
        alert("Don't leave it empty!");
    } else {
        createNewTag(DOM.tagNameField.value);
    }
}

DOM.tagNameField.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return;
    DOM.createTagBtn.click();
    event.preventDefault();
})

// Create new todo
function createNewTodo(title, desc, dueDate, priority, tag) {
    let todo = todoGenerator(title, desc, dueDate, priority, tag);
    for (let i = 0; i < tagContainer.length; i++) {
        if (tag == tagContainer[i].name) {
            tagContainer[i].push(todo);
            console.log(tagContainer);
        }
    }
    DOM.closeTodoModalBtn.click();
    DOM.renderTodos(tagContainer);
    DOM.clearField();
}

DOM.createTodoBtn.onclick = () => {
    if (DOM.todoTitleField.value == "") {
        alert("Don't leave the title empty!!!");
    } else {
        createNewTodo(
            DOM.todoTitleField.value,
            DOM.todoDescField.value,
            DOM.todoDueDateField.value,
            DOM.todoPriorityField.value,
            DOM.todoTagField.value
        )
    }
}

DOM.todoTitleField.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return;
    DOM.createTodoBtn.click();
    event.preventDefault();
});

DOM.todoDescField.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return;
    DOM.createTodoBtn.click();
    event.preventDefault();
});

// Set todo as completed
function toggleTodoComplete() {
    if (this.completed == false) {
        this.completed = true;
        console.log(this);
    } else {
        this.completed = false;
        console.log(this);
    }
}

export {
    tagContainer,
    toggleTodoComplete,
    createNewTag,
    createNewTodo,
    checkForNameDuplicate
};
