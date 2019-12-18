<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Col span="24">
        <Form ref="searchForm" :model="listQuery" :label-width="80" inline >
          <FormItem label="查询时间">
            <DatePicker type="daterange" split-panels v-model="listQuery.nowDate"/>
          </FormItem>
          <FormItem label="院校名称">
            <Input type="text" v-model="listQuery.schoolName" />
          </FormItem>
          <FormItem label="顾问名称">
            <Input type="text" v-model="listQuery.userName" />
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

    <div style="height: calc(100% - 60px);">
      <div style="float: left; height: 100%; width: 600px;">
        <Row>
          <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe/>
        </Row>
        <Row>
          <CPage v-model="listQuery" @on-list="initList" ref="logPage"/>
        </Row>
      </div>

      <div style="float: left; height: 100%; width: calc(100% - 600px);">
        <ChartBar :value="cData" :text="chartText" style="height: 100%;" ref="chart"/>
      </div>
    </div>
  </Layout>
</template>
<script>
import { list, count } from '@/api/ieg/log'
import store from '@/store'
import moment from 'moment'
import { ChartBar } from '@/components/layout/charts'

export default {
  name: 'IegLog',
  components: {ChartBar},
  computed: {
    tableHeight () {
      return store.getters.windowHeight - 285
    },
    chartText () {
      return moment(this.listQuery.nowDate[0]).format('YYYY-MM-DD') + ' 至 ' + moment(this.listQuery.nowDate[1]).format('YYYY-MM-DD') + ' 报考顾问查询院校信息统计图'
    }
  },
  data () {
    return {
      cData: [],
      tableColumns: [],
      tableData: [],
      listLoading: false,
      listQuery: {
        nowDate: [new Date(), new Date()],
        startDate: new Date(),
        endDate: new Date(),
        schoolName: null,
        userName: null,
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created () {
    this.initList()
    this.initTableColumns()
    this.initChart()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {title: '顾问名称', key: 'userName', tooltip: true, width: '150'},
        {title: '院校名称', key: 'schoolName', tooltip: true, width: '200'},
        {
          title: '查询时间',
          tooltip: true,
          key: 'createDate',
          render: (h, params) => {
            return h('span', moment(params.row.createDate).format('YYYY-MM-DD HH:mm:ss'))
          }
        }
      ]
    },
    initList () {
      this.listLoading = true

      this.listQuery.startDate = this.listQuery.nowDate[0]
      this.listQuery.endDate = this.listQuery.nowDate[1]
      list(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    initChart () {
      this.listQuery.startDate = this.listQuery.nowDate[0]
      this.listQuery.endDate = this.listQuery.nowDate[1]
      count(this.listQuery).then(data => {
        this.cData = data.result
      })
    },
    /**
     * 重置角色列表搜索条件
     */
    restSearch () {
      ['schoolName', 'userName'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 角色列表搜索
     */
    search () {
      this.$refs.logPage.rest()
      this.initList()
      this.initChart()
    }
  }
}
</script>
