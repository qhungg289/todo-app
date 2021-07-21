export function todoGenerator(title, description, dueDate, priority, tag) {
    let completed = false;

    return { title, description, dueDate, priority, tag, completed };
}