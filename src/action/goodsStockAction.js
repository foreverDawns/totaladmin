// this.$route.params.id

// import { checkUser } from "@/config/api.js"

export default {
  name: 'goodsStock',
  data() {
    return {
      inStockBoxVal: 100,
    }
  },
  // props: ['changeValue'],
  methods: {
    dataECharts() {
      let dataEchartsDoc = this.$echarts.init(document.getElementById('dataECharts'))
      let dataOption = {
        title: {
          text: '全年库存同期比',

        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['销售', '库存'],
          bottom: 10
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow',
              color: 'black'
            },
            axisTick: {
              alignWithLabel: true
            }

          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '水量',
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick: {
              alignWithLabel: true
            }
          }

        ],
        series: [
          {
            name: '销售',
            type: 'bar',
            data: [210, 419, 710, 2312, 2516, 7617, 13516, 16212, 3216, 2010, 614, 313],
            itemStyle: {
              color: "#3aa1ff"
            },
            barGap:'0%'
          },
          {
            name: '库存',
            type: 'bar',
            data: [216, 519, 910, 2614, 2817, 7017, 17516, 18212, 4817, 1818, 610, 213],
            itemStyle: {
              color: "#4ecb73",
              barGap:'0%'
            },
          }
        ],
        grid: {
          left: '0%',
          right: '0%',
          containLabel: true,
        },
      }

      // 使用刚指定的配置项和数据显示图表。
      dataEchartsDoc.setOption(dataOption);
    },
    // 添加库存
    addStuck() {
      this.$prompt('', '库存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        inputPlaceholder:'您想添加多少库存进去？',
        customClass:'inStockBox',
        inputValue: this.inStockBoxVal,
      }).then(({ value }) => {

          this.$message({
            type: 'success',
            message: `${value} 库存添加成功！`
        })
        this.inStockBoxVal = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
  },

  watch: {
    inStockBoxVal(val){
      console.log(val)
    }
  },

  created() {

  },
  mounted() {
    console.log('goodsStock')
    console.log('库存', this.$route.params.id)
    // 数据图
    this.dataECharts();
  },


}
