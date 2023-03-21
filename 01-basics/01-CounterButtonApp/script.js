import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
    data() {
        return {
            counter: 0,
        };
    },
    template: '<button @click="counter++">{{counter}}</button>',

}).mount('#app');