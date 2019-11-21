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
              <Button type="success" style="width: 150px;">检 索</Button>
            </FormItem>
          </Form>
        </Row>

        <Divider dashed />

        <Row class="content">

          <div class="info">
            <div class="info-base">
              <img src="../../../assets/images/layout/logo.png">
              <div style="float: right; width: calc(100% - 80px);">
                <div style="height: 40px; line-height: 40px; font-size: 20px;">
                  <span style="color: #17233d;">沈阳理工大学</span>
                  <span style="margin-left: 40px; color: #2d8cf0;">
                    <Icon type="md-star-outline" style="margin-bottom: 5px;"/>
                    211
                  </span>

                  <span style="float: right; margin-left: 40px; font-size: 17px;">
                    <Icon type="ios-pin-outline" />
                    辽宁省 &nbsp;&nbsp; 沈阳市 &nbsp;&nbsp; 浑南新区 &nbsp;&nbsp; 因卡中路106号
                  </span>
                </div>
                <div style="height: 20px; line-height: 20px; font-size: 14px;">
                  <span > <Icon type="ios-medal-outline" /> 信息管理与信息系统 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 经济学 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 计算机科学与技术 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 国际贸易 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 物理 </span>
                </div>
              </div>
            </div>

            <div class="info-desc">
              学校于1959年5月始建于安徽合肥，时名为安徽财贸学院。1961年迁址素有“珍珠城”美誉的淮河流域中心城市蚌埠，校址设在交通路。1983年，校本部迁至龙湖西校区，先后隶属于中华全国供销合作总社、商业部、国内贸易部。2000年2月，国务院决定，安徽财贸学院实行中央与地方共建，以安徽省政府管理为主。2004年5月，经教育部批准，学校更名为安徽财经大学；同年9月，学校迁入龙湖东校区。
              学校占地总面积983450平方米，固定资产总值171259.85万元。图书总藏量329.52万册，其中纸本馆藏214.83万册，电子馆藏114.69万册。另有在线电子期刊1.6万种，其中中文期刊1万种，外文期刊0.6万种，在线数据库44个。设有12个学院，1个教学部，3个省级研究机构，35个校级研究机构；67个本科专业，2个第二学士学位专业；8个一级学科硕士学位授权点，36个二级学科硕士学位授权点，14个专业硕士学位授权点；拥有4个省部级重点研究基地，8个省级重点学科，1个省级一流学科,5个国家级特色专业，14个省级特色专业，1个国家级专业综合改革试点项目，1个国家级校企合作实践教育基地。
              学校现有在职教职工1398人，其中专任教师1080人，具有高级职称教师502人，硕士博士化率达81.85%。在校普通本科生21099人，硕士研究生1884人。自2010年起，学校进入一本招生，录取分数线在省属高校中一直名列前茅。
            </div>
          </div>

          <div class="info">
            <div class="info-base">
              <img src="../../../assets/logo.png">
              <div style="float: right; width: calc(100% - 80px);">
                <div style="height: 40px; line-height: 40px; font-size: 20px;">
                  <span style="color: #17233d;">清华大学</span>
                  <span style="margin-left: 40px; color: #2d8cf0;">
                    <Icon type="md-star-outline" style="margin-bottom: 5px;"/>
                    985
                  </span>
                  <span style="margin-left: 40px; color: #2d8cf0;">
                    <Icon type="md-star-outline" style="margin-bottom: 5px;"/>
                    211
                  </span>

                  <span style="float: right; margin-left: 40px; font-size: 17px;">
                    <Icon type="ios-pin-outline" />
                    北京市 &nbsp;&nbsp; 市区 &nbsp;&nbsp; 清华路250号
                  </span>
                </div>
                <div style="height: 20px; line-height: 20px; font-size: 14px;">
                  <span > <Icon type="ios-medal-outline" /> 信息管理与信息系统 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 经济学 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 计算机科学与技术 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 国际贸易 </span>
                  <span style="margin-left: 40px;"> <Icon type="ios-medal-outline" /> 物理 </span>
                </div>
              </div>
            </div>

            <div class="info-desc">
              学校于1959年5月始建于安徽合肥，时名为安徽财贸学院。1961年迁址素有“珍珠城”美誉的淮河流域中心城市蚌埠，校址设在交通路。1983年，校本部迁至龙湖西校区，先后隶属于中华全国供销合作总社、商业部、国内贸易部。2000年2月，国务院决定，安徽财贸学院实行中央与地方共建，以安徽省政府管理为主。2004年5月，经教育部批准，学校更名为安徽财经大学；同年9月，学校迁入龙湖东校区。
              学校占地总面积983450平方米，固定资产总值171259.85万元。图书总藏量329.52万册，其中纸本馆藏214.83万册，电子馆藏114.69万册。另有在线电子期刊1.6万种，其中中文期刊1万种，外文期刊0.6万种，在线数据库44个。设有12个学院，1个教学部，3个省级研究机构，35个校级研究机构；67个本科专业，2个第二学士学位专业；8个一级学科硕士学位授权点，36个二级学科硕士学位授权点，14个专业硕士学位授权点；拥有4个省部级重点研究基地，8个省级重点学科，1个省级一流学科,5个国家级特色专业，14个省级特色专业，1个国家级专业综合改革试点项目，1个国家级校企合作实践教育基地。
              学校现有在职教职工1398人，其中专任教师1080人，具有高级职称教师502人，硕士博士化率达81.85%。在校普通本科生21099人，硕士研究生1884人。自2010年起，学校进入一本招生，录取分数线在省属高校中一直名列前茅。
            </div>
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

export default {
  name: 'ReportSearch',
  computed: {
    ...mapGetters(['website'])
  },
  data () {
    return {
      sizeOpts: [5],
      listQuery: {
        major: '',
        name: '',
        area: [],
        current: 1,
        size: 5,
        total: 0
      }
    }
  },
  methods: {
    initList () {},
    goBack () {
      this.$router.replace('/guide')
    }
  }
}
</script>
<style lang="scss">
  .report-search{
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
      height: calc(100% - 190px) !important;
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
