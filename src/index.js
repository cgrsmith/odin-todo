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

    projects.addTodoToProject(1, toDos.createTodo(
        "proj2todo1",
        "desc for proj2todo1",
        "date",
        1)
    );

    projects.editProject(1,"Editedproj2","proj2 descr","daes!",2, true);

    projects.addTodoToProject(1, toDos.createTodo(
        "proj2todo2 to delete",
        "desc for proj2todo2",
        "seriopuslyt how do i format dates? x2",
        3)
    );

    projects.removeTodoFromProject(1, 3);
    toDos.deleteTodo(3);

    //thbis is bad and you should feel bad
    //just iterate over and make a new array of projects and go from there
    //or not lol
    // for (let i = 0; i < projects.projects.length; i++) {
    //    for (let j = 0; j < projects.projects[i].todos.length; j++) {
    //         projects.projects[i].todos[j] = toDos.todos.find((todo) => {
    //             return todo.id === projects.projects[i].todos[j];
    //         });
    //    }
       
    // }
    console.log(projects.projects);
    console.log("---");
    console.log(toDos.todos);
})();