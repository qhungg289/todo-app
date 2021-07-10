import todoGenerator from "./todoGenerator"

let todosCurrent = [];
let todosCompleted = [];
let todoUserDefined = [todosCurrent];

todosCurrent.name = "Default";

// Check for which label is chosen and put the new item into the correct array!!!
function createNewTodo(list, title, description, dueDate, priority) {
    let todo = todoGenerator(title, description, dueDate, priority);
    list.push(todo);
}

function setToDoAsCompleleted(todoIndex, currentList, completedList) {
    for (let i = 0; i < currentList.length; i++) {
        if (i == todoIndex) {
            let tempList = currentList.splice(todoIndex, 1);
            completedList.push(tempList[0]);
            console.log(completedList);
            console.log(currentList);
        }
    }
}

function createNewLabel(labelName) {
    window[labelName] = [];
    window[labelName].name = labelName;
    console.log(todoUserDefined);
    todoUserDefined.push(window[labelName]);
}

export {
    todosCurrent,
    todosCompleted,
    todoUserDefined,
    createNewTodo,
    setToDoAsCompleleted,
    createNewLabel
}