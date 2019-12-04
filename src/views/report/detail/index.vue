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

    <Spin size="large" fix v-if="loading" class="app-layout-spin"/>

    <Row class="main">
      <Col offset="4" span="16" style="height: 100%;">
        <div class="base-left">
          <div></div>
        </div>
        <div class="base-right"></div>
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
      listQuery: {},
      loading: false,
      detail: null
    }
  },
  created () {
    this.schoolId = this.$route.query.schoolId
    this.listQuery = this.$route.query.listQuery
    if (this.$CV.isEmpty(this.schoolId)) {
      this.$router.replace({path: '/report/search'})

      return
    }

    this.loading = true
    detail(this.schoolId).then(data => {
      this.detail = data.result
      console.info(data.result)

      this.loading = false
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

      .base-left {
        float: left;
        width: calc(100% - 80px);
      }
      .base-right {
        float: right;
        width: 80px;
      }
    }
  }
</style>
