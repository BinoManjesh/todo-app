class Task {

    constructor() {
        this.title = 'Title';
        this.description = 'Description';
        this.isDone = false;
        this.dueDate = '';
        this.priority = 4;
    }
}

class TaskList {

    constructor(title) {
        this.title = title;
        this.tasks = new Array();
    }
    
    addTask() {
        this.tasks.push(new Task());
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}

class TodoData {
    
    constructor() {
        this.taskLists = new Array();
    }

    addTaskList(title) {
        this.taskLists.push(new TaskList(title));
    }

    removeTaskList(taskList) {
        this.taskLists.splice(this.taskLists.indexOf(taskList), 1);
    }
}

export {TodoData, TaskList, Task}
