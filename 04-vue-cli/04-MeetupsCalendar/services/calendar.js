import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import weekday from 'dayjs/plugin/weekday';
import locale from 'dayjs/locale/ru';

dayjs
    .extend(weekday)
    .extend(utc)
    .extend(isToday)
    .extend(arraySupport)
    .locale(locale);

let currentMonth = dayjs().subtract(0, 'month');



export default class Calendar {
    constructor(
        { date = dayjs(), meetups = [] } = {}
    ) {
        this.currentMonth = date;
        this.meetups = meetups;
    }

    todayText(time = currentMonth) {
        return currentMonth.toDate().toLocaleDateString(navigator.language, {
            month: 'long',
            year: 'numeric',
        })
    }

    currentMonthDays() {
        const days = currentMonth
            .daysInMonth();

        return [...Array(days)].map((_, index) => {
            const magic = index + 1;

            const calendarDay = dayjs([
                currentMonth.year(), currentMonth.month(), magic
            ]);

            return {
                date: calendarDay.date(),
                _dateObject: calendarDay,
                isCurrentMonth: calendarDay.month() == currentMonth.month(),
                // meetupsForDay: this.meetupsByDate[date.getTime() - date.getTimezoneOffset() * 60000],
            };
        });
    }

    previousMonthDays() {
        // 0 for Monday
        const days = currentMonth
            .date(1)
            .weekday();

        return [...Array(days)].map((_, index) => {
            const magic = index - days + 1;

            const calendarDay = dayjs([
                currentMonth.year(), currentMonth.month(), magic
            ]);

            return {
                date: calendarDay.date(),
                _dateObject: calendarDay,
                isCurrentMonth: calendarDay.month() == currentMonth.month(),
                // meetupsForDay: this.meetupsByDate[date.getTime() - date.getTimezoneOffset() * 60000],
            };
        });
    }

    nextMonthDays() {
        const days = (7 - 1)
            - currentMonth
                .date(currentMonth.daysInMonth())
                .weekday();

        return [...Array(days)].map((_, index) => {

            let magic = currentMonth.daysInMonth() + index + 1;

            let calendarDay = dayjs([
                currentMonth.year(), currentMonth.month(), magic
            ]);

            return {
                date: calendarDay.date(),
                _dateObject: calendarDay,
                isCurrentMonth: calendarDay.month() == currentMonth.month(),
                // meetupsForDay: this.meetupsByDate[date.getTime() - date.getTimezoneOffset() * 60000],
            };
        });
    }

    daysLaLaLa() {
        return [
            ...this.previousMonthDays(),
            ...this.currentMonthDays(),
            ...this.nextMonthDays(),
        ];
    }

    incrementMonth() {
        console.log('lalala')
        console.log(this.currentMonth, this.currentMonth.add(1, 'month'))
        this.currentMonth = this.currentMonth.add(1, 'month');
        console.log(currentMonth)
    }
}