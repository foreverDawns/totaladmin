// import { checkUser } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭

export default {
  name: 'afterSaleDetails',
  data() {
    return {
      totalNum: 100,
      switchFlag: false, //切换 switch 的值
      ordersId: '', //订单 id
      representationFlag: false,
      representationContent: '申述内容',
      evaluationDetails: [
        {
          id: 1,
          "productName": '这是一个商品名字',
          "images": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg",
          "danJia": 10,
          "number": 10,
          "zhongJia": 100,
        },
        {
          id: 2,
          "productName": '这是一个商品名字',
          "images": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg",
          "danJia": 10,
          "number": 10,
          "zhongJia": 100,
        },
        {
          id: 3,
          "productName": '这是一个商品名字',
          "images": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg",
          "danJia": 10,
          "number": 10,
          "zhongJia": 100,
        },
      ]
    }
  },
  // 接收父页面的值
  props: {
    // orderItem: {
    //   type: Array,
    //   default: []
    // },
  },

  methods: {
     // 时间格式化
     dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
  },

  created() {

  },

  mounted() {
    console.log('afterSaleDetails')
    console.log(this.$route.params.id)
    this.ordersId = this.$route.params.id
  },

  watch: {
    // checked:function(val) {
    //   console.log(val)
    // }
  },

  components: {
    
  },
}
