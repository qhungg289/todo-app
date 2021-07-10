import "./style.css"
import { todosCurrent, todosCompleted, createNewTodo, createNewLabel, todoUserDefined } from "./app";
import {
    formButton,
    formTitle,
    formDesc,
    formDate,
    formPriority,
    newLabelText,
    newLabelButton,
    appendTodosToList,
    resetFormValue,
    setIndexCheckBoxesOnMainList,
    addValuesToLabelOption
} from "./DOM";

addValuesToLabelOption(todoUserDefined);

formButton.onclick = () => {
    createNewTodo(
        todosCurrent,
        formTitle.value,
        formDesc.value,
        formDate.value,
        formPriority.value
    )
    appendTodosToList(formTitle.value, formDesc.value);
    setIndexCheckBoxesOnMainList();
    resetFormValue();
};

newLabelButton.onclick = () => {
    createNewLabel(newLabelText.value);
    addValuesToLabelOption(todoUserDefined);
    newLabelText.value = null;
}