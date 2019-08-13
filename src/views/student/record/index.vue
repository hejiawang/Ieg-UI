<template>
  <Layout v-layoutIn class="app-student-record">
    <Row style="height: 60px;">
      <Row :gutter="32">
        <Col span="20"><Alert show-icon>考生 【 {{studentName}} 】 的来访记录</Alert></Col>
        <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
        <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
      </Row>
    </Row>

    <Row>
      <RadioGroup v-model="currentIndex" vertical style="width: 100%;">
        <Table :height="300" border :columns="tableColumns" :data="tableData"
               :loading="listLoading" stripe @on-row-click="clickTable"/>
      </RadioGroup>
    </Row>

    <Row :gutter="32" style="margin-top: 20px; height: calc(100% - 370px);">
      <Col :span="colSpan" style="height: 100%;" v-if="currentIndex !== null">
        <Card >
          <div slot="title">
            <span style="color: #17233d; font-weight: bold;"> {{cRecordDate}} </span>
          </div>
          <CStudentRecordBar :value="cRecord" style="height: 100%;" ref="CStudentRecordBar"/>
        </Card>
      </Col>

      <Col span="12" style="height: 100%;" v-if="tableData.length > 1">
        <Card >
          <div slot="title">
            <span style="color: #17233d; font-weight: bold;"> 考生成绩趋势图分析 </span>
          </div>
          <CStudentRecordLine :value="cRecordLine" style="height: 100%;" ref="CStudentRecordLine"/>
        </Card>
      </Col>
    </Row>

    <CStudentRecordForm v-model="showForm" :type="formType" :record="currentRecord" :studentId="studentId" @refresh="refresh"/>
  </Layout>
</template>
<script>
import { list, del } from '@/api/report/record'
import moment from 'moment'
import CStudentRecordForm from '@/views/student/record/form'
import CStudentRecordBar from '@/views/student/record/charBar'
import CStudentRecordLine from '@/views/student/record/lineBar'

export default {
  name: 'StudentRecord',
  components: {
    CStudentRecordForm, CStudentRecordBar, CStudentRecordLine
  },
  computed: {
    studentName () {
      return this.$route.query.studentName
    },
    studentId () {
      return this.$route.query.studentId
    },
    cRecordDate () {
      if (!this.$CV.isEmpty(this.currentIndex)) {
        return moment(this.tableData[this.currentIndex].recordDate).format('YYYY-MM-DD') + ' 来访成绩分析'
      } else {
        return ''
      }
    },
    colSpan () {
      if (this.tableData.length > 1) {
        return 12
      } else {
        return 24
      }
    },
    cRecordLine () {
      if (this.tableData.length > 1) {
        let r = {
          recordDate: [],
          totalScore: [],
          yuwenScore: [],
          shuxuScore: [],
          yingyuScore: [],
          wuliScore: [],
          huaxueScore: [],
          shengwuScore: [],
          lishiScore: [],
          diliScore: [],
          zhengzhiScore: []
        }

        this.tableData.forEach(d => {
          r.recordDate.push(moment(d.recordDate).format('YYYY-MM-DD'))

          r.totalScore.push(d.totalScore)
          r.yuwenScore.push(d.yuwenScore)
          r.shuxuScore.push(d.shuxuScore)
          r.yingyuScore.push(d.yingyuScore)
          r.wuliScore.push(d.wuliScore)
          r.huaxueScore.push(d.huaxueScore)
          r.shengwuScore.push(d.shengwuScore)
          r.lishiScore.push(d.lishiScore)
          r.diliScore.push(d.diliScore)
          r.zhengzhiScore.push(d.zhengzhiScore)
        })

        r.recordDate.reverse()
        r.totalScore.reverse()
        r.yuwenScore.reverse()
        r.shuxuScore.reverse()
        r.yingyuScore.reverse()
        r.wuliScore.reverse()
        r.huaxueScore.reverse()
        r.shengwuScore.reverse()
        r.lishiScore.reverse()
        r.diliScore.reverse()
        r.zhengzhiScore.reverse()

        return r
      } else {
        return []
      }
    },
    cRecord () {
      if (!this.$CV.isEmpty(this.currentIndex)) {
        let tD = this.tableData[this.currentIndex]

        return [
          {name: '语文成绩', value: tD.yuwenScore},
          {name: '数学成绩', value: tD.shuxuScore},
          {name: '英语成绩', value: tD.yingyuScore},
          {name: '物理成绩', value: tD.wuliScore},
          {name: '化学成绩', value: tD.huaxueScore},
          {name: '生物成绩', value: tD.shengwuScore},
          {name: '历史成绩', value: tD.lishiScore},
          {name: '地理成绩', value: tD.diliScore},
          {name: '政治成绩', value: tD.zhengzhiScore}
        ]
      } else {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: null,
      formType: '',
      showForm: false,
      listLoading: false,
      tableColumns: [],
      tableData: [],
      currentRecord: {}
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('Radio', {
              props: { label: params.index }
            }, '  ')
          }
        },
        {
          title: '来访日期',
          key: 'recordDate',
          width: '150',
          render: (h, params) => {
            return h('span', moment(params.row.recordDate).format('YYYY-MM-DD'))
          }
        },
        {title: '全省排名', key: 'position', tooltip: true},
        {title: '总分', key: 'totalScore', tooltip: true},
        {title: '语文成绩', key: 'yuwenScore', tooltip: true},
        {title: '数学成绩', key: 'shuxuScore', tooltip: true},
        {title: '英语成绩', key: 'yingyuScore', tooltip: true},
        {title: '物理成绩', key: 'wuliScore', tooltip: true},
        {title: '化学成绩', key: 'huaxueScore', tooltip: true},
        {title: '生物成绩', key: 'shengwuScore', tooltip: true},
        {title: '历史成绩', key: 'lishiScore', tooltip: true},
        {title: '地理成绩', key: 'diliScore', tooltip: true},
        {title: '政治成绩', key: 'zhengzhiScore', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 300,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    bindEvent (h, params) {
      let hContent = []

      hContent.push(
        h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑')
      )
      hContent.push(
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      )

      hContent.push(
        h('Button', {
          props: { type: 'success', ghost: true },
          on: { click: () => { this.recordViewHandle(params.row) } }
        }, '报告预览')
      )

      return h('div', hContent)
    },
    initList () {
      this.listLoading = true
      list({studentId: this.studentId}).then(data => {
        this.tableData = data.result

        if (this.tableData.length > 0) {
          this.currentIndex = 0
        }

        this.listLoading = false
      })
    },
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true; this.currentRecord = {}
    },
    modifyHandle (row) {
      this.formType = 'modify'; this.showForm = true; this.currentRecord = row
    },
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>本次学生来访记录信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.refresh()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    recordViewHandle (row) {},
    refresh () {
      this.initList()
    },
    goBack () {
      this.$router.replace({path: '/student'})
    },
    clickTable (row, index) {
      this.currentIndex = index
    }
  }
}
</script>
<style lang="scss">
  .app-student-record{
    .ivu-card {
      height: 100%;
    }
    .ivu-card-body {
      height: calc(100% - 45px);
    }
  }
</style>
