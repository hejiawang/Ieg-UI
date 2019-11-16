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
        <Row :gutter="16" style="margin-top: 25%;">
          <Col span="6" v-for="(info, index) in gaugeInfoList" :key="index" style="text-align: center;">
            <a href="#" @click="gaugeHandle(info)">
              <img :src="info.iconPath" style="height: 100px; width: 100px;">
              <span style="display: block; font-size: 20px;">{{info.name}}</span>
            </a>
          </Col>
        </Row>
      </Col>
    </Row>

  </Layout>
</template>
<script>
import store from '@/store'
import { list } from '@/api/gauge/info'

export default {
  name: 'GaugeResult',
  data () {
    return {
      studentName: '',
      studentId: '',
      gaugeInfoList: []
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
  },
  methods: {
    initGaugeInfo () {
      list().then(data => {
        this.gaugeInfoList = data.result
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
  }
</style>
