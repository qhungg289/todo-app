import "./style.css"
import { todosCurrent, todosCompleted, todoMaster, createNewTodo, createNewLabel } from "./app";
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
    setIndexCheckBoxesOnMainList
} from "./DOM";

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
}