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

export const projects = (() => {
    const projects = [];
    let nextId = 0;

    const createProject = (title, description, date, priority) => {
        if (!validateInputs(title, description, date, priority)) { //input checks
            return {
                error : "invalid input"
            };
        }
        const newProj = {
            title,
            description,
            date,
            priority,
            checked : false,
            todos : [],
            id : nextId++
        }
        projects.push(newProj);
    }

    const editProject = (projId, title, description, date, priority, checked) => {
        if (!validateInputs(title, description, date, priority, checked)) { //input checks
            return {
                error : "invalid input"
            };
        }
        const thisProject = getProjectFromId(projId);
        thisProject.title = title;
        thisProject.description = description;
        thisProject.date = date;
        thisProject.priority = priority;
        thisProject.checked = checked;
    }

    const addTodoToProject = (projId, todoId) => {
        getProjectFromId(projId).todos.push(todoId);
    }

    const getProjectFromId = (projId) => {
        return projects.find((project) => project.id === projId)
    }

    const removeTodoFromProject = (projId, todoId) => {
        const index = getProjectFromId(projId).todos.findIndex((todo) => todo === todoId);
        if (index > -1) {
            getProjectFromId(projId).todos.splice(index,1);
        }
    }

    return {projects, createProject, editProject, addTodoToProject, removeTodoFromProject}
})();

const validateInputs = (title, description, date, priority, checked = false) => {
    return true;
}