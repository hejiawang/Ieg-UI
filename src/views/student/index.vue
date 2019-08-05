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

    <CStudentForm v-model="showForm" :type="formType" @refresh="restSearch"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { listAll } from '@/api/report/student'
import CStudentForm from '@/views/student/form'

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
      tableData: []
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    initTableColumns () {
      this.schoolTableColumns = [
        {title: '编码', key: 'code', tooltip: true},
        {title: '名称', key: 'name', tooltip: true},
        {title: '联系方式', key: 'phone', tooltip: true},
        {title: '性别', key: 'sex', tooltip: true},
        {title: '出生日期', key: 'birthday', tooltip: true},
        {title: '年级', key: 'grade', tooltip: true},
        {title: '到访日期', key: 'reportDate', tooltip: true},
        {title: '在读学校', key: 'schoolName', tooltip: true},
        {title: '毕业时间', key: 'schoolDate', tooltip: true},
        {title: '接待顾问', key: 'userId', tooltip: true}
      ]
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
      this.formType = 'raise'; this.showForm = true
    },
    search () {},
    restSearch () {}
  }
}
</script>
