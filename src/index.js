import "./style.css"

import {
    todosCurrent,
    todosCompleted,
    createNewTodo,
    createNewLabel,
    todoUserDefined
} from "./app";

import {
    formButton,
    formTitle,
    formDesc,
    formDate,
    formPriority,
    formLabel,
    newLabelText,
    newLabelButton,
    appendTodosToList,
    resetFormValue,
    setIndexCheckBoxesOnMainList,
    addValuesToLabelOption,
    showLinkInNav
} from "./DOM";

addValuesToLabelOption(todoUserDefined);
showLinkInNav(todoUserDefined);

formButton.onclick = () => {
    createNewTodo(
        formTitle.value,
        formDesc.value,
        formDate.value,
        formPriority.value,
        formLabel.value
    )
    appendTodosToList(formTitle.value, formDesc.value);
    setIndexCheckBoxesOnMainList();
    resetFormValue();
};

newLabelButton.onclick = () => {
    createNewLabel(newLabelText.value);
    addValuesToLabelOption(todoUserDefined);
    showLinkInNav(todoUserDefined);
    newLabelText.value = null;
}

