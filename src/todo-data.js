class Task {

    constructor(title) {
        this.title = title;
        this.description = '';
        this.isDone = false;
        this.dueDate = '';
        this.priority = 0;
    }
}

class TaskList {

    constructor(title) {
        this.title = title;
        this.tasks = new Array();
    }
    
    addTask(title) {
        this.tasks.push(new Task(title));
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

    deleteTaskList(taskList) {
        this.taskLists.splice(this.taskLists.indexOf(taskList), 1);
    }
}

export {TodoData, TaskList, Task}
