import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    redirectUrl: null,
    currentUser: null as Object | null,
  },
  mutations: {
    logout(state) {
      state.currentUser = null;
    },
    set_current_user(state, payload) {
      state.currentUser = payload.currentUser;
    },
    set_redirect_url(state, payload) {
      state.redirectUrl = payload.redirectUrl;
    },
  },
  actions: {},
  getters: {
    hasCurrentUser: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  },
});
