<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" class="app-student-form" width="1200">
    1
  </Modal>
</template>
<script>
export default {
  name: 'Student_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑学生信息',
        'raise': '新增学生信息'
      }
      return titleAry[this.type]
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      loading: true,
      isShow: false
    }
  },
  methods: {
    ok () {},
    cancel () {
      this.isShow = false
    },
    visibleChange () {}
  }
}
</script>
