import { SideBar, TaskListElement, DetailedTaskElement } from "./dom-controller";
import { TodoData } from "./todo-data";

const todoData = new TodoData();
todoData.addTaskList('inbox');
todoData.taskLists[0].addTask('bruh moment');
todoData.taskLists[0].tasks[0].isDone = true;
todoData.taskLists[0].addTask('bruh moment2');
todoData.taskLists[0].tasks[1].dueDate = '2024-01-09';
todoData.taskLists[0].tasks[1].description = 'yayayayayyayaya hohohoo hohooh yayayaayyayyay hohohoh';
todoData.taskLists[0].addTask('become awesome');
todoData.taskLists[0].tasks[2].isDone = true;
todoData.taskLists[0].tasks[2].dueDate = '2026-12-05';
todoData.addTaskList('work');
todoData.taskLists[1].addTask('work moment');
todoData.taskLists[1].addTask('work moment2');
todoData.taskLists[1].addTask('work moment3');
todoData.addTaskList('personal');
todoData.taskLists[2].addTask('wow');

console.log(todoData);

const taskListElement = new TaskListElement(
    (taskList) => {sideBar.onTaskListNameChange(taskList)},
    (taskList) => sideBar.onTaskListDelete(taskList),
    (task) => detailedTaskElement.onTaskSelected(task));
const sideBar = new SideBar(todoData, (taskList) => taskListElement.onSelectTaskList(taskList));
const detailedTaskElement = new DetailedTaskElement();
detailedTaskElement.onTaskSelected(todoData.taskLists[0].tasks[1]);

document.body.appendChild(sideBar.root);
document.body.appendChild(taskListElement.root);
document.body.appendChild(detailedTaskElement.root);
