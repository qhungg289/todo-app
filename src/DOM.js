import {
	tagContainer,
	createNewTag,
	createNewTodo,
	removeTag,
	saveData,
	toggleTodoComplete,
	modifyTodoDetail,
	removeTodo,
} from "./index";

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
const closeTodoModalBtn = document.getElementById(
	"close-create-todo-modal-btn"
);
const createTodoBtn = document.getElementById("create-todo-btn");
const tagNameField = document.getElementById("new-tag-field");
const closeTagModalBtn = document.getElementById("close-create-tag-modal-btn");
const createTagBtn = document.getElementById("create-tag-btn");

todoDueDateField.valueAsDate = new Date();

// Modal and control
showControlBtn.onclick = () => {
	if (
		newTodo.classList.contains("new-note-move-up") &&
		newTag.classList.contains("new-tag-move-up")
	) {
		hideControl();
	} else {
		showControl();
	}
};

overlay.onclick = () => {
	const modals = document.querySelectorAll(".modal.active");
	modals.forEach((modal) => {
		closeModal(modal);
	});
};

newTodo.onclick = () => {
	const modal = document.getElementById("new-note-modal");
	openModal(modal);
	todoTitleField.focus();
	hideControl();
};

newTag.onclick = () => {
	const modal = document.getElementById("new-tag-modal");
	openModal(modal);
	tagNameField.focus();
	hideControl();
};

closeTodoModalBtn.onclick = () => {
	const modal = document.getElementById("new-note-modal");
	closeModal(modal);
	clearField();
};

closeTagModalBtn.onclick = () => {
	const modal = document.getElementById("new-tag-modal");
	closeModal(modal);
	clearField();
};

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

// Create todo and create tag event listener
// // Tag
createTagBtn.onclick = () => {
	if (!tagNameField.value) {
		alert("Don't leave it empty!");
	} else {
		createNewTag(tagNameField.value);
		closeTagModalBtn.click();
		renderTags(tagContainer);
		renderTodos(tagContainer);
		saveData();
		clearField();
	}
};

tagNameField.addEventListener("keyup", (event) => {
	if (event.key !== "Enter") return;
	createTagBtn.click();
	event.preventDefault();
});

// // Todo
createTodoBtn.onclick = () => {
	if (!todoTitleField.value) {
		alert("Don't leave the title empty!");
	} else if (tagContainer.size == 0) {
		alert("Please create a new tag to store your todo!");
	} else {
		createNewTodo(
			todoTitleField.value,
			todoDescField.value,
			todoDueDateField.value,
			todoPriorityField.value,
			todoTagField.value
		);
		closeTodoModalBtn.click();
		renderTodos(tagContainer);
		saveData();
		clearField();
	}
};

todoTitleField.addEventListener("keyup", (event) => {
	if (event.key !== "Enter") return;
	createTodoBtn.click();
	event.preventDefault();
});

todoDescField.addEventListener("keyup", (event) => {
	if (event.key !== "Enter") return;
	createTodoBtn.click();
	event.preventDefault();
});

// Tag related functions
function renderTagsInBody(tagsList) {
	todoBodyContainer.innerHTML = "";
	tagsList.forEach((_value, key) => {
		const tagArea = document.createElement("div");
		tagArea.classList.add("tag-area");
		tagArea.dataset.name = key;

		const name = document.createElement("p");
		name.innerHTML = key;

		const removeTagBtn = document.createElement("i");
		removeTagBtn.classList.add("fas");
		removeTagBtn.classList.add("fa-trash-alt");
		removeTagBtn.classList.add("remove-tag-btn");
		removeTagBtn.onclick = () => {
			removeTag(key);
			renderTags(tagContainer);
			renderTodos(tagContainer);
			saveData();
		};

		const div = document.createElement("div");
		div.appendChild(removeTagBtn);

		const tagNameContainer = document.createElement("div");
		tagNameContainer.classList.add("title-container");
		tagNameContainer.appendChild(name);
		tagNameContainer.appendChild(div);

		const todoArea = document.createElement("div");
		todoArea.classList.add("todo-area");
		todoArea.dataset.name = key;

		tagArea.appendChild(tagNameContainer);
		tagArea.appendChild(todoArea);
		todoBodyContainer.appendChild(tagArea);
	});
}

