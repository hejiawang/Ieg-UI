<template>
  <Layout>
    <Row>
      <Button type="primary" @click="reGuide">这是个全屏的测试页面，点击返回引导页</Button>
    </Row>
    <Row>
      <div style="height: 400px; width: 100%" v-html="pageOfficeHtml"></div>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'DefaultHome',
  data () {
    return {
      pageOfficeHtml: ''
    }
  },
  methods: {
    reGuide () {
      this.$router.replace('/guide')
    }
  }
}
</script>
