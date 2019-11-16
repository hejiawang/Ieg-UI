<template>
  <Layout v-layoutIn class="app-gauge-answer-info">
    <Row style="height: 60px;">
      <Row :gutter="32">
        <Col span="22"><Alert show-icon>{{gaugeName}} 评分规则</Alert></Col>
        <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      </Row>
    </Row>

    <Row style="height: 100%;">
      <Table :height="tableHeight" :columns="tableColumns" :data="tableData" :loading="listLoading" stripe />
    </Row>

    <CGaugeAnswerInfoForm v-model="showForm" :answerInfo="currentAnswerInfo" @refresh="initTableDate"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { list } from '@/api/gauge/answerInfo'
import CGaugeAnswerInfoForm from '@/views/gauge/answerInfo/form'

export default {
  name: 'GaugeAnswerInfo',
  components: {
    CGaugeAnswerInfoForm
  },
  computed: {
    tableHeight () {
      return store.getters.windowHeight - 230
    }
  },
  data () {
    return {
      tableColumns: [],
      tableData: [],
      listLoading: false,
      showForm: false,
      currentAnswerInfo: {},
      gaugeName: '',
      type: ''
    }
  },
  created () {
    this.gaugeName = this.$route.query.name
    this.type = this.$route.query.type

    if (this.$CV.isEmpty(this.gaugeName) || this.$CV.isEmpty(this.type)) {
      this.goBack()

      return
    }

    this.initTableColumns()
    this.initTableDate()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {title: '名称', key: 'name', tooltip: true},
        {title: '评分规则', key: 'content', tooltip: true},
        {title: '规则解释', key: 'describe', tooltip: true},
        {title: '专业建议', key: 'advise', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 150,
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
        }, '编辑')
      )

      return h('div', hContent)
    },
    initTableDate () {
      this.listLoading = true

      list(this.type).then(data => {
        this.tableData = data.result

        this.listLoading = false
      })
    },
    modifyHandle (row) {
      this.currentAnswerInfo = row; this.showForm = true
    },
    goBack () {
      this.$router.replace({path: '/gauge/info'})
    }
  }
}
</script>
