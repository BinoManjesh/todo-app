class DateFormatter {

    constructor() {
        const today = new Date();
        this.currentYear = today.getFullYear() + '';
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    format(date) {
        if (date === '') {
            return '';

        }
        const [year, month, day] = date.split('-');
        if (year === this.currentYear) {
            return `${day} ${this.months[month-1]}`;
        } else {
            return `${day} ${this.months[month-1]}, ${year}`;
        }
    }
}

const dateFormatter = new DateFormatter();

export default dateFormatter;
