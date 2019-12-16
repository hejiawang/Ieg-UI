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
      <Anchor v-if="currentTab === 'school'" show-ink container=".main" class="school_detail_anchor" >
        <AnchorLink href="#id_name" title="院校信息" />
        <AnchorLink v-if="detail.schoolDetail.describe" href="#id_school_describe" title="院校简介" />
        <AnchorLink v-if="detail.schoolDetail.scholarship" href="#id_school_scholarship" title="奖学金设置及推免名额" />
        <AnchorLink v-if="detail.schoolDetail.life" href="#id_school_life" title="食宿条件" />
        <AnchorLink v-if="detail.environment" href="#id_school_environment" title="气候条件" />

        <AnchorLink v-for="(problem, index) in detail.problemList" :key="index" :href="'#' + problem.id" :title="problem.problem" />

        <AnchorLink v-if="detail.enrollList.length > 0" href="#id_school_enroll" title="投档分数" />
      </Anchor>

      <Anchor v-if="currentTab === 'faculty'" show-ink container=".main" class="school_detail_anchor" >
        <AnchorLink href="#id_name" title="院校信息" />
        <AnchorLink v-if="detail.schoolDetail.faculty" href="#id_school_faculty" title="院系简介" />

        <AnchorLink v-for="(faculty, index) in detail.facultyList" :key="index" :href="'#' + faculty.id" :title="faculty.name" />
      </Anchor>

      <Anchor v-if="currentTab === 'major'" show-ink container=".main" class="school_detail_anchor" >
        <AnchorLink href="#id_name" title="院校信息" />

        <AnchorLink v-for="(major, index) in detail.majorList" :key="index" :href="'#' + major.id" :title="major.name" />
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
            <div v-if="currentTab === 'school'">
              <div class="detail-school-logo">
                <!--
                <Carousel autoplay loop>
                  <CarouselItem v-if="detail.schoolDetail.img1Path"> <img :src="detail.schoolDetail.img1Path"/> </CarouselItem>
                  <CarouselItem v-if="detail.schoolDetail.img2Path"> <img :src="detail.schoolDetail.img2Path"/> </CarouselItem>
                  <CarouselItem v-if="detail.schoolDetail.img3Path"> <img :src="detail.schoolDetail.img3Path"/> </CarouselItem>
                  <CarouselItem v-if="detail.schoolDetail.img4Path"> <img :src="detail.schoolDetail.img4Path"/> </CarouselItem>
                </Carousel>
                -->
                <Row :gutter="32">
                  <Col span="6"><img v-if="detail.schoolDetail.img1Path" :src="detail.schoolDetail.img1Path"/></Col>
                  <Col span="6"><img v-if="detail.schoolDetail.img2Path" :src="detail.schoolDetail.img2Path"/></Col>
                  <Col span="6"><img v-if="detail.schoolDetail.img3Path" :src="detail.schoolDetail.img3Path"/></Col>
                  <Col span="6"><img v-if="detail.schoolDetail.img4Path" :src="detail.schoolDetail.img4Path"/></Col>
                </Row>
              </div>

              <Divider dashed orientation="left" v-if="detail.schoolDetail.describe">院校简介</Divider>
              <div id="id_school_describe" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.describe"/>

              <Divider dashed orientation="left" v-if="detail.schoolDetail.scholarship">奖学金设置及推免名额</Divider>
              <div id="id_school_scholarship" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.scholarship"/>

              <Divider dashed orientation="left" v-if="detail.schoolDetail.life">食宿条件</Divider>
              <div id="id_school_life" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.life"/>

              <Divider dashed orientation="left" v-if="detail.environment">气候条件</Divider>
              <div id="id_school_environment" class="quill-editor ql-container ql-editor" v-html="detail.environment"/>

              <div v-for="(problem, index) in detail.problemList" :key="index">
                <Divider dashed orientation="left">{{problem.problem}}</Divider>
                <div :id="problem.id" class="quill-editor ql-container ql-editor" v-html="problem.answer"/>
              </div>

              <Divider id="id_school_enroll" dashed orientation="left" v-if="detail.enrollList.length > 0">投档分数</Divider>
              <Table v-if="detail.enrollList.length > 0" border :columns="enrollTableColumns"
                     :data="detail.enrollList" stripe style="margin-bottom: 40px;"/>
            </div>
          </TabPane>

          <TabPane label="院系信息" icon="ios-apps" name="faculty">
            <div v-if="currentTab === 'faculty'">
              <div id="id_school_faculty" class="quill-editor ql-container ql-editor" v-html="detail.schoolDetail.faculty"/>

              <div v-for="(faculty, index) in detail.facultyList" :key="index">
                <Divider dashed orientation="left" >{{faculty.name}}</Divider>
                <div :id="faculty.id" class="quill-editor ql-container ql-editor" v-html="faculty.describe"/>
              </div>
            </div>
          </TabPane>

          <TabPane label="专业信息" icon="ios-apps" name="major">
            <div v-if="currentTab === 'major'" v-for="(major, index) in detail.majorList" :key="index">
              <Divider dashed orientation="left" :id="major.id">{{major.name}}</Divider>

              <div v-if="major.featureNames.length > 0">
                <Tag v-for="(feature, fIndex) in major.featureNames" :key="fIndex" color="primary" style="margin-left: 20px;">
                  {{feature}}
                </Tag>
              </div>

              <div style="padding: 12px 15px;">
                <span>
                  <Icon type="ios-bookmark" />
                  归属院系：{{major.facultyName}}
                </span>
                <span style="margin-left: 40px;" v-if="major.majorTwoName">
                  <Icon type="md-leaf" />
                  归属学科：{{major.majorTwoName}}
                </span>
                <span style="margin-left: 40px;" v-if="major.courseType">
                  <Icon type="md-ribbon" />
                  学科类型：{{major.courseType | courseTypeFilter}}
                </span>
                <span style="margin-left: 40px;" v-if="major.degreeType">
                  <Icon type="logo-html5" />
                  学历层次：{{major.degreeType | degreeTypeFilter}}
                </span>
                <span style="margin-left: 40px;" v-if="major.studyLength">
                  <Icon type="logo-google" />
                  学制：{{major.studyLength}} 年
                </span>
                <span style="margin-left: 40px;" v-if="major.money">
                  <Icon type="logo-yen" />
                  学费：{{major.money}}
                </span>
              </div>

              <div v-if="major.course" style="padding: 12px 15px;">
                <Icon type="ios-photos" /> 专业课程： {{major.course}}
              </div>

              <div v-if="major.workDirection" style="padding: 12px 15px;">
                <Icon type="md-reorder" /> 从业方向： {{major.workDirection}}
              </div>

              <div class="quill-editor ql-container ql-editor" v-html="major.describe"/>

              <div v-for="(problem, pIndex) in major.problemList" :key="pIndex">
                <div style="padding: 12px 15px;">
                  <Icon type="ios-school" /> <strong>{{problem.problem}}</strong>
                </div>
                <div class="quill-editor ql-container ql-editor" v-html="problem.answer"/>
              </div>

              <Table v-if="major.enrollList.length > 0" border :columns="majorEnrollTableColumns"
                     :data="major.enrollList" stripe style="margin-bottom: 40px;"/>
            </div>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { detail } from '@/api/ieg/report'