function renderTagsInTodoModal(tagsList) {
	todoTagField.innerHTML = "";
	tagsList.forEach((_value, key) => {
		const tagOption = document.createElement("option");
		tagOption.value = key;
		tagOption.innerHTML = key;
		todoTagField.appendChild(tagOption);
	});
}

function renderTags(tagsList) {
	renderTagsInBody(tagsList);
	renderTagsInTodoModal(tagsList);
}

// Todo related functions
function renderTodos(tagsList) {
	[...todoArea].forEach((area) => {
		area.innerHTML = "";
	});

	tagsList.forEach((tag) => {
		tag.forEach((todo) => {
			const todoElement = document.createElement("div");
			todoElement.classList.add("todo-element");
			todoElement.dataset.name = todo.tag;
			showTodoPriority(todo.priority, todoElement);

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.dataset.name = todo.tag;
			checkbox.onclick = () => {
				toggleTodoComplete(todo);
				saveData();
			};

			if (todo.completed == true) {
				checkbox.checked = true;
			}

			const span = document.createElement("span");
			span.innerHTML = todo.title;
			span.onclick = showTodoDetail.bind(todo);

			const div = document.createElement("div");
			div.appendChild(checkbox);
			div.appendChild(span);

			todoElement.appendChild(div);

			[...todoArea].forEach((area) => {
				if (todo.tag == area.dataset.name) {
					area.appendChild(todoElement);
				}
			});
		});
	});
}

function showTodoPriority(priority, element) {
	if (priority == "Normal") {
		element.style.borderLeft = "4px solid #A3BE8C";
	} else if (priority == "Medium") {
		element.style.borderLeft = "4px solid #EBCB8B";
	} else if (priority == "High") {
		element.style.borderLeft = "4px solid #BF616A";
	}
}

function showTodoDetail() {
	const titleContainer = document.createElement("div");
	const descContainer = document.createElement("div");
	const dueDateContainer = document.createElement("div");
	const priorityContainer = document.createElement("div");
	const tagContainer = document.createElement("div");

	const titleLabel = document.createElement("label");
	const descLabel = document.createElement("label");
	const dueDateLabel = document.createElement("label");
	const priorityLabel = document.createElement("label");
	const tagLabel = document.createElement("label");

	const title = document.createElement("p");
	const desc = document.createElement("p");
	const dueDate = document.createElement("p");
	const priority = document.createElement("p");
	const tag = document.createElement("p");

	titleLabel.innerHTML = "Title";
	descLabel.innerHTML = "Description";
	dueDateLabel.innerHTML = "Due date";
	priorityLabel.innerHTML = "Priority";
	tagLabel.innerHTML = "Tag";

	title.id = "title-detail";
	desc.id = "desc-detail";
	dueDate.id = "due-date-detail";
	priority.id = "priority-detail";
	tag.id = "tag-detail";

	title.innerHTML = this.title;
	desc.innerHTML = this.description ? this.description : "None";
	dueDate.innerHTML = this.dueDate;
	priority.innerHTML = this.priority;
	tag.innerHTML = this.tag;

	titleContainer.appendChild(titleLabel);
	titleContainer.appendChild(title);
	descContainer.appendChild(descLabel);
	descContainer.appendChild(desc);
	dueDateContainer.appendChild(dueDateLabel);
	dueDateContainer.appendChild(dueDate);
	priorityContainer.appendChild(priorityLabel);
	priorityContainer.appendChild(priority);
	tagContainer.appendChild(tagLabel);
	tagContainer.appendChild(tag);

	const doneBtn = document.createElement("input");
	doneBtn.type = "button";
	doneBtn.value = "DONE";
	doneBtn.id = "done-edit-btn";

	const removeBtn = document.createElement("input");
	removeBtn.type = "button";
	removeBtn.value = "REMOVE";
	removeBtn.id = "remove-todo-btn";

	const div = document.createElement("div");
	div.id = "done-remove-container";
	div.appendChild(doneBtn);
	div.appendChild(removeBtn);
	div.style.visibility = "hidden";

	const closeBtn = document.createElement("input");
	closeBtn.type = "button";
	closeBtn.value = "CLOSE";
	closeBtn.id = "close-todo-detail-modal";
	closeBtn.onclick = () => {
		closeModal(modal);
	};

	const inputContainer = document.createElement("div");
	inputContainer.classList.add("input-btn-container");
	inputContainer.id = "todo-detail-modal-input";
	inputContainer.appendChild(div);
	inputContainer.appendChild(closeBtn);

	const editTodoDetailBtn = document.createElement("input");
	editTodoDetailBtn.type = "button";
	editTodoDetailBtn.value = "EDIT";
	editTodoDetailBtn.id = "edit-todo-detail-btn";
	editTodoDetailBtn.onclick = showTodoDetailModify.bind(this);

	const modal = document.getElementById("todo-detail-modal");
	const modalHeader = document.getElementById("edit-todo-detail-btn-container");
	const modalBody = document.querySelector("#todo-detail-modal .modal-body");

	modalBody.innerHTML = "";
	modalHeader.innerHTML = "";
	modalHeader.appendChild(editTodoDetailBtn);
	modalBody.appendChild(titleContainer);
	modalBody.appendChild(descContainer);
	modalBody.appendChild(dueDateContainer);
	modalBody.appendChild(priorityContainer);
	modalBody.appendChild(tagContainer);
	modalBody.appendChild(inputContainer);

	openModal(modal);
	hideControl();
}

