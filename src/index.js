import { SideBar, TaskListElement } from "./dom-controller";
import { TodoData } from "./todo-data";

const todoData = new TodoData();
todoData.addTaskList('inbox');
todoData.taskLists[0].addTask('bruh moment');
todoData.taskLists[0].addTask('bruh moment2');
todoData.taskLists[0].addTask('bruh moment3');
todoData.addTaskList('work');
todoData.taskLists[1].addTask('work moment');
todoData.taskLists[1].addTask('work moment2');
todoData.taskLists[1].addTask('work moment3');
todoData.addTaskList('personal');
todoData.taskLists[2].addTask('wow');

console.log(todoData);

const taskListElement = new TaskListElement((taskList) => {sideBar.onTaskListNameChange(taskList)});
const sideBar = new SideBar(todoData, (taskList) => taskListElement.onSelectTaskList(taskList));

document.body.appendChild(sideBar.root);
document.body.appendChild(taskListElement.root);
