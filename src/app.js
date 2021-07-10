import todoGenerator from "./todoGenerator"

let todosCompleted = [];
let todosCurrent = [];
let todoMaster = [todosCompleted, todosCurrent];

function createNewTodo(list, title, description, dueDate, priority) {
    let todo = todoGenerator(title, description, dueDate, priority);
    list.push(todo);
}

function setToDoAsCompleleted(todoIndex) {
    for (let i = 0; i < todoMaster[1].length; i++) {
        if (i == todoIndex) {
            let tempList = todoMaster[1].splice(todoIndex, 1);
            todoMaster[0].push(tempList[0]);
            console.log(todoMaster[0]);
            console.log(todoMaster[1]);
        }
    }
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function createNewLabel(labelName) {
    let formattedLabel = camelize(labelName);
    window[formattedLabel] = [];
    todoMaster.push(window[formattedLabel]);
    console.log(todoMaster);
}

export {
    todosCurrent,
    todosCompleted,
    todoMaster,
    createNewTodo,
    setToDoAsCompleleted,
    createNewLabel
}