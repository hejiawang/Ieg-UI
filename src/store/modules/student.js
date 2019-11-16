import { setStore, getStore } from '@/utils/store'

const student = {
  state: {
    student: getStore({ name: 'student' }) || {}
  },
  actions: {
  },
  mutations: {
    SET_STUDENT: (state, student) => {
      console.info('adf')
      console.info(student)
      state.student = student
      setStore({
        name: 'student',
        content: state.student,
        type: 'session'
      })
    }
  }
}

export default student
