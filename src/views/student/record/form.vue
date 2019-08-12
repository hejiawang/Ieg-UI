<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" class="app-student-record" width="1200">
    <Form ref="recordForm" :model="recordForm" :rules="recordRules" :label-width="90">
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="来访日期" prop="recordDate">
            <DatePicker type="date" v-model="recordForm.recordDate" style="width: 100%" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="全省排名" prop="position">
            <InputNumber :max="10000000" :min="0" v-model="recordForm.position" style="width: 100%"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="总分" prop="totalScore">
            <InputNumber :max="10000000" :min="0" :step="0.01" v-model="recordForm.totalScore"
                         style="width: 100%" :disabled="true"/>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="8">
          <FormItem label="语文成绩" prop="yuwenScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.yuwenScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.yuwenState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="数学成绩" prop="shuxuScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.shuxuScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.shuxuState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="英语成绩" prop="yingyuScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.yingyuScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.yingyuState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="8">
          <FormItem label="物理成绩" prop="wuliScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.wuliScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.wuliState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="化学成绩" prop="huaxueScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.huaxueScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.huaxueState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="生物成绩" prop="shengwuScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.shengwuScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.shengwuState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="8">
          <FormItem label="历史成绩" prop="lishiScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.lishiScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.lishiState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="地理成绩" prop="diliScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.diliScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.diliState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="政治成绩" prop="zhengzhiScore">
            <Row :gutter="10">
              <Col span="18">
                <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.zhengzhiScore" style="width: 100%"/>
              </Col>
              <Col span="5">
                <i-switch v-model="recordForm.zhengzhiState" true-value="Yes" false-value="No">
                  <span slot="open">记分</span>
                  <span slot="close">不记分</span>
                </i-switch>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/report/record'

export default {
  name: 'StudentRecordForm',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    studentId: {type: String, default: '', required: true},
    record: {type: Object, default: null, required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑学生来访记录',
        'raise': '新增学生来访记录'
      }
      return titleAry[this.type]
    },

    yuwenScore () { return this.recordForm.yuwenScore },
    shuxuScore () { return this.recordForm.shuxuScore },
    yingyuScore () { return this.recordForm.yingyuScore },
    wuliScore () { return this.recordForm.wuliScore },
    huaxueScore () { return this.recordForm.huaxueScore },
    shengwuScore () { return this.recordForm.shengwuScore },
    lishiScore () { return this.recordForm.lishiScore },
    diliScore () { return this.recordForm.diliScore },
    zhengzhiScore () { return this.recordForm.zhengzhiScore },

    yuwenState () { return this.recordForm.yuwenState },
    shuxuState () { return this.recordForm.shuxuState },
    yingyuState () { return this.recordForm.yingyuState },
    wuliState () { return this.recordForm.wuliState },
    huaxueState () { return this.recordForm.huaxueState },
    shengwuState () { return this.recordForm.shengwuState },
    lishiState () { return this.recordForm.lishiState },
    diliState () { return this.recordForm.diliState },
    zhengzhiState () { return this.recordForm.zhengzhiState }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) },

    yuwenScore (val) { this.countTotal() },
    shuxuScore (val) { this.countTotal() },
    yingyuScore (val) { this.countTotal() },
    wuliScore (val) { this.countTotal() },
    huaxueScore (val) { this.countTotal() },
    shengwuScore (val) { this.countTotal() },
    lishiScore (val) { this.countTotal() },
    diliScore (val) { this.countTotal() },
    zhengzhiScore (val) { this.countTotal() },

    yuwenState () { this.countTotal() },
    shuxuState () { this.countTotal() },
    yingyuState () { this.countTotal() },
    wuliState () { this.countTotal() },
    huaxueState () { this.countTotal() },
    shengwuState () { this.countTotal() },
    lishiState () { this.countTotal() },
    diliState () { this.countTotal() },
    zhengzhiState () { this.countTotal() }
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
          this.recordForm.studentId = this.studentId
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
    },
    countTotal () {
      let total = 0

      if (this.recordForm.yuwenState === 'Yes') total = total + this.recordForm.yuwenScore
      if (this.recordForm.shuxuState === 'Yes') total = total + this.recordForm.shuxuScore
      if (this.recordForm.yingyuState === 'Yes') total = total + this.recordForm.yingyuScore
      if (this.recordForm.wuliState === 'Yes') total = total + this.recordForm.wuliScore
      if (this.recordForm.huaxueState === 'Yes') total = total + this.recordForm.huaxueScore
      if (this.recordForm.shengwuState === 'Yes') total = total + this.recordForm.shengwuScore
      if (this.recordForm.lishiState === 'Yes') total = total + this.recordForm.lishiScore
      if (this.recordForm.diliState === 'Yes') total = total + this.recordForm.diliScore
      if (this.recordForm.zhengzhiState === 'Yes') total = total + this.recordForm.zhengzhiScore

      this.recordForm.totalScore = total
    }
  }
}
</script>
