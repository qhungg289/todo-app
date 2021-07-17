import "./style.css"
import { todoGenerator } from "./todoGenerator"
import * as DOM from "./DOM";

let defaultTag = [];
let tagContainer = [defaultTag];
defaultTag.name = "Default";

// Init render
DOM.renderTags(tagContainer);

// Create new tag
function createNewTag(field) {
    let tag = [];
    tag.name = field;
    tagContainer.push(tag);
    DOM.closeTagModalBtn.click();
    DOM.renderTags(tagContainer);
    console.log(tagContainer);
}

function checkForNameDuplicate(field) {
    for (let i = 0; i < tagContainer.length; i++) {
        if (field == tagContainer[i].name) {
            return true;
        }
    }
}

DOM.createTagBtn.onclick = () => {
    if (checkForNameDuplicate(DOM.tagNameField.value) == true) {
        alert("Name already exist!");
    } else if (DOM.tagNameField.value == "") {
        alert("Don't leave it empty!");
    } else {
        createNewTag(DOM.tagNameField.value);
        DOM.tagNameField.value = null;
    }
}

DOM.tagNameField.addEventListener("keyup", event => {
    if (event.key !== "Enter") return;
    DOM.createTagBtn.click();
    event.preventDefault();
    DOM.tagNameField.value = null;
})

export { tagContainer };
