import "./styles.css";
import { toDos } from "./todo.js";
import { projects } from "./project.js";


const clearContent = () => {
    document.getElementById("content").innerHTML = "";
}

const renderProjects = () => {
    clearContent();

    const projectsDisplay = document.createElement("div");
    projectsDisplay.appendChild(renderProjectsHeader());
    projectsDisplay.appendChild(renderProjectsGrid());

    document.getElementById("content").appendChild(projectsDisplay);
}

const renderProjectsHeader = () => {
    const header = document.createElement("div");
    header.classList = "display-header";

    const title = document.createElement("h2");
    title.innerText = "Projects";
    header.appendChild(title);

    const addButton = document.createElement("button");
    addButton.classList = "add-btn todo-btn";
    addButton.id = "add-project-btn";
    addButton.innerText = "New Project";
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderCreateProjectForm();
    });
    header.appendChild(addButton);
    //add event listener

    return header;
}

const renderProjectsGrid = () => {
    const grid = document.createElement("div");
    grid.classList = "display-grid";
    projects.projects.forEach((project) => {
        grid.appendChild(renderProjectsCard(project));
    });
    return grid;
}

const renderProjectsCard = (project) => {
    const card = document.createElement("div");
    card.classList = "display-card";
    card.innerText = project.title + " - " + project.description + " - " +  project.date + " - " + project.priority  + " - " + project.checked;
    card.addEventListener("click", (e) => {
        e.preventDefault();
        renderTodos(project);
    });
    return card;
}

const renderTodos = (project) => {
    clearContent();

    const todosDisplay = document.createElement("div");
    todosDisplay.appendChild(renderTodosHeader(project));
    todosDisplay.appendChild(renderTodosGrid(project));

    document.getElementById("content").appendChild(todosDisplay);
}

const renderTodosHeader = (project) => {
    const header = document.createElement("div");
    header.classList = "display-header";

    const backButton = document.createElement("span");
    backButton.classList = "back-button";
    backButton.innerText = "<";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderProjects();
    });
    header.appendChild(backButton);

    const title = document.createElement("h2");
    title.innerText = project.title;
    header.appendChild(title);

    const editButton = document.createElement("button");
    editButton.classList = "edit-btn todo-btn";
    editButton.id = "edit-project-btn";
    editButton.innerText = "Edit Project";
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderEditProjectForm(project);
    });
    header.appendChild(editButton);

    const addButton = document.createElement("button");
    addButton.classList = "add-btn todo-btn";
    addButton.id = "add-todo-btn";
    addButton.innerText = "New Todo";
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderCreateTodoForm(project);
    });
    header.appendChild(addButton);
    //add event listener

    return header;
}

const renderTodosGrid = (project) => {
    const grid = document.createElement("div");
    grid.classList = "display-grid";
    project.todos.forEach((todoId) => {
        grid.appendChild(renderTodosCard(project, toDos.getTodoFromId(todoId)));
    });
    return grid;
}

const renderTodosCard = (project, todo) => {
    const card = document.createElement("div");
    card.classList = "display-card";
    card.innerText = todo.title + " - " + todo.description + " - " + todo.date  + " - " + todo.priority  + " - " + todo.checked;
    card.addEventListener("click", (e) => {
        e.preventDefault();
        renderEditTodoForm(project, todo);
    });
    return card;
}

const renderCreateProjectForm = () => {
    clearContent();

    const backButton = document.createElement("span");
    backButton.classList = "todo-btn";
    backButton.innerText = "<";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderProjects();
    });
    document.getElementById("content").appendChild(backButton);
    const title = document.createElement("h2");
    title.innerText = "Create Project";
    document.getElementById("content").appendChild(title);

    const newProjectForm = renderInputForm();
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        projects.createProject(formData.title, formData.description, formData.date, formData.priority, formData.checked ? true : false);
        renderProjects();
    });

    document.getElementById("content").appendChild(newProjectForm);
}

const renderEditProjectForm = (project) => {
    clearContent();
    const backButton = document.createElement("span");
    backButton.classList = "todo-btn";
    backButton.innerText = "<";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderTodos(project);
    });
    document.getElementById("content").appendChild(backButton);
    const title = document.createElement("h2");
    title.innerText = "Edit Project";
    document.getElementById("content").appendChild(title);

    const newProjectForm = renderInputForm();
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        projects.editProject(project.id, formData.title, formData.description, formData.date, formData.priority, formData.checked ? true : false);
        console.log(project);
        renderTodos(project);
    });
    
    document.getElementById("content").appendChild(newProjectForm);

    document.getElementById("form-title").value = project.title;
    document.getElementById("form-description").value = project.description;
    document.getElementById("form-date").value = project.date;
    document.getElementById("form-priority").value = project.priority;
    document.getElementById("form-checked").checked = project.checked;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Project"
    deleteButton.classList = "todo-btn";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        if(confirm("Are you sure?")) {
            projects.deleteProject(project.id);
            renderProjects();
        }  
    });
    document.getElementById("content").appendChild(deleteButton);
}

const renderCreateTodoForm = (project) => {
    clearContent();

    const backButton = document.createElement("span");
    backButton.classList = "todo-btn";
    backButton.innerText = "<";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderTodos(project);
    });
    document.getElementById("content").appendChild(backButton);
    const title = document.createElement("h2");
    title.innerText = "Create Todo";
    document.getElementById("content").appendChild(title);

    const newProjectForm = renderInputForm();
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        const todoId = toDos.createTodo(formData.title, formData.description, formData.date, formData.priority, formData.checked ? true : false);
        projects.addTodoToProject(project.id,todoId)
        renderTodos(project);
    });

    document.getElementById("content").appendChild(newProjectForm);
}

