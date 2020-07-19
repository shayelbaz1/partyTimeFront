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


// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.use(Cloudinary, {
  configuration: {
    cloudName: "partytime"
  }
});

 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU',
    libraries: 'places',
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
Vue.filter('to-lowercase', function(value) {
  return value.toLowerCase();
});

Vue.filter('formatNum', (val)=> {
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
