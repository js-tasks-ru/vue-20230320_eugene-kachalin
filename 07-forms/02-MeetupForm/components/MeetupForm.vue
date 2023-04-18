<template>
  <form class="meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="localMeetup.title" />
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate type="date" name="date" v-model="localMeetup.date" />
        </UiFormGroup>
        <UiFormGroup label="Место">
          <UiInput name="place" v-model="localMeetup.place" />
        </UiFormGroup>
        <UiFormGroup label="Описание">
          <UiInput multiline rows="3" name="description" v-model="localMeetup.description" />
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader name="image" :preview="localMeetup.image" @select="localMeetup.imageToUpload = $event" @remove="localMeetup.imageToUpload = null" />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form v-for="(agendaItem, index) in localMeetup.agenda" :key="agendaItem.id" :agenda-item="localMeetup.agenda[index]" class="meetup-form__agenda-item" @remove="removeAgendaItem(index)" @update:agendaItem="localMeetup.agenda[index] = $event" />


      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="handleCancel">Отмена</ui-button>
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import { createAgendaItem } from '../meetupService.js';

import UiImageUploader from '../../../06-wrappers/05-UiImageUploader/components/UiImageUploader.vue';
import UiInputDate from '../../../06-wrappers/06-UiInputDate/components/UiInputDate.vue';

export default {
  name: 'MeetupForm',

  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },

  data() {
    return {
      localMeetup: this.cloneMeetup(this.meetup),
    };
  },

  emits: ['cancel', 'submit', 'remove'],

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },

  methods: {
    addAgendaItem() {
      const newItem = createAgendaItem();
      if (this.localMeetup.agenda.length) {
        const borderTime = this.localMeetup.agenda.slice(-1)[0].endsAt;
        newItem.startsAt = borderTime;
        // newItem.endsAt = this.addMinInterval(borderTime);
        // newItem.endsAt = borderTime;
      }
      this.localMeetup.agenda.push(newItem);
    },

    // addMinInterval(time) {
    //   const addMinutes = 1;
    //   const interval = addMinutes * 60000;
    //   let [h, m] = time.split(':');
    //   const ts = new Date().setHours(h, m);
    //   const date = new Date(ts + interval);
    //   const hours = date
    //     .getHours()
    //     .toString()
    //     .padStart(2, '0');
    //   const minutes = date
    //     .getMinutes()
    //     .toString()
    //     .padStart(2, '0');
    //   return `${hours}:${minutes}`;
    // },

    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    handleSubmit() {
      this.$emit('submit', this.cloneMeetup(this.localMeetup));
    },

    handleCancel() {
      this.$emit('cancel');
    },

    // dirty implementation
    cloneMeetup(meetup) {
      let temp = { ...meetup };
      temp.agenda = [ ...meetup.agenda ]
      meetup.agenda.forEach((element, index) => {
        temp.agenda[index] = { ...element };
      })
      return temp;
    }
  },
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item+.meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
