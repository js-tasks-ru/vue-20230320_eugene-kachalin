import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import weekday from 'dayjs/plugin/weekday';
import timezone from 'dayjs/plugin/timezone';
import locale from 'dayjs/locale/ru';

dayjs
    .extend(weekday)
    .extend(utc)
    .extend(isToday)
    .extend(arraySupport)
    .extend(timezone)
    .locale(locale);

function getDays(date) {
    const days = [];
    const previousMonthDays = date
        .date(1)
        .weekday();

    const currentMonthDays = date.daysInMonth();

    // monday = 0 for dayjs.locale('ru')
    const nextMonthDays = (7 - 1)
        - date
            .date(date.daysInMonth())
            .weekday();

    for (let day = 1; day <= previousMonthDays; day++) {
        const shift = day - previousMonthDays;
        days.push(createDay({ date, shift }));
    }

    for (let day = 1; day <= currentMonthDays; day++) {
        const shift = day;
        days.push(createDay({ date, shift }));
    }

    for (let day = 1; day <= nextMonthDays; day++) {
        const shift = date.daysInMonth() + day;
        days.push(createDay({ date, shift }));
    }

    return days;
}

function getTodayText(date) {
    return date.toDate().toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
    })
}

function createDay({ date, shift }) {
    const calendarDay = dayjs([
        date.year(), date.month(), shift
    ]);

    return {
        date: calendarDay.date(),
        jsMonth: calendarDay.month(),
        year: calendarDay.year(),
        isCurrentMonth: calendarDay.month() == date.month(),
        utcValue: calendarDay.utc(calendarDay).valueOf(),
        isToday: calendarDay.isToday(),
    };
}

function getToday() {
    return dayjs();
}

function incrementMonth(date) {
    return date.add(1, 'month');
}

function decrementMonth(date) {
    return date.subtract(1, 'month');
}

export {
    getDays,
    getTodayText,
    getToday,
    decrementMonth,
    incrementMonth,
}