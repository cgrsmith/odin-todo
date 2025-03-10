
export const projects = (() => {
    
    let nextId;    
    
    const loadProjects = () => {
        if (!localStorage.getItem("todo-app-projects")) {
            nextId = 0;
            return [];
          } else {
            nextId = Number(JSON.parse(localStorage.getItem("todo-app-projects-id")));
            return JSON.parse(localStorage.getItem("todo-app-projects"));
          }
    }

    const projects = loadProjects();

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
        saveProjects();
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
        saveProjects();
    }

    const addTodoToProject = (projId, todoId) => {
        getProjectFromId(projId).todos.push(todoId);
        saveProjects();

    }

    const getProjectFromId = (projId) => {
        return projects.find((project) => project.id === projId)
    }

    const deleteProject = (projId) => {
        const index = projects.findIndex((proj) => proj.id === projId);
        if (index > -1) {
            projects.splice(index,1);
        }
        saveProjects();
    }

    const removeTodoFromProject = (projId, todoId) => {
        const index = getProjectFromId(projId).todos.findIndex((todo) => todo === todoId);
        if (index > -1) {
            getProjectFromId(projId).todos.splice(index,1);
        }
        saveProjects();
    }

    const saveProjects = () => {
        localStorage.setItem("todo-app-projects", JSON.stringify(projects));
        localStorage.setItem("todo-app-projects-id", JSON.stringify(nextId));
    }

    return {projects, createProject, editProject, addTodoToProject, removeTodoFromProject, deleteProject, getProjectFromId}
})();

const validateInputs = (title, description, date, priority, checked = false) => {
    return true;
}