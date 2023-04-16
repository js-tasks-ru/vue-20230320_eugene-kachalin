export default class Calendar {

    constructor(date) {
        if (!date) this.date = new Date()
        this.date = date;
    }

    setDate(date) {
        if (!date) this.date = new Date()

        this.date = date;
    }

    todayText() {
        return this.date.toLocaleDateString(navigator.language, {
            month: 'long',
            year: 'numeric',
        })
    }

    month() {
        return this.date.getMonth();
    }

    year() {
        return this.date.getFullYear();
    }
}