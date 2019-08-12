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
      <Table :height="300" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe />
    </Row>

    <Row>
      1
    </Row>

    <CStudentRecordForm v-model="showForm" :type="formType" :record="currentRecord" :studentId="studentId" @refresh="refresh"/>
  </Layout>
</template>
<script>
import { list, del } from '@/api/report/record'
import moment from 'moment'
import CStudentRecordForm from '@/views/student/record/form'

export default {
  name: 'StudentRecord',
  components: {
    CStudentRecordForm
  },
  computed: {
    studentName () {
      return this.$route.query.studentName
    },
    studentId () {
      return this.$route.query.studentId
    }
  },
  data () {
    return {
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
    }
  }
}
</script>
