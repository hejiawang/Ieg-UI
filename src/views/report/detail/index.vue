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

    <Row class="main" v-if="detail">
      <Col offset="4" span="16" style="height: 100%;">
        <div class="base-left">
          <div class="base-name">
            <strong style="font-size: 35px;">{{detail.school.name}}</strong>

            <Tag v-for="(feature, index) in detail.featureList" :key="index" color="primary" style="margin-left: 20px;">
              {{feature}}
            </Tag>
          </div>

          <div class="base-type">
            <Icon type="ios-bookmark" />
            <span>归属类型：{{detail.school.attachTypeName}}</span>
            <Icon type="ios-grid" style="margin-left: 50px;"/>
            <span >院校类型：{{detail.school.majorTypeName}}</span>
            <Icon type="md-link" style="margin-left: 50px;"/>
            <span >学院数量：{{detail.facultyList.length}}</span>
            <Icon type="ios-photos" style="margin-left: 50px;"/>
            <span >专业数量：{{detail.majorList.length}}</span>
          </div>

          <div class="base-area">
            <Icon type="md-pin" /> <span>{{provinceArea}} {{cityArea}} {{areaArea}} {{detail.school.areaDetail}}</span>
            <Icon type="md-call" style="margin-left: 50px"/> <span> {{detail.school.phone}} </span>
            <Icon type="md-git-branch" style="margin-left: 50px"/> <span> http://{{detail.school.website}} </span>
          </div>

          <div class="base-rate">
            <span class="base-rate-title">综合评价</span>
            <Rate disabled allow-half v-model="detail.school.satisfy"/>
            <span class="base-rate-title">环境指数</span>
            <Rate disabled allow-half v-model="detail.school.ratioSatisfyEnvironment"/>
            <span class="base-rate-title">生活指数</span>
            <Rate disabled allow-half v-model="detail.school.ratioSatisfyLife"/>
            <span class="base-rate-title">教育指数</span>
            <Rate disabled allow-half v-model="detail.school.ratioSatisfyEdu"/>
            <span class="base-rate-title">就业指数</span>
            <Rate disabled allow-half v-model="detail.school.ratioSatisfyWork"/>
          </div>
        </div>
        <div class="base-right">
          <img src="../../../assets/images/layout/logo.png">
        </div>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { detail } from '@/api/ieg/report'
import { pca, pcaa } from 'area-data'

export default {
  name: 'ReportDetail',
  computed: {
    ...mapGetters(['website']),
    provinceArea () {
      if (!this.$CV.isEmpty(this.detail) && !this.$CV.isEmpty(this.detail.school.areaProvince)) {
        return pca['86'][this.detail.school.areaProvince]
      } else {
        return ''
      }
    },
    cityArea () {
      if (!this.$CV.isEmpty(this.detail) && !this.$CV.isEmpty(this.detail.school.areaProvince) && !this.$CV.isEmpty(this.detail.school.areaCity)) {
        return pca[this.detail.school.areaProvince][this.detail.school.areaCity]
      } else {
        return ''
      }
    },
    areaArea () {
      if (!this.$CV.isEmpty(this.detail) && !this.$CV.isEmpty(this.detail.school.areaProvince) && !this.$CV.isEmpty(this.detail.school.areaCity) && !this.$CV.isEmpty(this.detail.school.areaArea)) {
        return pcaa[this.detail.school.areaCity][this.detail.school.areaArea]
      } else {
        return ''
      }
    }
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
      font-size: 17px;

      .base-left {
        float: left;
        width: calc(100% - 200px);
        height: 200px;

        .base-rate {
          padding: 10px 0px;
        }
        .base-rate-title {
          vertical-align: middle;
          display: inline-block;
        }
        .base-area {
          padding: 10px 0px;
        }
        .base-name {
          padding-bottom: 10px;
        }
        .base-type {
          padding: 10px 0px;
        }
      }
      .base-right {
        float: right;
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