function showTodoDetailModify() {
	const titleDetail = document.getElementById("title-detail");
	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.value = this.title;
	titleDetail?.replaceWith(titleInput);

	const descDetail = document.getElementById("desc-detail");
	const descInput = document.createElement("input");
	descInput.type = "text";
	descInput.value = this.description;
	descDetail?.replaceWith(descInput);

	const dueDateDetail = document.getElementById("due-date-detail");
	const dueDateInput = document.createElement("input");
	dueDateInput.type = "date";
	dueDateInput.value = this.dueDate;
	dueDateDetail?.replaceWith(dueDateInput);

	const priorityDetail = document.getElementById("priority-detail");
	const priorityInput = document.createElement("select");
	const normalValue = document.createElement("option");
	normalValue.value = "Normal";
	normalValue.innerHTML = "Normal";
	const mediumValue = document.createElement("option");
	mediumValue.value = "Medium";
	mediumValue.innerHTML = "Medium";
	const highValue = document.createElement("option");
	highValue.value = "High";
	highValue.innerHTML = "High";
	priorityInput.appendChild(normalValue);
	priorityInput.appendChild(mediumValue);
	priorityInput.appendChild(highValue);
	priorityInput.value = this.priority;
	priorityDetail?.replaceWith(priorityInput);

	const doneBtn = document.getElementById("done-edit-btn");
	const removeBtn = document.getElementById("remove-todo-btn");
	const editBtn = document.getElementById("edit-todo-detail-btn");
	const doneAndRemoveContainer = document.getElementById(
		"done-remove-container"
	);

	editBtn.style.visibility = "hidden";
	doneAndRemoveContainer.style.visibility = "visible";

	doneBtn.onclick = () => {
		if (titleInput.value == "") {
			alert("Don't leave the title empty!");
		} else {
			modifyTodoDetail(
				this,
				titleInput.value,
				descInput.value,
				dueDateInput.value,
				priorityInput.value
			);
			renderTodos(tagContainer);
			saveData();

			titleDetail.innerHTML = this.title;
			titleInput?.replaceWith(titleDetail);
			descDetail.innerHTML = this.description ? this.description : "None";
			descInput?.replaceWith(descDetail);
			dueDateDetail.innerHTML = this.dueDate;
			dueDateInput?.replaceWith(dueDateDetail);
			priorityDetail.innerHTML = this.priority;
			priorityInput?.replaceWith(priorityDetail);

			editBtn.style.visibility = "visible";
			doneAndRemoveContainer.style.visibility = "hidden";
		}
	};

	removeBtn.onclick = () => {
		removeTodo(this);
		const closeBtn = document.getElementById("close-todo-detail-modal");
		closeBtn.click();
		renderTodos(tagContainer);
		saveData();
	};
}

// Clear all field's value
function clearField() {
	tagNameField.value = null;
	todoTitleField.value = null;
	todoDescField.value = null;
	todoDueDateField.valueAsDate = new Date();
	todoPriorityField.value = "Normal";
}

export { renderTags, renderTodos };
