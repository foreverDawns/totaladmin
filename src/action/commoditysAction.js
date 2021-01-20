// import { checkUser } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
export default {
  name: 'commoditys',
  data() {
    return {
      // isCollapse: false,
      changeValue: true,//改变产品列表展示样式
    }
  },
  methods: {
    // onChangeTabs(index) {
    //   this.goodsCurrentPage = index
    //   console.log(index, this.goodsCurrentPage)
    // },

    changeClassStyle() {
      console.log(this.changeValue )
      this.changeValue = !this.changeValue
    }
  },
  created() {

  },
  mounted() {
    console.log('commoditys')
  },

  // comments: {
  //   GoodsManage,
  // }
}
