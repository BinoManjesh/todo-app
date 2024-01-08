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
        this.notifySelectTaskList(todoData.taskLists[0]);
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
        this.todoData.deleteTaskList(taskList);
        console.log(taskList);
    }
}

class TaskListElement {

    constructor(notifyNameChange, notifyDelete) {
        this.header = new Editable('', 'task-list-name',
            (value) => {this.onNameChange(value)});
        const deleteButton = makeText('button', 'Delete Task list');
        deleteButton.addEventListener('click', ()=> this.onDelete());
        this.tasks = make('ol');
        const newTaskButton = new NewThingButton('Task title...', 'new-task',
            (thing) => this.onNewTask(thing));
        this.newTaskInput = make('input', {placeholder: 'New task...'});
        this.root = make('div', {class: 'task-list'}, [
            this.header.root,
            deleteButton,
            this.tasks,
            newTaskButton.root
        ]);
        this.selectedTaskList = null;
        this.notifyNameChange = notifyNameChange;
        this.notifyDelete = notifyDelete;
    }

    addTask(task) {
        this.tasks.appendChild(makeText('p', task.title));
    }

    onSelectTaskList(taskList) {
        this.root.hidden = false;
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
        this.selectedTaskList.title = name;
        this.notifyNameChange(this.selectedTaskList);
    }

    onDelete() {
        this.root.hidden = true;
        this.notifyDelete(this.selectedTaskList);
    }
}

export {SideBar, TaskListElement}