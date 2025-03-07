export const toDos = (() => {
    const todos = [];
    let nextId = 0;

    const createTodo = (title, description, date, priority) => {
        if (!validateInputs(title, description, date, priority)) { //input checks
            return {
                error : "invalid input"
            };
        }
        const newTodo = {
            title,
            description,
            date,
            priority,
            checked : false,
            id : nextId++
        }
        todos.push(newTodo);
        return nextId - 1;
    }

    const editTodo = (todoId, title, description, date, priority, checked) => {
        if (!validateInputs(title, description, date, priority, checked)) { //input checks
            return {
                error : "invalid input"
            };
        }
        const thisTodo = getTodoFromId(todoId);
        thisTodo.title = title;
        thisTodo.description = description;
        thisTodo.date = date;
        thisTodo.priority = priority;
        thisTodo.checked = checked;
    }

    const getTodoFromId = (todoId) => {
        return todos.find((todo) => todo.id === todoId);
    }

    const deleteTodo = (todoId) => {
        const index = todos.findIndex((todo) => todo.id === todoId);
        if (index > -1) {
            todos.splice(index,1);
        }
    }


    return {todos, createTodo, editTodo, getTodoFromId, deleteTodo}
})();


const validateInputs = (title, description, date, priority, checked = false) => {
    return true;
}