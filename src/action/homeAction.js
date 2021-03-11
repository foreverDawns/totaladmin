import { startLoading, endLoading } from '../common/util'
import { orderVolume, totalAmount, salesVolume, qiDaysIncome } from "@/config/api.js"
import { Promise } from 'core-js'

export default {
  name: 'home',
  data() {
    return {
      isCollapse: false,
      pageViews: '588', //浏览量
      orderQuantity: '0', //订单量
      totalAmountData: '0', //总金额
      salesVolumeData: '', //近7天零售量统计
      qiDaysIncomeData: '', //近7天收入统计
      supplierId: '1', //店铺id
    }
  },
  methods: {
    // 页面初始化
    initPageData() {
      startLoading()
      Promise.all([this.orderVolume(), this.totalAmount(), this.salesVolume(), this.qiDaysIncome()]).then(() => {
        endLoading()
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      });
    },
    // 获取订单总数
    orderVolume() {
      return new Promise((resolve, reject) => {
        orderVolume({supplierId: this.supplierId}).then(res => {
          if (res.state === 0) {
            this.orderQuantity = res.data
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取订单量失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取订单量失败，请刷新重试！'
          })
          reject()
        })
      });
    },
    // 获取总金额
    totalAmount() {
      return new Promise((resolve, reject) => {
        totalAmount({supplierId: this.supplierId}).then(res => {
          if (res.state === 0) {
            this.totalAmountData = res.data
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取总金额失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取总金额失败，请刷新重试！'
          })
          reject()
        })
      });
    },
    // 近7天零售量统计
    salesVolume() {
      return new Promise((resolve, reject) => {
        salesVolume({supplierId: this.supplierId}).then(res => {
          if (res.state === 0) {
            this.salesVolumeData = res.data
            console.log(this.salesVolumeData)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取近7天零售量统计失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取近7天零售量统计失败，请刷新重试！'
          })
          reject()
        })
      });
    },
    // 近7天收入统计
    qiDaysIncome() {
      return new Promise((resolve, reject) => {
        qiDaysIncome({supplierId: this.supplierId}).then(res => {
          if (res.state === 0) {
            let time = []
            let data = []
            // this.qiDaysIncomeData = res.data
            res.data.map(item => {
              time.push(item.statDate)
              data.push(item.total)
            })
            this.trendEcharts(time, data)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取近7天收入统计失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取近7天收入统计失败，请刷新重试！'
          })
          reject()
        })
      });
    },

    // 零售额趋势图
    trendEcharts(time, data) {
      let trendEchartsDoc = this.$echarts.init(document.getElementById('trendBox'))
      // 指定图表的配置项和数据
      let trendOption = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: time
        },
        yAxis: {
          type: 'value'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 80,
          end: 2
        }, {
          start: 10,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            data: data,
            name: '零售额',
            type: 'line',
            smooth: false,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#1890ff'
            },
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#b9ddff'
              }, {
                offset: 1,
                color: '#b9ddff'
              }])
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      trendEchartsDoc.setOption(trendOption);
    },
    // 商品统计柱状图
    histogramEcharts() {
      const histogramEchartsDoc = this.$echarts.init(document.getElementById('histogramBox'));
      // 使用刚指定的配置项和数据显示图表。
      let histogramOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['总商品数', '总商品数', '总商品数', '总商品数', '总商品数', '总商品数', '总商品数']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 20000, 150, 80, 70, 110, 130],
          type: 'bar',
          color: '#3aa1ff',
          barWidth: 30
        }]
      }
      histogramEchartsDoc.setOption(histogramOption);
    },
    // 用户统计环形图
    userStatisticsEcharts() {
      const userStatisticsEchartsDoc = this.$echarts.init(document.getElementById('userStatisticsBox'));
      // 使用刚指定的配置项和数据显示图表。
      let userStatisticsOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          data: ['19岁以上', '29岁以上', '39岁以上', '49岁以上', '59岁以上']
        },
        series: [
          {
            name: '年龄范围',
            type: 'pie',
            radius: ['50%', '70%'],
            data: [
              { value: 335, name: '19岁以上' },
              { value: 310, name: '29岁以上' },
              { value: 234, name: '39岁以上' },
              { value: 234, name: '49岁以上' },
              { value: 234, name: '59岁以上' }
            ]
          }
        ]
      }
      userStatisticsEchartsDoc.setOption(userStatisticsOption);
    },
    // 男女比例圆形状图
    maleFemaleRatioEcharts() {
      const maleFemaleRatioEchartsDoc = this.$echarts.init(document.getElementById('maleFemaleRatioBox'));
      // 使用刚指定的配置项和数据显示图表。
      let maleFemaleRatioOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          data: ['男', '女', '未知']
        },
        series: [
          {
            name: '男女比例',
            type: 'pie',
            // radius: ['50%', '70%'],
            data: [
              { value: 335, name: '男' },
              { value: 310, name: '女' },
              { value: 234, name: '未知' }
            ]
          }
        ]
      }
      maleFemaleRatioEchartsDoc.setOption(maleFemaleRatioOption);
    }
  },
  created() {
    // this.initPageData()
  },
  mounted() {
    // 商品统计柱状图
    this.histogramEcharts()
    // 用户统计环形图
    this.userStatisticsEcharts()
    // 男女比例圆形状图
    this.maleFemaleRatioEcharts()
    
  }

}
