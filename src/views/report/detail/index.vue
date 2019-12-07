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

    <Row id="main" class="main" v-if="detail">
      <Anchor v-if="currentTab === 'school'" show-ink container=".main" style="position: fixed; right: 30px; top: 100px;">
        <AnchorLink href="#id_name" title="院校信息" />
        <AnchorLink v-if="detail.schoolDetail.describe" href="#id_school_describe" title="院校简介" />
        <AnchorLink v-if="detail.schoolDetail.scholarship" href="#id_school_scholarship" title="奖学金设置及推免名额" />
        <AnchorLink v-if="detail.schoolDetail.life" href="#id_school_life" title="食宿条件" />
        <AnchorLink v-if="detail.environment" href="#id_school_environment" title="气候条件" />
      </Anchor>

      <Col offset="4" span="16" style="height: 100%;">
        <div style="height: 200px;">
          <div class="base-left">
            <div class="base-name" id="id_name">
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
              <span class="base-rate-title">综合</span>
              <Rate disabled allow-half v-model="detail.school.satisfy"/>
              <span class="base-rate-title">环境</span>
              <Rate disabled allow-half v-model="detail.school.ratioSatisfyEnvironment"/>
              <span class="base-rate-title">生活</span>
              <Rate disabled allow-half v-model="detail.school.ratioSatisfyLife"/>
              <span class="base-rate-title">教育</span>
              <Rate disabled allow-half v-model="detail.school.ratioSatisfyEdu"/>
              <span class="base-rate-title">就业</span>
              <Rate disabled allow-half v-model="detail.school.ratioSatisfyWork"/>
            </div>
          </div>
          <div class="base-right">
            <img :src="detail.school.logo">
          </div>
        </div>
        <Tabs style="margin-top: 20px;" v-model="currentTab">
          <TabPane label="院校信息" icon="ios-apps" name="school">
            <div class="detail-school-logo">
              <Carousel autoplay loop>
                <CarouselItem v-if="detail.schoolDetail.img1Path"> <img :src="detail.schoolDetail.img1Path"/> </CarouselItem>
                <CarouselItem v-if="detail.schoolDetail.img2Path"> <img :src="detail.schoolDetail.img2Path"/> </CarouselItem>
                <CarouselItem v-if="detail.schoolDetail.img3Path"> <img :src="detail.schoolDetail.img3Path"/> </CarouselItem>
                <CarouselItem v-if="detail.schoolDetail.img4Path"> <img :src="detail.schoolDetail.img4Path"/> </CarouselItem>
              </Carousel>
            </div>

            <Divider dashed orientation="left" v-if="detail.schoolDetail.describe">院校简介</Divider>
            <div id="id_school_describe" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.describe"/>

            <Divider dashed orientation="left" v-if="detail.schoolDetail.scholarship">奖学金设置及推免名额</Divider>
            <div id="id_school_scholarship" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.scholarship"/>

            <Divider dashed orientation="left" v-if="detail.schoolDetail.life">食宿条件</Divider>
            <div id="id_school_life" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.life"/>

            <Divider dashed orientation="left" v-if="detail.environment">气候条件</Divider>
            <div id="id_school_environment" class="quill-editor ql-container ql-editor" v-html="detail.environment"/>
          </TabPane>
          <TabPane label="院系信息" icon="ios-apps" name="faculty">标签二的内容</TabPane>
          <TabPane label="专业信息" icon="ios-apps" name="major">标签三的内容</TabPane>
        </Tabs>
      </Col>
    </Row>

    <!-- 回到顶部 -->
    <!--
    <div class="ivu-back-top ivu-back-top-show" style="bottom: 30px; right: 30px;" @click="goTop">
      <div class="ivu-back-top-inner">
        <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
      </div>
    </div>
    -->
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { detail } from '@/api/ieg/report'
import { pca, pcaa } from 'area-data'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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
      currentTab: 'school',
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
    },
    goTop () {
      document.getElementById('main').scrollTop = 0
    }
  }
}
</script>
<style lang="scss">
  .report-detail {
    .main {
      height: calc(100% - 60px) !important;
      overflow-y: auto !important;
      padding-top: 20px;
      font-size: 17px;

      .detail-school-logo {
        margin-top: 10px;
        img {
          width: 100%;
          height: 500px;
        }
      }

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

    .ivu-tabs-nav-container {
      font-size: 17px;
    }

    .ql-editor {
      line-height: 2;
      height: auto;
    }

    .ivu-divider-inner-text {
      font-size: 25px;
    }
  }
</style>
