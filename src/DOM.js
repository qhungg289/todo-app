let showControlBtn = document.getElementById("show-control");
let newNoteBtnLabel = document.getElementById("new-note-btn-label");
let newTagBtnLabel = document.getElementById("new-tag-btn-label");
let newNote = document.getElementById("new-note");
let newTag = document.getElementById("new-tag");
let newNoteBtn = document.getElementById("new-note-btn");
let newTagBtn = document.getElementById("new-tag-btn");
let overlay = document.getElementById("overlay");
let closeModalBtn = document.getElementsByClassName("close-btn")[0];

showControlBtn.onfocus = () => {
    newNote.classList.add("new-note-move-up");
    newTag.classList.add("new-tag-move-up");
    newNoteBtnLabel.style.opacity = 1;
    newTagBtnLabel.style.opacity = 1;
}

showControlBtn.onblur = () => {
    newNote.classList.remove("new-note-move-up");
    newTag.classList.remove("new-tag-move-up");
    newNoteBtnLabel.style.opacity = 0;
    newTagBtnLabel.style.opacity = 0;
}

overlay.onclick = () => {
    let modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    })
}

newNoteBtn.onclick = () => {
    let modal = document.getElementById("new-note-modal");
    openModal(modal);
}

closeModalBtn.onclick = () => {
    let modal = document.getElementById("new-note-modal");
    closeModal(modal);
}

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}