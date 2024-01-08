import { make, makeText } from "./tree-maker";

class NewThingButton {
    
    constructor(placeholder, className, onNewThing) {
        this.input = make('input', {placeholder: placeholder});
        const button = makeText('button', '+');
        this.root = make('div', {class: className}, [
            this.input,
            button
        ]);
        button.addEventListener('click', () => {
            const thing = this.input.value;
            if (thing != '') {
                onNewThing(thing);
                this.input.value = '';
            }
        })
    }
}

class SideBar {

    constructor(todoData, taskListDisplay) {
        this.todoData = todoData;
        this.taskListsElement = make('div', {class: 'task-lists'});
        const newTaskListButton = new NewThingButton('New task list...',
            'new-task-list', (thing) => this.onNewTaskList(thing));
        console.log(newTaskListButton.root);
        this.root = make('div', {class: 'side-bar'}, [
            this.taskListsElement,
            newTaskListButton.root
        ]);
        for (let taskList of todoData.taskLists) {
            this.addTaskList(taskList.title)
        }
        taskListDisplay.onSelectTaskList(todoData.taskLists[0]);
    }

    onNewTaskList(title) {
        this.todoData.addTaskList(title);
        this.addTaskList(title);
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