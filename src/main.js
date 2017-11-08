// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "lib-flexible"
import './assets/css/reset.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'
import md5 from 'js-md5'
import './assets/css/style.css';

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})