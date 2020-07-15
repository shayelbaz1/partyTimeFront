import Vue from "vue";
import Vuex from "vuex";
import ToyStore from './modules/ToyStore.js'
import UserStore from './modules/UserStore.js'
import ReviewStore from './modules/ReviewStore.js'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ToyStore,
    UserStore,
    ReviewStore
  }
});
