import dateFormatter from "../date-formatter";
import { make, makeText } from "../tree-maker";

class TaskElement { 
    
    constructor(task, notifySelected, notifyTitleChange) {
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
        this.notifyTitleChange = notifyTitleChange;
    }

    onTitleChange(title) {
        this.task.title = title;
        this.notifyTitleChange(this.task);
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

    onDelete() {
        this.root.remove();
    }
}

export default TaskElement
