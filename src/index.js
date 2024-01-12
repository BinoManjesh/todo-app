import DetailedTaskElement from "./dom-controller/DetailedTaskElement";
import SideBar from "./dom-controller/SideBar";
import TaskListElement from "./dom-controller/TaskListElement";
import './styles.css'
import { restoreData, saveData } from "./local-storage-loader";

let todoData = restoreData();

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') {
        saveData(todoData);
    }
    if (document.visibilityState == 'visible') {
        todoData = restoreData();
    }
});

const taskListElement = new TaskListElement(
    (taskList) => {sideBar.onTaskListNameChange(taskList)},
    (taskList) => {
        sideBar.onTaskListDelete(taskList);
        detailedTaskElement.hide();
    },
    (task) => detailedTaskElement.onTaskSelected(task),
    () => detailedTaskElement.onTitleChange());
const detailedTaskElement = new DetailedTaskElement(
    (task) => taskListElement.onDateChange(task),
    (task) => taskListElement.onPriorityChange(task),
    (task) => taskListElement.onTaskDelete(task));
const sideBar = new SideBar(todoData,
    (taskList) => {
        taskListElement.onSelectTaskList(taskList);
        detailedTaskElement.hide();
    });

document.body.appendChild(sideBar.root);
document.body.appendChild(taskListElement.root);
document.body.appendChild(detailedTaskElement.root);
