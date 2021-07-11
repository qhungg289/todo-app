import todoGenerator from "./todoGenerator"

let todosCurrent = [];
let todosCompleted = [];
let todoUserDefined = [todosCurrent];

todosCurrent.name = "Default";

function createNewTodo(title, description, dueDate, priority, label) {
    todoUserDefined.forEach(list => {
        if (label === list.name) {
            let todo = todoGenerator(title, description, dueDate, priority, label);
            list.push(todo);
        }
    });
}

function setToDoAsCompleleted(todoIndex, currentList, completedList) {
    for (let i = 0; i < currentList.length; i++) {
        if (i == todoIndex) {
            let tempList = currentList.splice(todoIndex, 1);
            completedList.push(tempList[0]);
        }
    }
}

function createNewLabel(labelName) {
    window[labelName] = [];
    window[labelName].name = labelName;
    todoUserDefined.push(window[labelName]);
    console.log(todoUserDefined);
}

export {
    todosCurrent,
    todosCompleted,
    todoUserDefined,
    createNewTodo,
    setToDoAsCompleleted,
    createNewLabel
}