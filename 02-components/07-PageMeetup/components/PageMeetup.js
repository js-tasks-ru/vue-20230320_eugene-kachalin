import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';

// import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
// import MeetupCover from '../../03-MeetupCover/components/MeetupCover.js';
// import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js';
// import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
// import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem.js';

export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      meetup: null,
      errorMessage: null,
    }
  },

  methods: {
    async getData() {
      fetchMeetupById(this.meetupId)
        .then(res => this.meetup = res)
        .catch(err => this.errorMessage = err.message);
    }
  },

  watch: {
    meetupId: function (_) {
      this.meetup = null;
      this.errorMessage = null;
      this.getData();
    }
  },

  mounted() {
    this.getData();
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup"/>

      <UiContainer v-if="!meetup && !errorMessage">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="errorMessage">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
