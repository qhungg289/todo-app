export default function todoGenerator(title, description, dueDate, priority) {
    let note;

    function getNote() {
        return note;
    }

    function setNote(_note) {
        note = _note;
    }

    return { title, description, dueDate, priority, getNote, setNote };
}