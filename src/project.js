
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

    const deleteProject = (projId) => {
        const index = projects.findIndex((proj) => proj.id === projId);
        if (index > -1) {
            projects.splice(index,1);
        }
    }

    const removeTodoFromProject = (projId, todoId) => {
        const index = getProjectFromId(projId).todos.findIndex((todo) => todo === todoId);
        if (index > -1) {
            getProjectFromId(projId).todos.splice(index,1);
        }
    }

    return {projects, createProject, editProject, addTodoToProject, removeTodoFromProject, deleteProject, getProjectFromId}
})();

const validateInputs = (title, description, date, priority, checked = false) => {
    return true;
}