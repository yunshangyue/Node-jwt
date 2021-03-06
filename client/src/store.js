import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import mutations from './store/mutation'
import getters from './store/getter'
import actions from './store/action'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
