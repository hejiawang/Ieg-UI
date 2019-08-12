<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" class="app-student-record" width="800">
    <Form ref="recordForm" :model="recordForm" :rules="recordRules" :label-width="90">
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="来访日期" prop="recordDate">
            <DatePicker type="date" v-model="recordForm.recordDate" style="width: 100%" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="全省排名" prop="position">
            <InputNumber :max="10000000" :min="0" v-model="recordForm.position" style="width: 100%"/>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="12">
          <FormItem label="语文成绩" prop="yuwenScore">
            <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.yuwenScore" style="width: 100%"/>
          </FormItem>
        </Col>
        <Col span="12">
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: "StudentRecordForm",
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    studentId: {type: String, default: '', required: true},
    record: {type: String, default: '', required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑学生来访记录',
        'raise': '新增学生来访记录'
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
      isShow: false,
      recordRules: {},
      recordForm: {
        recordDate: new Date(),
        position: 0,
        totalScore: 0,
        yuwenScore: 0,
        shuxuScore: 0,
        yingyuScore: 0,
        wuliScore: 0,
        huaxueScore: 0,
        shengwuScore: 0,
        lishiScore: 0,
        diliScore: 0,
        zhengzhiScore: 0,
        yuwenState: 'Yes',
        shuxuState: 'Yes',
        yingyuState: 'Yes',
        wuliState: 'No',
        huaxueState: 'No',
        shengwuState: 'No',
        lishiState: 'No',
        diliState: 'No',
        zhengzhiState: 'No'
      }
    }
  },
  methods: {
    ok () {
      this.$refs.recordForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    raise () {
      save(this.recordForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {
      modify(this.recordForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.recordForm.resetFields()
      this.recordForm = {
        recordDate: new Date(),
        position: 0,
        totalScore: 0,
        yuwenScore: 0,
        shuxuScore: 0,
        yingyuScore: 0,
        wuliScore: 0,
        huaxueScore: 0,
        shengwuScore: 0,
        lishiScore: 0,
        diliScore: 0,
        zhengzhiScore: 0,
        yuwenState: 'Yes',
        shuxuState: 'Yes',
        yingyuState: 'Yes',
        wuliState: 'No',
        huaxueState: 'No',
        shengwuState: 'No',
        lishiState: 'No',
        diliState: 'No',
        zhengzhiState: 'No'
      }

      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.recordForm = Object.assign({}, this.record)
      }
    }
  }
}
</script>
