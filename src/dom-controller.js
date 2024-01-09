import dateFormatter from "./date-formatter";
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
    }
}

class TaskListElement {

    constructor(notifyNameChange, notifyDelete, notifyTaskSelect) {
        this.header = new Editable('', 'task-list-name',
            (value) => {this.onNameChange(value)});
        const deleteButton = makeText('button', 'Delete Task list');
        deleteButton.addEventListener('click', ()=> this.onDelete());
        this.list = make('ol');
        this.tasks = [];
        const newTaskButton = new NewThingButton('Task title...', 'new-task',
            (thing) => this.onNewTask(thing));
        this.newTaskInput = make('input', {placeholder: 'New task...'});
        this.root = make('div', {class: 'task-list'}, [
            this.header.root,
            deleteButton,
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
}

class TaskElement { 
    
    constructor(task, notifySelected) {
        this.task = task;
        const checkbox = make('input', {type: 'checkbox'});
        checkbox.checked = task.isDone;
        checkbox.addEventListener('change',
            () => this.onCheckboxChange(checkbox.checked));
        const title = make('input', {value: task.title});
        title.addEventListener('change', () => this.onTitleChange(title.value));
        this.date = makeText('span');
        this.onDateChange();
        this.root = make('div', {}, [
            checkbox,
            title,
            this.date
        ]);
        this.root.addEventListener('click', () => notifySelected(task));
        this.onPriorityChange();
    }

    onTitleChange(title) {
        this.task.title = title;
    }

    onCheckboxChange(checked) {
        this.task.isDone = checked;
    }

    onDateChange() {
        this.date.textContent = dateFormatter.format(this.task.dueDate);
    }

    onPriorityChange() {
        this.root.className = 'P' + this.task.priority;
    }
}

class DetailedTaskElement {

    static priorityNames = ['None', 'Low', 'Medium', 'High'];

    constructor(notifyDateChange, notifyPriorityChange) {
        this.title = make('p');
        this.date = make('input', {type: 'date'});
        this.date.addEventListener('change',
            () => this.onDateChange(this.date.value));
        this.priority = make('select');
        this.priority.addEventListener('change',
            () => this.onPriorityChange(this.priority.value));
        for (const i in DetailedTaskElement.priorityNames) {
            this.priority.appendChild(
                makeText('option', DetailedTaskElement.priorityNames[i],
                {value: i}));
        }
        this.description = make('textarea');
        this.description.addEventListener('change',
            () => this.onDescriptionChange(this.description.value));
        this.root = make('div', {class: 'detailed-task'}, [
            this.title,
            this.date,
            this.priority,
            this.description
        ]);
        this.selectedTask = null;
        this.notifyDateChange = notifyDateChange;
        this.notifyPriorityChange = notifyPriorityChange;
    }

    onTaskSelected(task) {
        this.selectedTask = task;
        this.title.textContent = task.title;
        this.date.value = task.dueDate;
        this.priority.value = task.priority;
        this.description.value = task.description;
    }

    onDateChange(date) {
        this.selectedTask.dueDate = date;
        this.notifyDateChange(this.selectedTask);
    }

    onPriorityChange(priority) {
        this.selectedTask.priority = priority;
        this.notifyPriorityChange(this.selectedTask);
    }

    onDescriptionChange(description) {
        this.selectedTask.description = description;
    }
}

export {SideBar, TaskListElement, DetailedTaskElement};
