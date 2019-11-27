<template>
  <Layout v-layoutIn class="report-search">
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
        <Row class="search">
          <Form ref="searchForm" :model="listQuery" :label-width="80" inline>
            <FormItem label="院校地址">
              <al-selector v-model="listQuery.area" level="2" data-type="code" class="al-selector" />
            </FormItem>
            <FormItem label="院校名称">
              <Input type="text" v-model.trim="listQuery.name" :maxlength="200" clearable placeholder="多院校请用空格分离"/>
            </FormItem>
            <FormItem label="专业名称">
              <Input type="text" v-model.trim="listQuery.major" :maxlength="200" clearable placeholder="多院校请用空格分离"/>
            </FormItem>
            <FormItem :label-width="0">
              <Button type="success" style="width: 150px;" @click="searchList">检 索</Button>
            </FormItem>
          </Form>
        </Row>

        <Divider dashed />

        <Row class="content">
          <Spin size="large" fix v-if="listLoading"/>

          <div class="info" v-if="listData.length > 0" v-for="(d, index) in listData" :key="index">
            <div class="info-base">
              <img v-if="d.logo" :src="d.logo">
              <img v-else src="../../../assets/logo.png">
              <div style="float: right; width: calc(100% - 80px);">
                <div style="height: 40px; line-height: 40px; font-size: 20px;">
                  <a style="color: #2d8cf0;">{{d.name}}</a>
                  <span style="margin-left: 40px; color: #2d8cf0;" v-for="(f, i) in d.featureNames" :key="i">
                    <Icon type="md-star-outline" style="margin-bottom: 5px;"/>
                    {{f}}
                  </span>

                  <span style="float: right; margin-left: 40px; font-size: 17px;">
                    <Icon type="ios-pin-outline" />
                    {{provinceArea(d)}} &nbsp;&nbsp; {{cityArea(d)}} &nbsp;&nbsp; {{areaArea(d)}} &nbsp;&nbsp; {{d.areaDetail}}
                  </span>
                </div>
                <div style="height: 20px; line-height: 20px; font-size: 14px; overflow: hidden;">
                  <span v-for="(m, mi) in d.majorNames" :key="mi" style="margin-right: 40px;">
                    <Icon type="ios-medal-outline" />
                    {{m}}
                  </span>
                </div>
              </div>
            </div>

            <div class="info-desc" v-html="d.describe" />
          </div>

          <div v-if="listData.length <= 0" style="line-height: 200px; font-size: 17px; text-align: center;">
            未匹配到院校信息
          </div>

        </Row>
        <Row>
          <CPage v-model="listQuery" @on-list="initList" :sizeOpts="sizeOpts" ref="iegPage"/>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { list } from '@/api/ieg/report'
import { pca, pcaa } from 'area-data'

export default {
  name: 'ReportSearch',
  computed: {
    ...mapGetters(['website']),
    provinceArea (d) {
      return function (d) {
        if (!this.$CV.isEmpty(d.areaProvince)) {
          return pca['86'][d.areaProvince]
        } else {
          return ''
        }
      }
    },
    cityArea (d) {
      return function (d) {
        if (!this.$CV.isEmpty(d.areaProvince) && !this.$CV.isEmpty(d.areaCity)) {
          return pca[d.areaProvince][d.areaCity]
        } else {
          return ''
        }
      }
    },
    areaArea (d) {
      return function (d) {
        if (!this.$CV.isEmpty(d.areaProvince) && !this.$CV.isEmpty(d.areaCity) && !this.$CV.isEmpty(d.areaArea)) {
          return pcaa[d.areaCity][d.areaArea]
        } else {
          return ''
        }
      }
    }
  },
  data () {
    return {
      listLoading: false,
      sizeOpts: [5],
      listQuery: {
        major: '',
        name: '',
        area: [],
        current: 1,
        size: 5,
        total: 0
      },
      listData: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.listLoading = true

      list(this.listQuery).then(data => {
        this.listData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    searchList () {
      this.listQuery.current = 1
      this.initList()
    },
    goBack () {
      this.$router.replace('/guide')
    }
  }
}
</script>
<style lang="scss">
  .report-search{
    .ivu-divider-horizontal{
      margin: 5px 0;
    }
    .ivu-form-item {
      margin-bottom: 15px;
    }
    .main {
      height: calc(100% - 60px) !important;
    }
    .search {
      margin-top: 20px;

      .al-selector {
        width: 300px;
      }
    }

    .content {
      height: calc(100% - 140px) !important;
      overflow-y: auto;

      .info {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e8e8;

        .info-base {
          height: 60px;
          margin-bottom: 10px;

          img {
            float: left;
            width: 60px;
            height: 60px;
          }
        }

        .info-desc {
          height: 45px;
          font-size: 14px;
          text-indent: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
