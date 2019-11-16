<template>
  <Layout v-layoutIn class="gauge-result">
    <Header>
      <div class="cheader-images" style="float: left; height: 64px;">
        <img src="../../../assets/images/layout/logo.png">
      </div>
      <div class="cheader-info" style="height: 64px;">
        <span>艾特诗教育文化传播有限公司性格分析测试</span>
      </div>

      <div style="float: right; margin-right: 20px; line-height: 60px; color: white; font-size: 25px;">
        {{name}}
      </div>
    </Header>

    <Row >
      <Col offset="7" span="10" style="margin-top: 100px;">
        <div style="font-size: 40px; font-weight: bold; text-align: center; line-height: 80px;"> 测评须知 </div>

        <div style="font-size: 20px; line-height: 50px;">
          &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          {{describe}}
        </div>

        <Row style="margin-top: 100px;">
          <Col span="4">
            <Button icon="md-arrow-round-back" long type="success" @click="goBack">后退</Button>
          </Col>
          <Col span="4" offset="16">
            <Button icon="md-arrow-round-forward" long type="success" @click="goHandle">前进</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'

export default {
  name: 'GaugeHandleDescribe',
  data () {
    return {
      describe: '',
      name: ''
    }
  },
  created () {
    this.describe = store.getters.gauge.describe
    this.name = store.getters.gauge.name
  },
  methods: {
    goBack () {
      this.$router.replace({path: '/gauge/result'})
    },
    goHandle () {
      this.$router.replace({path: '/gauge/handle'})
    }
  }
}
</script>
