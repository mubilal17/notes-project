import Vue from 'vue'
import App from './Vue Views/App.vue'
Vue.config.productionTip = false;


new Vue({
    el: '#app',
    template: '<App />',
    components: { App }
});


import Repository from './repository';
new Repository();