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

class Editable {
    
    constructor(value, className, onChange) {
        this.root = make('input', {value: value, class: className});
        this.root.addEventListener('change', () => onChange(this.root.value));
    }
}

class SideBar {

    constructor(todoData, taskListDisplay) {
        this.taskListDisplay = taskListDisplay;
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
        taskListDisplay.onSelectTaskList(todoData.taskLists[0]);
    }

    onNewTaskList(title) {
        this.todoData.addTaskList(title);
        this.addTaskList(this.todoData.taskLists.at(-1));
    }

    addTaskList(taskList) {
        const element = makeText('p', taskList.title);
        element.addEventListener('click',
            () => this.taskListDisplay.onSelectTaskList(taskList));
        this.taskListsElement.appendChild(element);
    }
}

class TaskListElement {

    constructor() {
        this.header = new Editable('', 'task-list-name',
            (value) => {this.onNameChange(value)});
        this.tasks = make('ol');
        const newTaskButton = new NewThingButton('Task title...', 'new-task',
            (thing) => this.onNewTask(thing));
        this.newTaskInput = make('input', {placeholder: 'New task...'});
        this.root = make('div', {class: 'task-list'}, [
            this.header.root,
            this.tasks,
            newTaskButton.root
        ]);
        this.selectedTaskList = null;
    }

    addTask(task) {
        this.tasks.appendChild(makeText('p', task.title));
    }

    onSelectTaskList(taskList) {
        this.selectedTaskList = taskList;
        this.header.root.value = taskList.title;
        this.tasks.replaceChildren();
        for (let task of taskList.tasks) {
            this.addTask(task);
        }
    }
    
    onNewTask(title) {
        if (this.selectedTaskList === null) {
            return;
        }
        this.selectedTaskList.addTask(title);
        this.addTask(this.selectedTaskList.tasks.at(-1));
    }

    onNameChange(name) {
        if (this.selectedTaskList === null) {
            return;
        }
        this.selectedTaskList.title = name;
    }
}

export {SideBar, TaskListElement}