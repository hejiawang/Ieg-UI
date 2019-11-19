<template>
  <Layout v-layoutIn class="gauge-handle">
    <Header>
      <div class="cheader-images" style="float: left; height: 64px;">
        <img src="../../../assets/images/layout/logo.png">
      </div>
      <div class="cheader-info" style="height: 64px;">
        <span>艾特诗教育文化传播有限公司性格分析测试</span>
      </div>
    </Header>

    <Spin size="large" fix v-if="loading" />

    <Row v-if="gaugeList.length > 0">
      <Col offset="6" span="10" style="margin-top: 100px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; "> {{gaugeName}} </div>
        <div style="font-size: 20px; font-weight: bold; text-align: center; ">
          共{{gaugeList.length}}题, 剩余{{gaugeList.length - 1 - currentIndex}}题
        </div>

        <div style="margin-top: 100px; font-weight: bold; font-size: 30px; text-align: center;">
          {{currentGauge.sort}}. {{currentGauge.name}}
        </div>

        <div style="margin-top: 100px; font-weight: bold; font-size: 20px; text-align: center; height: 50px; line-height: 50px;">
          <div class="gauge-answer-div" :style="answerDivStyle" @click="selectAnswer(answer)"
            v-for="(answer, index) in currentGauge.answerList" :key="index">
            {{answer.name}}
          </div>
        </div>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { topic } from '@/api/gauge/topic'
import { handle } from '@/api/gauge/info'

export default {
  name: 'GaugeHandleDescribe',
  computed: {
    currentGauge () {
      return this.gaugeList[this.currentIndex]
    },
    answerDivStyle () {
      let n = 100 / this.currentGauge.answerList.length

      return 'width: ' + n + '%'
    }
  },
  data () {
    return {
      loading: false,
      gaugeName: '',
      gaugeId: '',
      studentId: '',
      gaugeList: [],
      currentIndex: 0,
      gaugeAnswer: {
        resultList: []
      }
    }
  },
  created () {
    this.gaugeName = store.getters.gauge.name
    this.gaugeId = store.getters.gauge.id
    this.studentId = store.getters.student.studentId

    this.initGaugeList()
  },
  methods: {
    initGaugeList () {
      this.loading = true

      topic(this.gaugeId).then(data => {
        this.gaugeList = data.result

        this.gaugeAnswer.gaugeId = this.gaugeId
        this.gaugeAnswer.studentId = this.studentId
        this.gaugeAnswer.resultType = store.getters.gauge.answerType
        this.gaugeAnswer.startDate = new Date()

        this.loading = false
      })
    },
    selectAnswer (answer) {
      this.loading = true

      this.gaugeAnswer.resultList.push(
        {topicType: this.currentGauge.type, answerScore: answer.score}
      )

      if (this.gaugeList.length > this.currentIndex + 1) {
        this.currentIndex++

        this.loading = false
      } else {
        this.gaugeAnswer.endDate = new Date()

        handle(this.gaugeAnswer).then(data => {
          if (data.result) {
            this.$router.replace({path: '/gauge/result'})
          }

          this.loading = false
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .gauge-handle {
    .ivu-radio-wrapper {
      margin-right: 20px;
    }
    .gauge-answer-div {
      float: left;
      cursor: pointer;
    }
    .gauge-answer-div:hover {
      background-color: #19be6b;
      color: white;
    }
  }
</style>
