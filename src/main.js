import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { ValidationProvider } from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps'
import Cloudinary from 'cloudinary-vue';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './scss/global.scss';
import GSignInButton from 'vue-google-signin-button'
import VueSocialSharing from 'vue-social-sharing'
// import moment from 'moment';

// Vue.use(moment);
Vue.use(VueSocialSharing);


// // Use v-calendar & v-date-picker components
// Vue.use(VCalendar, {
//   componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
//   // ...other defaults
// });
Vue.use(GSignInButton)

// Install BootstrapVue
Vue.use(BootstrapVue)



Vue.use(Cloudinary, {
  configuration: {
    cloudName: "partytime"
  }
});


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIRUoau4daansiuIk9xffRyjL8yJYv8SI',
    libraries: 'places,drawing,visualization',
  }
})

Vue.use(require('vue-moment'));

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

Vue.component('ValidationProvider', ValidationProvider);

Vue.use(ElementUI);

Vue.config.productionTip = false;

// Filters
Vue.filter('to-lowercase', function (value) {
  return value.toLowerCase();
});

Vue.filter('formatNum', (val) => {
  return Number(val).toLocaleString();
});

Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
// ------

// Vue App
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
