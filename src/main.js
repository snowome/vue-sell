import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Iscroll from 'iscroll';

import App from './App.vue';
import RouterConfig from './router.config.js';

import './common/css/borderOnePx.css';
import './common/icomoon/style.css';

Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.prototype.Iscroll = Iscroll;
Vue.prototype.VueAlais = Vue;
const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
