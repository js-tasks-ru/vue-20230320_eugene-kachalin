import dayjs from 'dayjs';

let today = dayjs();

function todayText(time = today) {
    return time.toString();
}

function year(time = today) {
    return time.year();
}

function month(time = today) {
    return time.month();
}

function date(time = today) {
    return time.date();
}

function dow(time = today) {
    return time.day();
}

function daysInMonth(time = today) {
    return time.daysInMonth();
}

function currentMonthDays() {
    const days = today.daysInMonth();
    return [...Array(days)].map((day, index) => {

        let calendarDay = new dayjs(
            `${year()}-${month()}-${index + 1}`
        );

        return {
            date: date(calendarDay),
            isCurrentMonth: true,
            // meetupsForDay: this.meetupsByDate[date.getTime() - date.getTimezoneOffset() * 60000],
        };
    });
}

function previousMonthDays() {
    // days == Sunday => 0 days for the previous month
    const days = new Date(this.year, this.month, 0).getDay();

    if (!days) return [];

    return [...Array(days)].map((day, index) => {

        let date = new Date(
            this.year,
            this.month,
            // Magic
            index - days + 1);

        return {
            date: date.getDate(),
            isCurrentMonth: false,
            meetupsForDay: this.meetupsByDate[date.getTime() - date.getTimezoneOffset() * 60000],
        };
    });
}

export { 
    todayText, 
    year, 
    month, 
    date, 
    dow,
    daysInMonth,
    currentMonthDays
}