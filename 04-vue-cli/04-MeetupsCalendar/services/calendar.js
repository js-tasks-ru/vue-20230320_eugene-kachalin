
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

export default class Calendar {
    _currentMonth;
    _meetups;
    _days = [];

    constructor(
        { date = dayjs(), meetups = [] } = {}
    ) {
        this._currentMonth = dayjs(date);
        this._meetups = this._meetupsByDate(meetups);
    }
    
    get todayText() {
        return this._currentMonth.toDate().toLocaleDateString(navigator.language, {
            month: 'long',
            year: 'numeric',
        })
    }
    
    _meetupsByDate(meetups) {
        const result = {};
        for (const meetup of meetups) {
            if (!result[meetup.date]) {
                result[meetup.date] = [meetup];
            } else {
                result[meetup.date].push(meetup);
            }
        }
        return result;
    }

    _createDay(shift) {
        const calendarDay = dayjs([
            this._currentMonth.year(), this._currentMonth.month(), shift
        ]);
        this._days.push({
            date: calendarDay.date(),
            isCurrentMonth: calendarDay.month() == this._currentMonth.month(),
            meetups: this._meetups[calendarDay.utc(calendarDay).valueOf()],
            isToday: calendarDay.isToday(),
        })
    }

    get days() {
        const previousMonthDays = this._currentMonth
            .date(1)
            .weekday();

        const currentMonthDays = this._currentMonth.daysInMonth();

        // monday = 0 for dayjs.locale('ru')
        const nextMonthDays = (7 - 1)
            - this._currentMonth
                .date(this._currentMonth.daysInMonth())
                .weekday();

        for (let day = 1; day <= previousMonthDays; day++) {
            const shift = day - previousMonthDays;
            this._createDay(shift);
        }

        for (let day = 1; day <= currentMonthDays; day++) {
            const shift = day;
            this._createDay(shift);
        }

        for (let day = 1; day <= nextMonthDays; day++) {
            const shift = this._currentMonth.daysInMonth() + day;
            this._createDay(shift);
        }

        return this._days;
    }

    incrementMonth() {
        this._days = [];
        this._currentMonth = this._currentMonth.add(1, 'month');
    }

    decrementMonth() {
        this._days = [];
        this._currentMonth = this._currentMonth.subtract(1, 'month');
    }
}