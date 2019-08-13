<template>
  <div ref="dom" class="charts chart-bar" />
</template>

<script>
import echarts from 'echarts'
import tdTheme from '@/components/layout/charts/style/theme.json'
import { onEvent, offEvent } from '@/utils/common'

echarts.registerTheme('tdTheme', tdTheme)

export default {
  name: 'ChartBar',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  watch: {
    value (val) {
      this.resize()
    }
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    /**
     * 初始化EChart
     */
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      onEvent(window, 'resize', this.resize)

      this.init()
    })
  },
  methods: {
    /**
     * 初始化柱状图
     */
    init () {
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        legend: {
          selectedMode: 'single',
          data: ['总分', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: this.value.recordDate,
          splitLine: {show: false}
        },
        yAxis: { type: 'value', splitLine: {show: false} },
        series: [
          { name: '总分', data: this.value.totalScore, type: 'line' },
          { name: '语文', data: this.value.yuwenScore, type: 'line' },
          { name: '数学', data: this.value.shuxuScore, type: 'line' },
          { name: '英语', data: this.value.yingyuScore, type: 'line' },
          { name: '物理', data: this.value.wuliScore, type: 'line' },
          { name: '化学', data: this.value.huaxueScore, type: 'line' },
          { name: '生物', data: this.value.shengwuScore, type: 'line' },
          { name: '历史', data: this.value.lishiScore, type: 'line' },
          { name: '地理', data: this.value.diliScore, type: 'line' },
          { name: '政治', data: this.value.zhengzhiScore, type: 'line' }
        ]
      }

      this.dom.setOption(option)
    },
    /**
     * 当窗口变化或重新赋值后调用
     */
    resize () {
      this.init()
      this.dom.resize()
    }
  },
  beforeDestroy () {
    offEvent(window, 'resize', this.resize)
  }
}
</script>
