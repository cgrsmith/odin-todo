import "./styles.css";
import { toDos } from "./todo.js";
import { projects } from "./todo.js";



const test = (() => {
    projects.createProject("proj1","description of proj1", "formatDates?",5);
    projects.addTodoToProject(0, toDos.createTodo(
        "proj1todo1",
        "desc for proj1todo1",
        "seriopuslyt how do i format dates?",
        5)
    );
    projects.addTodoToProject(0, toDos.createTodo(
        "proj1todo2",
        "desc for proj1todo2",
        "seriopuslyt how do i format dates? x2",
        3)
    );
    projects.createProject("proj2","proj2 descr","daes!",3);
    projects.replaceTodo(0, toDos.editTodo(
        "EDITEDproj1todo1",
        "desc for proj1todo1",
        "seriopuslyt how do i format dates?",
        5,
        true,
        0));

    projects.editProject(1,"Editedproj2","proj2 descr","daes!",2, true)
    console.log(projects.projects);
})();