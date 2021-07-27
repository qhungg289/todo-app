import "./style.css";
import { renderTags, renderTodos } from "./DOM";

let defaultTag = [];
defaultTag.name = "Main";
defaultTag.show = true;
let tagContainer = [defaultTag];

// Init render
renderTags(tagContainer);
renderTodos(tagContainer);

// Todo class
class todoGenerator {
	constructor(title, description, dueDate, priority, tag) {
		this.completed = false;
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.tag = tag;
	}
	toggleTodoComplete() {
		if (this.completed == false) {
			this.completed = true;
			console.log(this);
		} else {
			this.completed = false;
			console.log(this);
		}
	}
	modifyTodoDetail(title, description, dueDate, priority, tag) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		// this.tag = tag;
		console.log(this);
	}
	removeTodo() {
		for (let i = 0; i < tagContainer.length; i++) {
			if (this.tag == tagContainer[i].name) {
				tagContainer[i].splice(tagContainer[i].indexOf(this), 1);
				console.log(tagContainer);
			}
		}
	}
}

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
	let todo = new todoGenerator(title, desc, dueDate, priority, tag);
	for (let i = 0; i < tagContainer.length; i++) {
		if (tag == tagContainer[i].name) {
			tagContainer[i].push(todo);
			console.log(tagContainer);
		}
	}
}

export { tagContainer, createNewTag, createNewTodo, checkForNameDuplicate };
