import VDistpicker from 'v-distpicker'


// import { fileUpdate } from "@/config/api.js"

export default {
  name: 'goodsClassManageCom',
  data() {
    return {
      detailData: {},
      textAreaCon: '',
    }
  },
  // 接收父页面的值
  props: {
    currentItemData: {
      type: Object,
      default: {}
    },
    moduleFlag: {
      type: Boolean,
      default: false
    },
    onSaveData: {
      type: Function
    },
    styleStatus: {
      type: String
    },
  },

  methods: {
    // 取消提示
    handleClose() {
      this.$emit('onAddCon');
    },

    handleNodeClick(data) {
      console.log(data)
      this.levelName = data.name
      this.detailData.parentId = data.id
    },

  },
  created() {
    this.levelName = ''
  },
  mounted() {
    
  },

  watch: {
    currentItemData(res) {
      console.log(res)
      this.detailData = Object.assign({}, res)
    },


    detailData(res) {
      console.log(res)
    },
  },


  components: {
    VDistpicker,
  }


}
