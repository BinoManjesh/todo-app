import { make, makeText } from "../tree-maker";
import NewThingButton from "./NewThingButton";

class SideBar {

    constructor(todoData, notifySelectTaskList) {
        this.todoData = todoData;
        this.taskListsElement = make('div', {class: 'task-lists'});
        const newTaskListButton = new NewThingButton('New task list...',
            'new-task-list', (thing) => this.onNewTaskList(thing));
        this.root = make('div', {class: 'side-bar'}, [
            this.taskListsElement,
            newTaskListButton.root
        ]);
        for (let taskList of todoData.taskLists) {
            this.addTaskList(taskList)
        }
        this.notifySelectTaskList = notifySelectTaskList;
        if (todoData.taskLists[0]) {
            this.notifySelectTaskList(todoData.taskLists[0]);
        }
    }

    onNewTaskList(title) {
        this.todoData.addTaskList(title);
        this.addTaskList(this.todoData.taskLists.at(-1));
    }

    addTaskList(taskList) {
        const element = makeText('p', taskList.title);
        element.addEventListener('click',
            () => this.notifySelectTaskList(taskList));
        this.taskListsElement.appendChild(element);
    }

    onTaskListNameChange(taskList) {
        const index = this.todoData.taskLists.indexOf(taskList);
        this.taskListsElement.children.item(index).textContent = taskList.title;
    }

    onTaskListDelete(taskList) {
        const index = this.todoData.taskLists.indexOf(taskList);
        this.taskListsElement.children.item(index).remove();
        this.todoData.removeTaskList(taskList);
    }
}

export default SideBar;
