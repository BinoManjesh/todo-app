class Task {
  static fromObject(object) {
    const task = new Task(object.title);
    task.description = object.description;
    task.isDone = object.isDone;
    task.dueDate = object.dueDate;
    task.priority = object.priority;
    return task;
  }

  constructor(title) {
    this.title = title;
    this.description = "";
    this.isDone = false;
    this.dueDate = "";
    this.priority = 0;
  }
}

class TaskList {
  static fromObject(object) {
    const taskList = new TaskList(object.title);
    for (const subObject of object.tasks) {
      taskList.tasks.push(Task.fromObject(subObject));
    }
    return taskList;
  }

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
  static fromObject(object) {
    const todoData = new TodoData();
    for (const subObject of object.taskLists) {
      todoData.taskLists.push(TaskList.fromObject(subObject));
    }
    return todoData;
  }

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

export { TodoData, TaskList, Task };
