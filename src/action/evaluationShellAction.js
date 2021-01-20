// import { checkUser } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
export default {
  name: 'evaluationShell',
  data() {
    return {
      changeValue: '',
      currentPage: '/'//当前地址
    }
  },
  methods: {
    // changeClassStyle() {
    //   console.log(this.changeValue )
    //   this.changeValue = !this.changeValue
    // }
  },
  created() {

  },
  mounted() {
    console.log('ordersShell')
    console.log(this.$route)
    this.currentPage = this.$route
  },

  watch: {
    $route(to, from) {
      console.log('地址变化地址变化地址变化地址变化地址变化',to, from);
    }
  }

  // comments: {
  //   GoodsManage,
  // }
}
