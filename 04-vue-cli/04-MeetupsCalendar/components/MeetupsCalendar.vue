<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ today }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <!-- Begin before month -->
      <div class="calendar-view__cell calendar-view__cell_inactive" tabindex="0" v-for="day in getPrevDays()" :key="day">
        <div class="calendar-view__cell-day">{{ numberOfDaysInMonth }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <!-- End before month -->
      <!-- Begin month -->
      <div class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">{{ getDate(firstDayOfMonth()) }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">{{ getDate(firstDayOfMonth() + 1) }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">3</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">4</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <!-- End month -->
      <!-- Begin after month -->
      <div class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div class="calendar-view__cell-day">1</div>
        <div class="calendar-view__cell-content"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectedDate: new Date(),
    };
  },

  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays
      ];
    },

    today() {
      return (new Date).toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      })
    },

    numberOfDaysInMonth() {
      return new Date(this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        0).getDate();
    },

    month() {
      return Number(this.selectedDate.getMonth());
    },

    year() {
      return Number(this.selectedDate.getFullYear());
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: `${this.year}-${this.month}-${index + 1}`,
          isCurrentMonth: true
        };
      });
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );
      const firstDate = new Date(`${this.year}-${this.month}-01`);
      const previousMonth = new Date(
        firstDate.setMonth(
          firstDate.getMonth() - 1
        ));

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() +
              1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false
          };
        }
      );
    },

  },

  methods: {
    getWeekday(date) {
      return (new Date(date)).getDay() + 1;
    },
    
    firstDayOfMonth() {
      const date = new Date(2023, 3);
      return date;
    },

    dateToDayOfWeek(date) {
      let day = (new Date(date)).getDay();
      if (day == 0) day = 7;
      return day - 1;
    },

    getDate(date) {
      return (new Date(date)).getDate();
    },

    getPrevDays() {
      let days = [];
      for (let i = 0; i < this.dateToDayOfWeek(this.firstDayOfMonth()); i++) {
        days.push(i);
      }
      console.log(days);
      return days;
    }
  },
};
</script>

<style scoped>
.calendar-view {}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
