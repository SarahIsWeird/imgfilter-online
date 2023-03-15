import { createApp } from 'vue'
import App from './App.vue'

import { BaklavaVuePlugin } from '@baklavajs/plugin-renderer-vue3';
import '@baklavajs/plugin-renderer-vue3/dist/styles.css';

import './assets/main.css'

createApp(App).use(BaklavaVuePlugin).mount('#app');
