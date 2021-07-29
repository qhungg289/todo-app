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
	modifyTodoDetail(title, description, dueDate, priority, _tag) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		// this.tag = tag;
		console.log(this);
	}
	// Rework this!!!
	removeTodo() {
		// for (let i = 0; i < tagContainer.length; i++) {
		// 	if (this.tag == tagContainer[i].name) {
		// 		tagContainer[i].splice(tagContainer[i].indexOf(this), 1);
		// 		console.log(tagContainer);
		// 	}
		// }
		tagContainer.forEach((value, key) => {
			if (this.tag == key) {
				tagContainer.get(key).splice(tagContainer.get(key).indexOf(this), 1);
				console.log(tagContainer);
			}
		});
	}
}

function createNewTag(field) {
	tagContainer.set(`${field}`, new Array());
	console.log(tagContainer);
}

function checkForNameDuplicate(_field) {
	// for (let i = 0; i < tagContainer.length; i++) {
	// 	if (field == tagContainer[i].name) {
	// 		return true;
	// 	}
	// }
}

function removeTag(tagName) {
	tagContainer.forEach((_value, key) => {
		if (tagName == key) {
			tagContainer.delete(key);
			console.log(tagContainer);
		}
	});
}

function createNewTodo(title, desc, dueDate, priority, tag) {
	let todo = new todoGenerator(title, desc, dueDate, priority, tag);
	tagContainer.forEach((_value, key) => {
		if (tag == key) {
			tagContainer.get(key).push(todo);
			console.log(tagContainer);
		}
	});
}

export {
	tagContainer,
	createNewTag,
	createNewTodo,
	checkForNameDuplicate,
	removeTag,
	saveData,
};
