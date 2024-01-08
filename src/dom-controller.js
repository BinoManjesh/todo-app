import { make, makeText } from "./tree-maker";

class SideBar {

    constructor(todoData, taskListDisplay) {
        this.todoData = todoData;
        this.taskListsElement = make('div', {class: 'task-lists'});
        const newListButton = makeText('button', '+');
        this.newListTitle = make('input', {placeholder: 'New task list...'});
        newListButton.addEventListener('click',
            () => this.onNewTaskList(this.newListTitle.value));
        this.root = make('div', {class: 'side-bar'}, [
            this.taskListsElement,
            make('div', {class: 'new-task-list'}, [
                this.newListTitle,
                newListButton
            ])
        ]);
        for (let taskList of todoData.taskLists) {
            this.addTaskList(taskList.title)
        }
        taskListDisplay.onSelectTaskList(todoData.taskLists[0]);
    }

    onNewTaskList(title) {
        if (!title) {
            return;
        }
        this.todoData.addTaskList(title);
        this.addTaskList(title);
        this.newListTitle.value = '';
    }

    addTaskList(title) {
        this.taskListsElement.appendChild(makeText('p', title));
    }
}

class TaskListElement {

    constructor() {
        this.tasks = make('ol');
        const newTaskButton = makeText('button', '+');
        this.newTaskInput = make('input', {placeholder: 'New task...'});
        this.root = make('div', {class: 'task-list'}, [
            this.tasks,
            make('div', {class: 'new-task'}, [
                this.newTaskInput,
                newTaskButton
            ])
        ]);
        this.selectedTaskList = null;
    }

    onSelectTaskList(taskList) {
        this.selectedTaskList = taskList;
        this.tasks.replaceChildren();
        for (let task of taskList.tasks) {
            this.tasks.appendChild(makeText('p', task.title));
        }
    }
}

export {SideBar, TaskListElement}