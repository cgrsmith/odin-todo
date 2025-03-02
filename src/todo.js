export const toDos = (() => {
    let nextId = 0;

    const createTodo = (title, description, date, priority) => {
        if (!validateInputs(title, description, date, priority)) { //input checks
            return {
                error : "invalid input"
            };
        }
        return {
            title,
            description,
            date,
            priority,
            checked : false,
            id : nextId++
        }
    }

    const editTodo = (title, description, date, priority, checked, id) => {
        if (!validateInputs(title, description, date, priority, checked)) { //input checks
            return {
                error : "invalid input"
            };
        }
        return {
            title,
            description,
            date,
            priority,
            checked,
            id
        }
    }



    return {createTodo, editTodo}
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
        const thisProject = projects.find((project) => project.id === projId);
        thisProject.title = title;
        thisProject.description = description;
        thisProject.date = date;
        thisProject.priority = priority;
        thisProject.checked = checked;
    }

    const addTodoToProject = (id, newTodo) => {
        projects.find((project) => project.id === id).todos.push(newTodo);
    }

    const replaceTodo = (projId, newTodo) => {
        const thisProject = projects.find((project) => project.id === projId);
        const todoIndex = thisProject.todos.findIndex((todo) => todo.id === newTodo.id);
        thisProject.todos[todoIndex] = newTodo;
    } 

    return {projects, createProject, editProject, addTodoToProject, replaceTodo}
})();

const validateInputs = (title, description, date, priority, checked = false) => {
    return true;
}