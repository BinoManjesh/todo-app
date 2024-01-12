import { make, makeText } from "../tree-maker";

class DetailedTaskElement {

    static priorityNames = ['None', 'Low', 'Medium', 'High'];

    constructor(notifyDateChange, notifyPriorityChange, notifyDelete) {
        this.title = make('p');
        const removeButton = makeText('button', 'Delete Task');
        removeButton.addEventListener('click', () => this.onDelete());
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
        this.description = make('textarea', {'placeholder': 'Description...'});
        this.description.addEventListener('change',
            () => this.onDescriptionChange(this.description.value));
        this.root = make('div', {class: 'detailed-task'}, [
            this.title,
            removeButton,
            make('div', {}, [
                this.date,
                makeText('p', 'Priority: '),
                this.priority
            ]),
            this.description
        ]);
        this.selectedTask = null;
        this.notifyDateChange = notifyDateChange;
        this.notifyPriorityChange = notifyPriorityChange;
        this.notifyDelete = notifyDelete;
    }

    onTaskSelected(task) {
        this.selectedTask = task;
        this.title.textContent = task.title;
        this.date.value = task.dueDate;
        this.priority.value = task.priority;
        this.description.value = task.description;
        this.root.hidden = false;
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

    onDelete() {
        this.notifyDelete(this.selectedTask);
        this.root.hidden = true;
    }
}

export default DetailedTaskElement;
