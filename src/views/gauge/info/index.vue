<template>
  <Layout v-layoutIn class="app-gauge-info">
    <Row style="height: 100%;">
      <Table :height="tableHeight" :columns="tableColumns" :data="tableData" :loading="listLoading" stripe />
    </Row>

    <CGaugeInfoForm v-model="showForm" :info="currentInfo" @refresh="initTableDate"/>
  </Layout>
</template>
<script>
import { list } from '@/api/gauge/info'
import store from '@/store'
import CGaugeInfoForm from '@/views/gauge/info/form'

export default {
  name: 'GaugeInfo',
  components: {
    CGaugeInfoForm
  },
  computed: {
    tableHeight () {
      return store.getters.windowHeight - 180
    }
  },
  data () {
    return {
      tableColumns: [],
      tableData: [],
      listLoading: false,
      showForm: false,
      yesOrNo: {'Yes': '采集', 'No': '不采集'},
      yesOrNoMust: {'Yes': '必须', 'No': '非必须'},
      currentInfo: {}
    }
  },
  created () {
    this.initTableColumns()
    this.initTableDate()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {
          title: '图标',
          key: 'iconPath',
          width: 80,
          render: (h, params) => {
            if (this.$CV.isEmpty(params.row.iconPath)) {
              return h('Avatar', {
                props: { shape: 'square', icon: 'ios-person', size: 'default' }
              })
            } else {
              return h('Avatar', {
                props: { shape: 'square', size: 'default', src: params.row.iconPath }
              })
            }
          }
        },
        {title: '名称', key: 'name', tooltip: true, width: 250},
        {title: '排序', key: 'sort', tooltip: true, width: 120},
        {
          title: '是否采集表情',
          key: 'isLook',
          tooltip: true,
          width: 150,
          render: (h, params) => {
            if (params.row.isLook === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.isLook])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.isLook])
          }
        },
        {
          title: '是否必须测评',
          key: 'isMust',
          tooltip: true,
          width: 150,
          render: (h, params) => {
            if (params.row.isMust === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNoMust[params.row.isMust])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNoMust[params.row.isMust])
          }
        },
        {title: '测评说明', key: 'describe', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 350,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    bindEvent (h, params) {
      let hContent = []

      hContent.push(
        h('Button', {
          props: { type: 'warning', ghost: true, size: 'default' },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑'),
        h('Button', {
          props: { type: 'info', ghost: true, size: 'default' },
          on: { click: () => { this.detailHandle(params.row) } }
        }, '量表内容'),
        h('Button', {
          props: { type: 'primary', ghost: true, size: 'default' },
          on: { click: () => { this.answerHandle(params.row) } }
        }, '测评标准')
      )

      return h('div', hContent)
    },
    initTableDate () {
      this.listLoading = true

      list().then(data => {
        this.tableData = data.result

        this.listLoading = false
      })
    },
    modifyHandle (row) {
      this.currentInfo = row; this.showForm = true
    },
    detailHandle (row) {
      this.$router.replace({path: '/gauge/topic', query: {id: row.id, name: row.name}})
    },
    answerHandle (row) {
      this.$router.replace({path: '/gauge/answerInfo', query: {type: row.answerType, name: row.name}})
    },
    goAdvise () {
      this.$router.replace({path: '/gauge/advise'})
    }
  }
}
</script>
