import { setStore, getStore } from '@/utils/store'

const student = {
  state: {
    student: getStore({ name: 'student' }) || {},
    gauge: getStore({ name: 'gauge' }) || {}
  },
  actions: {
  },
  mutations: {
    SET_STUDENT: (state, student) => {
      state.student = student
      setStore({
        name: 'student',
        content: state.student,
        type: 'session'
      })
    },
    SET_GAUGE: (state, gauge) => {
      state.gauge = gauge
      setStore({
        name: 'gauge',
        content: state.gauge,
        type: 'gauge'
      })
    }
  }
}

export default student
