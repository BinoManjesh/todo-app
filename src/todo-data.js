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

    constructor() {
        this.title = 'Untitled';
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

    addTaskList() {
        this.taskLists.push(new TaskList());
    }

    removeTaskList(taskList) {
        this.taskLists.splice(this.taskLists.indexOf(taskList), 1);
    }
}

export {TodoData, TaskList, Task}
