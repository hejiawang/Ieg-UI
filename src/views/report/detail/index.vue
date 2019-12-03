<template>
  <Layout v-layoutIn class="report-detail">
    <Header>
      <div class="cheader-images" style="float: left; height: 64px;">
        <img src="../../../assets/images/layout/logo.png">
      </div>
      <div class="cheader-info" style="height: 64px;">
        <span>{{website.title.header}}</span>
      </div>

      <div style="float: right; margin-right: 20px;">
        <a @click="goBack()">
          <div style="line-height: 60px; color: white; "> <Icon type="ios-undo" size="50" /></div>
        </a>
      </div>
    </Header>

    <Row class="main">
      <Col offset="4" span="16" style="height: 100%;">
        1
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { detail } from '@/api/ieg/report'

export default {
  name: 'ReportDetail',
  computed: {
    ...mapGetters(['website'])
  },
  data () {
    return {
      schoolId: null,
      listQuery: {}
    }
  },
  created () {
    this.schoolId = this.$route.query.schoolId
    this.listQuery = this.$route.query.listQuery
    if (this.$CV.isEmpty(this.schoolId)) {
      this.$router.replace({path: '/report/search'})

      return
    }
    detail(this.schoolId).then(data => {
      console.info(data.result)
    })
  },
  methods: {
    goBack () {
      this.$router.replace({path: '/report/search', query: {listQuery: this.listQuery}})
    }
  }
}
</script>
<style lang="scss">
  .report-detail {
    .main {
      height: calc(100% - 60px) !important;
      padding-top: 20px;
    }
  }
</style>