import { save } from '@/api/ieg/log'
import { pca, pcaa } from 'area-data'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from '@/store'

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
  filters: {
    degreeTypeFilter (val) {
      let l = {B: '本科', Z: '专科'}
      return l[val]
    },
    courseTypeFilter (val) {
      let l = {W: '文科', L: '理科', A: '文科/理科'}
      return l[val]
    }
  },
  data () {
    return {
      currentTab: 'school',
      schoolId: null,
      listQuery: {},
      loading: false,
      detail: null,
      enrollTableColumns: [],
      courseType: { W: '文科', L: '理科' },
      degreeType: { B: '本科', Z: '专科' },
      enrollType: { Common: '普通', Art: '艺术', Gym: '体育' },
      majorEnrollTableColumns: []
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
      console.log(data)

      this.detail = data.result
      this.loading = false

      save(this.detail.school.name, store.getters.user.realName).then(data => {
      })
    })

    this.initEnrollTableColumns()
    this.initMajorEnrollTableColumns()
  },
  methods: {
    goBack () {
      this.$router.replace({path: '/report/search', query: {listQuery: this.listQuery}})
    },
    initMajorEnrollTableColumns () {
      this.majorEnrollTableColumns = [
        {title: '年份', key: 'year', tooltip: true},
        {
          title: '类型',
          key: 'type',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'green' } }, this.courseType[params.row.type])
          }
        },
        {title: '最低分', key: 'scoreMin', tooltip: true},
        {title: '计划招收人数', key: 'planNumber', tooltip: true},
        {title: '实际招收人数', key: 'realNumber', tooltip: true}
      ]
    },
    initEnrollTableColumns () {
      this.enrollTableColumns = [
        {title: '年份', key: 'year', tooltip: true},
        {
          title: '学科类型',
          key: 'courseType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'green' } }, this.courseType[params.row.courseType])
          }
        },
        {
          title: '学历类型',
          key: 'degreeType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'cyan' } }, this.degreeType[params.row.degreeType])
          }
        },
        {
          title: '招收类型',
          key: 'enrollType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'purple' } }, this.enrollType[params.row.enrollType])
          }
        },
        {title: '最低分数', key: 'scoreMin', tooltip: true},
        {title: '最高分数', key: 'scoreMax', tooltip: true},
        {title: '人数', key: 'number', tooltip: true}
      ]
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
          height: 200px;
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

    .school_detail_anchor {
      position: fixed;
      right: 30px;
      top: 100px;
      height: calc(100% - 100px);
    }
    .school_detail_anchor > div:nth-child(1) {
      height: 100%;
    }
    .ivu-anchor-wrapper {
      max-height: 100% !important;
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

    .ivu-anchor-link-title {
      width: 100px;
      display: block;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .ivu-divider-dashed:before {
      border-top: 1px solid #17233d;
    }
    .ivu-divider-dashed:after {
      border-top: 1px solid #17233d;
    }
  }
</style>
