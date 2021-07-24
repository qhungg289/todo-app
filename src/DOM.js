import {
	tagContainer,
	toggleTodoComplete,
	createNewTag,
	createNewTodo,
	checkForNameDuplicate,
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
	if (checkForNameDuplicate(tagNameField.value) == true) {
		alert("Name already exist! Please choose another name!");
	} else if (tagNameField.value == "") {
		alert("Don't leave it empty!");
	} else {
		createNewTag(tagNameField.value);
		closeTagModalBtn.click();
		renderTags(tagContainer);
		renderTodos(tagContainer);
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
	if (todoTitleField.value == "") {
		alert("Don't leave the title empty!");
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

// Tab related functions
function renderTagsInBody(tagsList) {
	todoBodyContainer.innerHTML = "";
	tagsList.forEach((tag) => {
		const tagArea = document.createElement("div");
		tagArea.classList.add("tag-area");
		tagArea.dataset.name = tag.name;

		const name = document.createElement("p");
		name.innerHTML = tag.name;

		const indicator = document.createElement("i");
		indicator.classList.add("fas");
		indicator.classList.add("fa-chevron-up");

		const tagNameContainer = document.createElement("div");
		tagNameContainer.classList.add("title-container");
		tagNameContainer.appendChild(name);
		tagNameContainer.appendChild(indicator);
		tagNameContainer.onclick = () => {
			toggleTagsShow(tag, todoArea, indicator);
		};

		const todoArea = document.createElement("div");
		todoArea.classList.add("todo-area");
		todoArea.classList.add("animate-fading");
		todoArea.dataset.name = tag.name;
		if (tag.show == false) {
			todoArea.style.display = "none";
		}

		tagArea.appendChild(tagNameContainer);
		tagArea.appendChild(todoArea);
		todoBodyContainer.appendChild(tagArea);
	});
}

function toggleTagsShow(tag, todoArea, indicator) {
	if (tag.show == false) {
		tag.show = true;
		todoArea.style.display = "flex";
		indicator.style.transform = "rotate(0deg)";
	} else if (tag.show == true) {
		tag.show = false;
		todoArea.style.display = "none";
		indicator.style.transform = "rotate(180deg)";
	}
}

function renderTagsInTodoModal(tagsList) {
	todoTagField.innerHTML = "";
	tagsList.forEach((tag) => {
		const tagOption = document.createElement("option");
		tagOption.value = tag.name;
		tagOption.innerHTML = tag.name;
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

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.dataset.name = todo.tag;
			checkbox.onclick = toggleTodoComplete.bind(todo);

			if (todo.completed == true) {
				checkbox.checked = true;
			}

			const span = document.createElement("span");
			span.innerHTML = todo.title;
			span.onclick = showTodoDetail.bind(todo);

			if (todo.priority == "Normal") {
				todoElement.style.borderLeft = "4px solid #A3BE8C";
			} else if (todo.priority == "Medium") {
				todoElement.style.borderLeft = "4px solid #EBCB8B";
			} else if (todo.priority == "High") {
				todoElement.style.borderLeft = "4px solid #BF616A";
			}

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

	title.innerHTML = this.title;
	if (this.description == "") {
		desc.innerHTML = "None";
	} else {
		desc.innerHTML = this.description;
	}
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
	inputContainer.appendChild(closeBtn);

	const modal = document.getElementById("todo-detail-modal");
	const modalBody = document.querySelector("#todo-detail-modal .modal-body");

	modalBody.innerHTML = "";
	modalBody.appendChild(titleContainer);
	modalBody.appendChild(descContainer);
	modalBody.appendChild(dueDateContainer);
	modalBody.appendChild(priorityContainer);
	modalBody.appendChild(tagContainer);
	modalBody.appendChild(inputContainer);

	openModal(modal);
	hideControl();
}

// Clear all field's value
function clearField() {
	tagNameField.value = null;
	todoTitleField.value = null;
	todoDescField.value = null;
	todoDueDateField.valueAsDate = new Date();
	todoPriorityField.value = "Normal";
	// todoTagField.value = "Default";
}

export { renderTags, renderTodos };
