import { make, makeText } from "./tree-maker";

class SideBar {

    constructor(todoData) {
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

export {SideBar}