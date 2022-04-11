import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { formatDate, formatDateShortly } from '@/utils/filters';
/* 추가 코드 */
import axios from 'axios';
import AxiosPlugin from 'vue-axios-cors';
import vuetify from './plugins/vuetify';
Vue.use(AxiosPlugin);
axios.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.filter('formatDate', formatDate);
Vue.filter('formatDateShortly', formatDateShortly);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    vuetify,
    store,
}).$mount('#app');
