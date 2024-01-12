import { make, makeText } from "../tree-maker";
import NewThingButton from "./NewThingButton";
import TaskElement from "./TaskElement";

class Editable {
    
    constructor(value, className, onChange) {
        this.root = make('input', {value: value, class: className});
        this.root.addEventListener('change', () => onChange(this.root.value));
    }
}

class TaskListElement {

    constructor(notifyNameChange, notifyDelete, notifyTaskSelect) {
        this.header = new Editable('', 'task-list-name',
            (value) => {this.onNameChange(value)});
        const removeButton = makeText('button', 'Delete Task list');
        removeButton.addEventListener('click', ()=> this.onDelete());
        this.list = make('ol');
        this.tasks = [];
        const newTaskButton = new NewThingButton('New Task...', 'new-task',
            (thing) => this.onNewTask(thing));
        this.newTaskInput = make('input', {placeholder: 'New task...'});
        this.root = make('div', {class: 'task-list'}, [
            this.header.root,
            removeButton,
            this.list,
            newTaskButton.root
        ]);
        this.selectedTaskList = null;
        this.notifyNameChange = notifyNameChange;
        this.notifyDelete = notifyDelete;
        this.notifyTaskSelect = notifyTaskSelect;
    }

    addTask(task) {
        const taskElement = new TaskElement(task, this.notifyTaskSelect);
        this.tasks.push(taskElement);
        this.list.appendChild(taskElement.root);
    }

    onSelectTaskList(taskList) {
        this.root.hidden = false;
        this.selectedTaskList = taskList;
        this.header.root.value = taskList.title;
        this.list.replaceChildren();
        this.tasks  = []
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

    getTaskElement(task) {
        const index = this.selectedTaskList.tasks.indexOf(task);
        return this.tasks[index];
    }

    onDateChange(task) {
        const taskElement = this.getTaskElement(task);
        taskElement.onDateChange();
    }

    onPriorityChange(task) {
        const taskElement = this.getTaskElement(task);
        taskElement.onPriorityChange();
    }
    
    onTaskDelete(task) {
        const index = this.selectedTaskList.tasks.indexOf(task)
        const taskElement = this.tasks[index];
        taskElement.onDelete();
        this.tasks.splice(index, 1);
        this.selectedTaskList.removeTask(task);
    }
}

export default TaskListElement;
