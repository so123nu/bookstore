import { createApp } from 'vue'
import App from './App.vue'
import router from '../routes/route.js';
import Paginate from "vuejs-paginate-next";



createApp(App).use(router).use(Paginate).mount('#app')
