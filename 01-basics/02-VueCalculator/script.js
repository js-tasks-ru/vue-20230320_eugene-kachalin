import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
    data() {
        return {
            a: 0,
            b: 0,
            operator: 'sum',
        };
    },
    computed: {
        result() {
            switch (this.operator) {
                case "sum":
                    return this.a + this.b;
                case "subtract":
                    return this.a - this.b;
                case "multiply":
                    return this.a * this.b
                case "divide": 
                    if (this.b != 0) {
                        return this.a / this.b
                    }
                    else return "Ошибка";;
            }
            return 777;
        }
    }

}).mount('#app');