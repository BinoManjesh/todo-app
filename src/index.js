import { SideBar } from "./dom-controller";
import { TodoData } from "./todo-data";

const todoData = new TodoData();
todoData.addTaskList('inbox');
todoData.addTaskList('work');
todoData.addTaskList('personal');

console.log(todoData);

const sideBar = new SideBar(todoData);
document.body.appendChild(sideBar.root);
