export default function todoGenerator(title, description, dueDate, priority, label) {
    let note;
    let completed = false;

    function getNote() {
        return note;
    }

    function setNote(_note) {
        note = _note;
    }

    return { title, description, dueDate, priority, label, getNote, setNote };
}