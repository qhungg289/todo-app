import "./style.css";
import { renderTags, renderTodos } from "./DOM";

let tagContainer = new Map();
tagContainer.set("Main", new Array());

window.onload = () => {
	renderTags(tagContainer);
	renderTodos(tagContainer);
};

function saveData() {
	localStorage.setItem("localContainer", JSON.stringify(tagContainer));
	// console.log(JSON.parse(localStorage.getItem("localContainer")));
}

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
	// Rework this!!!
	removeTodo() {
		for (let i = 0; i < tagContainer.length; i++) {
			if (this.tag == tagContainer[i].name) {
				tagContainer[i].splice(tagContainer[i].indexOf(this), 1);
				console.log(tagContainer);
			}
		}
	}
}

function createNewTag(field) {
	tagContainer.set(`${field}`, new Array());
	tagContainer.forEach((value, key) => {
		console.log(`${key}: ${typeof value}`);
	});
}

function checkForNameDuplicate(field) {
	for (let i = 0; i < tagContainer.length; i++) {
		if (field == tagContainer[i].name) {
			return true;
		}
	}
}

function removeTag(tagName) {
	// Rework
	for (let i = 0; i < tagContainer.length; i++) {
		if (tagName == tagContainer[i].name) {
			tagContainer.splice(i, 1);
			console.log(tagContainer);
		}
	}
}

function createNewTodo(title, desc, dueDate, priority, tag) {
	let todo = new todoGenerator(title, desc, dueDate, priority, tag);
	for (let i = 0; i < tagContainer.length; i++) {
		if (tag == tagContainer[i].name) {
			tagContainer[i].push(todo);
			console.log(tagContainer);
		}
	}
}

export {
	tagContainer,
	createNewTag,
	createNewTodo,
	checkForNameDuplicate,
	removeTag,
	saveData,
};
