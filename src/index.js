import "./style.css";
import { renderTags, renderTodos } from "./DOM";

let tagContainer = new Map();

window.onload = () => {
	tagContainer = new Map(JSON.parse(localStorage.getItem("localContainer")));
	renderTags(tagContainer);
	renderTodos(tagContainer);
};

function saveData() {
	localStorage.setItem("localContainer", JSON.stringify([...tagContainer]));
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
}

function createNewTag(field) {
	tagContainer.set(`${field}`, new Array());
}

function removeTag(tagName) {
	tagContainer.forEach((_value, key) => {
		if (tagName == key) {
			tagContainer.delete(key);
		}
	});
}

function createNewTodo(title, desc, dueDate, priority, tag) {
	let todo = new todoGenerator(title, desc, dueDate, priority, tag);
	tagContainer.forEach((_value, key) => {
		if (tag == key) {
			tagContainer.get(key).push(todo);
		}
	});
}

function toggleTodoComplete(todo) {
	if (todo.completed == false) {
		todo.completed = true;
	} else {
		todo.completed = false;
	}
}

function modifyTodoDetail(todo, title, description, dueDate, priority) {
	todo.title = title;
	todo.description = description;
	todo.dueDate = dueDate;
	todo.priority = priority;
}

function removeTodo(todo) {
	tagContainer.forEach((_value, key) => {
		if (todo.tag == key) {
			tagContainer.get(key).splice(tagContainer.get(key).indexOf(todo), 1);
		}
	});
}

export {
	tagContainer,
	saveData,
	createNewTag,
	createNewTodo,
	removeTag,
	toggleTodoComplete,
	modifyTodoDetail,
	removeTodo,
};
