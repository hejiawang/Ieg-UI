<template>
  <Layout v-layoutIn class="app-student">
    <Row style="height: 60px;">
      <Col span="8">
        <Button type="primary" icon="ios-add-circle-outline"
                @click="raiseHandle">新增学生</Button>
      </Col>
      <Col span="16">
        <Form ref="searchForm" :model="listQuery" :label-width="80" inline style="float: right">
          <FormItem label="学生编号">
            <Input type="text" v-model="listQuery.code" />
          </FormItem>
          <FormItem label="学生姓名">
            <Input type="text" v-model="listQuery.name" />
          </FormItem>
          <FormItem label="联系方式">
            <Input type="text" v-model="listQuery.phone" />
          </FormItem>
          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search" />
              <Button icon="ios-trash-outline" @click="restSearch" />
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row>
      <Table :height="tableHeight" border :columns="tableColumns"
             :data="tableData" :loading="listLoading" stripe />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="studentPage"/>
    </Row>

    <CStudentForm v-model="showForm" :type="formType" :studentId="currentStudentId" @refresh="restSearch"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { listAll, del } from '@/api/report/student'
import CStudentForm from '@/views/student/form'
import moment from 'moment'

export default {
  name: 'Student',
  components: {
    CStudentForm
  },
  computed: {
    tableHeight () {
      return store.getters.windowHeight - 290
    }
  },
  data () {
    return {
      formType: '',
      showForm: false,
      listLoading: false,
      listQuery: {
        code: null,
        name: null,
        phone: null,
        size: 10,
        total: 0
      },
      tableColumns: [],
      tableData: [],
      currentStudentId: null,
      sexFilter: { 'Man': '男', 'Woman': '女', 'Other': '其他' },
      gradeFilter: { 'One': '高一', 'Two': '高二', 'Three': '高三' }
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {title: '编码', key: 'code', tooltip: true},
        {title: '名称', key: 'name', tooltip: true},
        {title: '联系方式', key: 'phone', tooltip: true},
        {
          title: '性别',
          width: '80',
          key: 'sex',
          render: (h, params) => { return h('span', this.sexFilter[params.row.sex]) }
        },
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, params) => {
            return h('span', moment(params.row.birthday).format('YYYY-MM-DD'))
          }
        },
        {
          title: '年级',
          key: 'grade',
          render: (h, params) => { return h('span', this.gradeFilter[params.row.grade]) }
        },
        {
          title: '到访日期',
          key: 'reportDate',
          render: (h, params) => {
            return h('span', moment(params.row.reportDate).format('YYYY-MM-DD'))
          }
        },
        {title: '在读学校', key: 'schoolName', tooltip: true},
        {
          title: '毕业时间',
          key: 'schoolDate',
          render: (h, params) => {
            return h('span', moment(params.row.schoolDate).format('YYYY-MM-DD'))
          }
        },
        {title: '接待顾问', key: 'userName', tooltip: true},
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
          on: { click: () => { this.recordHandle(params.row) } }
        }, '来访记录')
      )

      return h('div', hContent)
    },
    initList () {
      this.listLoading = true
      listAll(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true; this.currentStudentId = null
    },
    modifyHandle (row) {
      this.formType = 'modify'; this.showForm = true; this.currentStudentId = row.id
    },
    recordHandle (row) {
      this.$router.replace(
        {path: '/student/record', query: {studentId: row.id, studentName: row.name}}
      )
    },
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的学生信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.restSearch()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    search () {
      this.$refs.studentPage.rest()
      this.initList()
    },
    restSearch () {
      ['name', 'code', 'phone'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    }
  }
}
</script>
