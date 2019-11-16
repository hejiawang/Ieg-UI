import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import student from './modules/student'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common, user, student
  },
  getters
})
export default store
