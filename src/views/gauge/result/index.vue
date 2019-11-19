<template>
  <Layout v-layoutIn class="gauge-result">
    <Header>
      <div class="cheader-images" style="float: left; height: 64px;">
        <img src="../../../assets/images/layout/logo.png">
      </div>
      <div class="cheader-info" style="height: 64px;">
        <span>艾特诗教育文化传播有限公司性格分析测试</span>
      </div>

      <div style="float: right; margin-right: 20px;">
        <a @click="goBack()">
          <div style="line-height: 60px; color: white; "> <Icon type="ios-undo" size="50" /></div>
        </a>
      </div>

      <div style="float: right; margin-right: 20px; line-height: 60px; color: white; font-size: 25px;">
        学生姓名【{{studentName}}】
      </div>
    </Header>

    <Row class="gauge-result-main">
      <Col offset="4" span="16">
        <Row :gutter="16" :style="gaugeStyle">
          <Col span="6" v-for="(info, index) in gaugeInfoList" :key="index" style="text-align: center;">
            <a href="#" @click="gaugeHandle(info)">
              <img :src="info.iconPath" style="height: 100px; width: 100px;">
              <span style="display: block; font-size: 20px;">{{info.name}}</span>
            </a>
          </Col>
        </Row>

        <Card v-if="gaugeResult.action">
          <div slot="title">
            <strong> 行为类型 </strong>
          </div>
          <div>
            <span> {{actionType}} : {{gaugeResult.action.result}}</span>
          </div>
          <div style="margin-top: 20px;">
            <span> 专业建议 : {{gaugeResult.action.advise}}</span>
          </div>
        </Card>

        <Card v-if="gaugeResult.quality">
          <div slot="title">
            <strong> 气质类型 </strong>
          </div>
          <div>
            <span> {{qualityType}} : {{gaugeResult.quality.result}}</span>
          </div>
          <div style="margin-top: 20px;">
            <span> 专业建议 : {{gaugeResult.quality.advise}}</span>
          </div>
        </Card>

        <Card v-if="gaugeResult.scl">
          <div slot="title">
            <strong> 症状评定 </strong>
          </div>
          <div>
            <span>{{gaugeResult.scl.result}}</span>
          </div>
          <div style="margin-top: 20px;">
            <span> 专业建议 : {{gaugeResult.scl.advise}}</span>
          </div>
        </Card>

        <Card v-if="gaugeResult.aks">
          <div slot="title">
            <strong> 人格因素 </strong>
          </div>
          <div>
            <span>{{gaugeResult.aks.result}}</span>
          </div>
          <div style="margin-top: 20px;">
            <span> 专业建议 : {{gaugeResult.aks.advise}}</span>
          </div>
        </Card>
      </Col>
    </Row>

  </Layout>
</template>
<script>
import store from '@/store'
import { list } from '@/api/gauge/info'
import { result } from '@/api/gauge/record'
import { listAll } from '@/api/gauge/answerInfo'

export default {
  name: 'GaugeResult',
  computed: {
    gaugeStyle () {
      if (this.$CV.isEmpty(this.gaugeResult.action) &&
        this.$CV.isEmpty(this.gaugeResult.aks) &&
        this.$CV.isEmpty(this.gaugeResult.quality) &&
        this.$CV.isEmpty(this.gaugeResult.scl)) {
        return 'margin-top: 25%;'
      } else {
        return 'margin-top: 40px;'
      }
    },
    actionType () {
      if (this.$CV.isEmpty(this.answerInfoList)) return ''
      if (this.$CV.isEmpty(this.gaugeResult.action)) return ''

      for (let i = 0; i < this.answerInfoList.length; i++) {
        if (this.answerInfoList[i]['id'] === this.gaugeResult.action.totalAnswerInfoId) {
          return this.answerInfoList[i]['name']
        }
      }
    },
    qualityType () {
      if (this.$CV.isEmpty(this.answerInfoList)) return ''
      if (this.$CV.isEmpty(this.gaugeResult.quality)) return ''

      for (let i = 0; i < this.answerInfoList.length; i++) {
        if (this.answerInfoList[i]['id'] === this.gaugeResult.quality.answerInfoId) {
          return this.answerInfoList[i]['name']
        }
      }
    }
  },
  data () {
    return {
      studentName: '',
      studentId: '',
      gaugeInfoList: [],
      answerInfoList: [],
      gaugeResult: {}
    }
  },
  created () {
    this.studentId = store.getters.student.studentId
    this.studentName = store.getters.student.studentName

    if (this.$CV.isEmpty(this.studentId)) {
      this.goBack()

      return
    }

    this.initGaugeInfo()
    this.initResult()
    this.initAnswerInfo()
  },
  methods: {
    initGaugeInfo () {
      list().then(data => {
        this.gaugeInfoList = data.result
      })
    },
    initResult () {
      result(this.studentId).then(data => {
        this.gaugeResult = data.result
      })
    },
    initAnswerInfo () {
      listAll().then((data) => {
        this.answerInfoList = data.result
      })
    },
    gaugeHandle (info) {
      store.commit('SET_GAUGE', info)
      this.$router.replace(
        {path: '/gauge/handle/describe'}
      )
    },
    goBack () {
      this.$router.replace({path: '/student'})
    }
  }
}
</script>
<style lang="scss">
  .gauge-result-main{
    padding: 20px !important;
    height: calc(100% - 64px) !important;
    overflow-y: auto !important;

    .ivu-card {
      margin-top: 40px;

      .ivu-card-head {
        strong {
          font-size: 17px;
          color: #17233d;
        }
        a {
          font-size: 17px;
        }
      }
      .ivu-card-body {
        font-size: 17px !important;
      }
    }
  }
</style>
