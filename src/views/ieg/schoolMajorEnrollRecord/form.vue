<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="500" class="ieg-school-major-enroll-record-form">
    <Form ref="recordForm" :model="recordForm" :rules="recordRules" :label-width="90">
      <FormItem label="录取年份" prop="year">
        <InputNumber :max="10000" :min="1" v-model="recordForm.year" :disabled="type === 'check'" style="width: 100%"/>
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="recordForm.type" >
          <Radio :disabled="type === 'check'" label="L">理科</Radio>
          <Radio :disabled="type === 'check'" label="W">文科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="计划人数" prop="planNumber" v-show="ieg_school_delete">
        <InputNumber :max="10000" :min="0" v-model="recordForm.planNumber" style="width: 100%"/>
      </FormItem>
      <FormItem label="实际人数" prop="realNumber" v-show="ieg_school_delete">
        <InputNumber :max="10000" :min="0" v-model="recordForm.realNumber" style="width: 100%"/>
      </FormItem>
      <!-- <FormItem label="最高分数" prop="scoreMax">
        <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.scoreMax" style="width: 100%"/>
      </FormItem> -->
      <FormItem label="最低分数" prop="scoreMin">
        <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.scoreMin" style="width: 100%"/>
      </FormItem>
      <FormItem label="">
        本年度无录取分数时，最低分用0表示
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import moment from 'moment'
import { save, modify, checkInfo } from '@/api/ieg/schoolMajorEnrollRecord'
import { mapGetters } from 'vuex'

export default {
  name: 'IegSchoolMajorEnrollRecord_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    majorId: {type: String, default: '', required: true},
    record: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    ...mapGetters(['permissions']),
    title () {
      let titleAry = {
        'modify': '编辑录取信息',
        'raise': '新增录取信息',
        'check': '校验录取信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      recordForm: {
        year: 2016,
        scoreMin: null,
        scoreMax: 0,
        planNumber: null,
        realNumber: null,
        type: 'L'
      },
      recordRules: {
        year: { required: true, type: 'date', message: '请选择招生录取年份', trigger: 'change' }
      }
    }
  },
  created () {
    this.initPermissions()
    this.buildNowYear()
  },
  methods: {
    initPermissions () {
      this.ieg_school_delete = this.permissions['ieg_school_delete']
    },
    buildNowYear () {
      this.recordForm.year = parseInt(moment(new Date()).format('YYYY'))
    },
    /**
     * ok handle
     */
    ok () {
      this.$refs.recordForm.validate((valid) => {
        if (valid) {
          this.recordForm.schoolMajorId = this.majorId
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise faculty
     */
    raise () {
      this.recordForm.state = 'No'
      save(this.recordForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      this.recordForm.state = 'No'
      modify(this.recordForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    check () {
      checkInfo(this.recordForm).then(data => {
        if (data.result) this.callBack('校验成功')
        else {
          this.$Message.error('校验失败')

          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 操作成功
     * @param msg
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * close modal
     */
    cancel () {
      this.$refs.recordForm.resetFields()

      this.recordForm = {
        year: 2016,
        scoreMin: null,
        scoreMax: null,
        planNumber: null,
        realNumber: null,
        type: 'L'
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') this.recordForm = Object.assign({}, this.record)

      if (isOpen && this.type === 'check') {
        this.recordForm = Object.assign({}, this.record)
        this.recordForm.scoreMin = null
      }
    }
  }
}
</script>
