<template>
  <UiCalendarView>
    <template #default="{ day }">
      <UiCalendarEvent v-for="meetup in meetupsForDay(day)" tag="a" :href="`/meetups/${meetup.id}`" :key="meetup.id">
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  computed: {
    meetupsByDate() {
      return this.getMeetupsByDate(this.meetups);
    }
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    meetupsForDay(day) {
      return this.meetupsByDate[day.utcValue];
    },

    getMeetupsByDate(meetups) {
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
  }
};
</script>

<style scoped></style>
