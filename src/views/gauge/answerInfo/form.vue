<template>
  <Modal v-model="isShow" title="编辑评分规则信息" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" width="800" class="app-gauge-answer-info-form">
    <Form ref="answerInfoForm" :model="answerInfoForm" :rules="answerInfoRules" :label-width="90">
      <FormItem label="评分规则" prop="name">
        <Input type="text" v-model.trim="answerInfoForm.content" disabled/>
      </FormItem>
      <FormItem label="规则名称" prop="name">
        <Input type="text" v-model.trim="answerInfoForm.name" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="规则解释" prop="describe">
        <Input type="textarea" v-model.trim="answerInfoForm.describe" :autosize="{minRows: 3,maxRows: 10}"
               :maxlength="500" clearable />
      </FormItem>
      <FormItem label="专业建议" prop="describe">
        <Input type="textarea" v-model.trim="answerInfoForm.advise" :autosize="{minRows: 3,maxRows: 10}"
               :maxlength="500" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { modify } from '@/api/gauge/answerInfo'

export default {
  name: 'GaugeAnswerInfoForm',
  props: {
    value: {type: Boolean, default: false, required: true},
    answerInfo: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      answerInfoForm: {
        content: null,
        name: null,
        describe: null,
        advise: null
      },
      answerInfoRules: {
        name: { required: true, message: '请输入量表名称', trigger: 'blur' },
        describe: { required: true, message: '请输入量表名称', trigger: 'blur' },
        advise: { required: true, message: '请输入量表名称', trigger: 'blur' }
      }
    }
  },
  methods: {
    ok () {
      this.$refs.answerInfoForm.validate((valid) => {
        if (valid) {
          modify(this.answerInfoForm).then(data => {
            if (data.isSuccess) this.callBack('修改成功')
          })
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.answerInfoForm.resetFields()

      this.answerInfoForm = {
        content: null,
        name: null,
        describe: null,
        advise: null
      }

      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
        this.answerInfoForm = Object.assign({}, this.answerInfo)
      }
    }
  }
}
</script>
