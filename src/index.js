import "./style.css";
import { todoGenerator } from "./todoGenerator";
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
	console.log(tagContainer);
}

function checkForNameDuplicate(field) {
	for (let i = 0; i < tagContainer.length; i++) {
		if (field == tagContainer[i].name) {
			return true;
		}
	}
}

// Create new todo
function createNewTodo(title, desc, dueDate, priority, tag) {
	let todo = todoGenerator(title, desc, dueDate, priority, tag);
	for (let i = 0; i < tagContainer.length; i++) {
		if (tag == tagContainer[i].name) {
			tagContainer[i].push(todo);
			console.log(tagContainer);
		}
	}
}

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
	checkForNameDuplicate,
};
