<template>
  <Layout v-layoutIn class="app-gauge-topic">
    <Row style="height: 60px;">
      <Row :gutter="32">
        <Col span="22"><Alert show-icon>{{gaugeName}} 内容详情</Alert></Col>
        <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      </Row>
    </Row>

    <Row style="height: calc(100% - 60px); overflow-y: auto;">
      <Col offset="2" span="20" style="height: 100%;">
        <Card class="app-gauge-topic-card" v-for="item in topicListDate" :key="item.id">
          <div slot="title" >
            <strong> 【{{typeFilter(item.type)}}】 </strong>
            <strong> {{item.sort}}. </strong>
            <strong> {{item.name}} </strong>
          </div>

          <div class="app-gauge-topic-answer">
            <div v-for="(answer, index) in item.answerList" :key="index" style="line-height: 30px; font-size: 17px;">
              <span>{{answer.sort}}.</span>
              <span style="min-width: 200px; display: inline-block;">{{answer.name}}</span>
              <span style="margin-left: 20px; min-width: 20px; display: inline-block;">{{answer.score}}</span>
              <span>分</span>
            </div>
          </div>
        </Card>
      </Col>
    </Row>

  </Layout>
</template>
<script>
import { topic } from '@/api/gauge/topic'
import { findChildren } from '@/api/sys/dict'

export default {
  name: 'GaugeTopic',
  filters: {
    typeFilter (val) {
      return this.typeDict[val]
    }
  },
  computed: {
    typeFilter (val) {
      return function (val) {
        return this.typeDict[val]
      }
    }
  },
  data () {
    return {
      gaugeName: '',
      gaugeId: '',
      loading: false,
      topicListDate: [],
      typeDict: {}
    }
  },
  created () {
    this.gaugeName = this.$route.query.name
    this.gaugeId = this.$route.query.id

    if (this.$CV.isEmpty(this.gaugeName) || this.$CV.isEmpty(this.gaugeId)) {
      this.goBack()

      return
    }

    findChildren(this.gaugeId).then(data => {
      data.result.forEach(dict => {
        this.typeDict[dict.value] = dict.lable
      })

      this.initTopicList()
    })
  },
  methods: {
    initTopicList () {
      this.loading = true

      topic(this.gaugeId).then(data => {
        this.topicListDate = data.result

        this.loading = false
      })
    },
    goBack () {
      this.$router.replace({path: '/gauge/info'})
    }
  }
}
</script>
<style lang="scss">
  .app-gauge-topic-card {
    margin-bottom: 20px;
    .ivu-card-head {
      padding: 5px 16px;
      strong {
        line-height: 36px;
        font-size: 17px;
        color: #17233d;
      }
    }

    .ivu-card-body {
      padding-left: 125px;
    }
  }
</style>
