import { SideBar, TaskListElement } from "./dom-controller";
import { TodoData } from "./todo-data";

const todoData = new TodoData();
todoData.addTaskList('inbox');
todoData.taskLists[0].addTask('bruh moment');
todoData.taskLists[0].addTask('bruh moment2');
todoData.taskLists[0].addTask('bruh moment3');
todoData.addTaskList('work');
todoData.addTaskList('personal');

console.log(todoData);

const taskListElement = new TaskListElement();
const sideBar = new SideBar(todoData, taskListElement);

document.body.appendChild(sideBar.root);
document.body.appendChild(taskListElement.root);