const renderEditTodoForm = (project, todo) => {
    clearContent();
    const backButton = document.createElement("span");
    backButton.classList = "todo-btn";
    backButton.innerText = "<";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderTodos(project);
    });
    document.getElementById("content").appendChild(backButton);
    const title = document.createElement("h2");
    title.innerText = "Edit Todo";
    document.getElementById("content").appendChild(title);

    const newProjectForm = renderInputForm();
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        toDos.editTodo(project.id, formData.title, formData.description, formData.date, formData.priority, formData.checked ? true : false);
        renderTodos(project);
    });
    
    document.getElementById("content").appendChild(newProjectForm);

    document.getElementById("form-title").value = todo.title;
    document.getElementById("form-description").value = todo.description;
    document.getElementById("form-date").value = todo.date;
    document.getElementById("form-priority").value = todo.priority;
    document.getElementById("form-checked").checked = todo.checked;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Todo"
    deleteButton.classList = "todo-btn";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        if(confirm("Are you sure?")) {
            projects.removeTodoFromProject(project.id, todo.id);
            toDos.deleteTodo(todo.id);
            renderTodos(project);
        }  
    });
    document.getElementById("content").appendChild(deleteButton);
}

const renderInputForm = () => {
    const newForm = document.createElement("form");

    const titleDiv = document.createElement("div");
    const titleLabel = document.createElement("label");
    titleLabel.classList = "form-label";
    titleLabel.innerText = "Title: ";
    titleDiv.appendChild(titleLabel);
    const formTitle = document.createElement("input");
    formTitle.type = "text";
    formTitle.classList = "text-input";
    formTitle.id = "form-title";
    formTitle.name = "title";
    titleDiv.appendChild(formTitle);
    newForm.appendChild(titleDiv);


    const descriptionDiv = document.createElement("div");
    const descriptionLabel = document.createElement("label");
    descriptionLabel.classList = "form-label";
    descriptionLabel.innerText = "Description: ";
    descriptionDiv.appendChild(descriptionLabel);
    const formDescription = document.createElement("textarea");
    formDescription.classList = "textarea-input";
    formDescription.id = "form-description";
    formDescription.name = "description";
    descriptionDiv.appendChild(formDescription);
    newForm.appendChild(descriptionDiv);

    //date??
    const dateDiv = document.createElement("div");
    const dateLabel = document.createElement("label");
    dateLabel.classList = "form-label";
    dateLabel.innerText = "Due Date: ";
    dateDiv.appendChild(dateLabel);
    const formDate = document.createElement("input");
    formDate.type = "text";
    formDate.classList = "text-input";
    formDate.id = "form-date";
    formDate.name = "date";
    dateDiv.appendChild(formDate);
    newForm.appendChild(dateDiv);


    const priorityDiv = document.createElement("div");
    const priorityLabel = document.createElement("label");
    priorityLabel.classList = "form-label";
    priorityLabel.innerText = "Priority: ";
    priorityDiv.appendChild(priorityLabel);
    const formPriority = document.createElement("select");
    formPriority.classList = "select-input";
    formPriority.id = "form-priority";
    formPriority.name = "priority";
    for (let i=1; i <= 5; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        formPriority.appendChild(option);
    }
    priorityDiv.appendChild(formPriority);
    newForm.appendChild(priorityDiv);

    const checkedDiv = document.createElement("div");
    const checkedLabel = document.createElement("label");
    checkedLabel.classList = "form-label";
    checkedLabel.innerText = "Completed: ";
    checkedDiv.appendChild(checkedLabel);
    const formChecked = document.createElement("input");
    formChecked.type = "checkbox";
    formChecked.classList = "checkbox-input";
    formChecked.id = "form-checked";
    formChecked.name = "checked";
    checkedDiv.appendChild(formChecked);
    newForm.appendChild(checkedDiv);

    const formSubmit = document.createElement("button");
    formSubmit.type = "submit";
    formSubmit.classList = "submit-btn todo-btn";
    formSubmit.innerText = "Submit";
    formSubmit.id = "form-button";
    newForm.appendChild(formSubmit);

    return newForm;
}

// const test = (() => {
//     projects.createProject("proj1","description of proj1", "formatDates?",5);
//     projects.addTodoToProject(0, toDos.createTodo(
//         "proj1todo1",
//         "desc for proj1todo1",
//         "seriopuslyt how do i format dates?",
//         5)
//     );
//     projects.addTodoToProject(0, toDos.createTodo(
//         "proj1todo2",
//         "desc for proj1todo2",
//         "seriopuslyt how do i format dates? x2",
//         3)
//     );
    
//     projects.createProject("proj2","proj2 descr","daes!",3);

//     projects.addTodoToProject(1, toDos.createTodo(
//         "proj2todo1",
//         "desc for proj2todo1",
//         "date",
//         1)
//     );

//     projects.editProject(1,"Editedproj2","proj2 descr","daes!",2, true);

//     projects.addTodoToProject(1, toDos.createTodo(
//         "proj2todo2 to delete",
//         "desc for proj2todo2",
//         "seriopuslyt how do i format dates? x2",
//         3)
//     );

//     projects.removeTodoFromProject(1, 3);
//     toDos.deleteTodo(3);

//     //thbis is bad and you should feel bad
//     //just iterate over and make a new array of projects and go from there
//     //or not lol
//     // for (let i = 0; i < projects.projects.length; i++) {
//     //    for (let j = 0; j < projects.projects[i].todos.length; j++) {
//     //         projects.projects[i].todos[j] = toDos.todos.find((todo) => {
//     //             return todo.id === projects.projects[i].todos[j];
//     //         });
//     //    }
       
//     // }
//     console.log(projects.projects);
//     console.log(toDos.todos);
//     console.log("---");

// })();

// projects.loadProjects();
// toDos.loadTodos();

renderProjects();
