<template>
    <div :class="toast.class">
        <UiIcon class="toast__icon" :icon="toast.icon" />
        <span class="toast__message">{{ toast.message }}</span>
        <UiIcon class="toast__close" icon="trash" @click="$event => $emit('delete', toast)"/>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
    name: 'UiToast',

    components: { UiIcon },

    emits: ['delete'],

    props: {
        toast: {
            type: Object,
            required: true,
        }
    },
};
</script>

<style scoped>
.toast__icon {
    margin-right: 12px;
}

.toast__message {
    margin-right: 12px;
}
.toast__close {
    margin-left: auto;
    align-self: flex-end;
}

/* 0 references in IDE? Possibly wrong data flow scheme */
.toast_success {
    color: var(--green);
}

/* 0 references in IDE? Possibly wrong data flow scheme */
.toast_error {
    color: var(--red);
}
</style>