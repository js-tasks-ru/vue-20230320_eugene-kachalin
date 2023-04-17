<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" :model-value="agendaItem.type" @update:modelValue="$emit('update:agendaItem', { ...agendaItem, type: $event })" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" :model-value="agendaItem.startsAt" @change="handleBeginShift" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" :model-value="agendaItem.endsAt" @change="$emit('update:agendaItem', { ...agendaItem, endsAt: $event.target.value })" />
        </UiFormGroup>
      </div>
    </div>

    <template v-if="agendaItem.type == 'talk'">
      <!-- Тема -->
      <UiFormGroup label="Тема">
        <UiInput name="title" :model-value="agendaItem.title" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            title: $event.target.value,
          })
        " />
      </UiFormGroup>
      <!-- Докладчик -->
      <UiFormGroup label="Докладчик">
        <UiInput name="speaker" :model-value="agendaItem.speaker" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            speaker: $event.target.value,
          })
        " />
      </UiFormGroup>
      <!-- Описание -->
      <UiFormGroup label="Описание">
        <UiInput multiline name="description" :model-value="agendaItem.description" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            description: $event.target.value,
          })
        " />
      </UiFormGroup>
      <!-- Язык -->
      <UiFormGroup label="Язык">
        <UiDropdown title="Язык" :options="$options.talkLanguageOptions" name="language" :model-value="agendaItem.language" @update:modelValue="$emit('update:agendaItem', { ...agendaItem, language: $event })" />
      </UiFormGroup>
    </template>

    <template v-if="agendaItem.type == 'other'">
      <!-- Заголовок -->
      <UiFormGroup label="Заголовок" v-if="agendaItem.type == 'other'">
        <UiInput name="title" :model-value="agendaItem.title" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            title: $event.target.value,
          })
        " />
      </UiFormGroup>
      <!-- Описание -->
      <UiFormGroup label="Описание">
        <UiInput multiline name="description" :model-value="agendaItem.description" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            description: $event.target.value,
          })
        " />
      </UiFormGroup>
    </template>

    <template v-if="['registration', 'opening', 'break', 'coffee', 'closing', 'afterparty'].includes(agendaItem.type)">
      <UiFormGroup label="Нестандартный текст (необязательно)" v-if="agendaItem.type != 'talk' && agendaItem.type != 'other'">
        <UiInput name="title" :model-value="agendaItem.title" @change="
          $emit('update:agendaItem', {
            ...agendaItem,
            title: $event.target.value,
          })
        " />
      </UiFormGroup>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  emits: ['update:agendaItem', 'remove'],

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleBeginShift(event) {
      const oldBeginTime = this.getTS(this.agendaItem.startsAt);
      const newBeginTime = this.getTS(event.target.value);
      const oldEndTime = this.getTS(this.agendaItem.endsAt);
      
      const newEndTime = oldEndTime + (newBeginTime - oldBeginTime);
      
      this.$emit('update:agendaItem', {
        ...this.agendaItem,
        startsAt: event.target.value,
        endsAt: this.getTextTime(newEndTime),
      })
    },

    getTS(textTime) {
      const [h, m] = textTime.split(':');
      const ts = new Date().setHours(h, m);
      return ts;
    },
    
    getTextTime(ts) {
      const date = new Date(ts);
      const hours = date
        .getHours()
        .toString()
        .padStart(2, '0');
      const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, '0');
      return `${hours}:${minutes}`
    },
  }
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col+.agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col+.agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
