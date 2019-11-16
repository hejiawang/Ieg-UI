<template>
  <Modal v-model="isShow" title="编辑量表信息" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" width="800" class="app-gauge-info-form">
    <Form ref="infoForm" :model="infoForm" :rules="infoRules" :label-width="90">
      <FormItem label="量表名称" prop="name">
        <Input type="text" v-model.trim="infoForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="量表排序" prop="sort">
        <InputNumber :max="1000" :min="1" v-model="infoForm.sort" style="width: 100%"/>
      </FormItem>
      <FormItem label="测评说明" prop="describe">
        <Input type="textarea" v-model.trim="infoForm.describe" :autosize="{minRows: 3,maxRows: 10}"
               :maxlength="500" clearable />
      </FormItem>

      <Row>
      <CUploadImg v-model="infoForm.iconPath" title="上传量表图标" action="/gauge/info/uploadIcon"/>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { modify } from '@/api/gauge/info'
import CUploadImg from '@/components/layout/uploadImg'

export default {
  name: 'GaugeInfoForm',
  components: { CUploadImg },
  props: {
    value: {type: Boolean, default: false, required: true},
    info: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      infoForm: {
        name: null,
        iconPath: null,
        sort: 0,
        isLook: 'Yes',
        isMust: 'Yes',
        answerType: null,
        describe: null
      },
      infoRules: {
        name: { required: true, message: '请输入量表名称', trigger: 'blur' },
        describe: { required: true, message: '请输入测评说明', trigger: 'blur' },
        sort: { required: true, type: 'number', message: '请选择排序', trigger: 'change' }
      }
    }
  },
  methods: {
    ok () {
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          modify(this.infoForm).then(data => {
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
      this.$refs.infoForm.resetFields()

      this.infoForm = {
        name: null,
        iconPath: null,
        sort: 0,
        isLook: 'Yes',
        isMust: 'Yes',
        answerType: null,
        describe: null
      }

      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
        this.infoForm = Object.assign({}, this.info)
      }
    }
  }
}
</script>
