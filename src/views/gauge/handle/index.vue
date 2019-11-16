<template>
  <Layout v-layoutIn class="gauge-result">
    <Header>
      <div class="cheader-images" style="float: left; height: 64px;">
        <img src="../../../assets/images/layout/logo.png">
      </div>
      <div class="cheader-info" style="height: 64px;">
        <span>艾特诗教育文化传播有限公司性格分析测试</span>
      </div>
    </Header>

    <Row >
      <Col offset="7" span="10" style="margin-top: 100px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; "> {{gaugeName}} </div>
        <div style="font-size: 20px; font-weight: bold; text-align: center; "> 共60题, 剩余59题 </div>

        <div style="margin-top: 100px; font-weight: bold; font-size: 30px; text-align: center;">
          1. 你是一个经常头痛的人吗？
        </div>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { topic } from '@/api/gauge/topic'

export default {
  name: 'GaugeHandleDescribe',
  data () {
    return {
      gaugeName: '',
      gaugeId: '',
      studentId: '',
      gaugeList: []
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
      topic(this.gaugeId).then(data => {
        this.gaugeList = data.result
      })
    }
  }
}
</script>
