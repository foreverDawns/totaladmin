// this.$route.params.id

// import { checkUser } from "@/config/api.js"

export default {
  name: 'goodsClass',
  data() {
    return {
      goodsClassArr: [//商品类别列表
        {id:1,className: '水果',goodsNum: 123, content: '水果'},
        {id:2,className: '水果1',goodsNum: 456, content: '水果1'},
        {id:3,className: '水果2',goodsNum: 789, content: '水果2'},
        {id:4,className: '水果3',goodsNum: 159, content: '水果3'},
        {id:5,className: '水果4',goodsNum: 753, content: '水果4'},
        {id:6,className: '水果5',goodsNum: 852, content: '水果5'},
        {id:7,className: '水果6',goodsNum: 654, content: '水果6'},
      ],
      inClassBoxVal: '水果6' // 添加分类的值
    }
  },
  // props: ['changeValue'],
  methods: {
    // 添加分类
    addClass() {
      const that = this
      this.$prompt('', '分类添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        inputPlaceholder:'您想添加什么分类？',
        customClass:'inStockBox',
        inputValue: this.inClassBoxVal,
      }).then(({ value }) => {
        const hasFlag = that.goodsClassArr.filter(item => item.className === value)
        console.log(hasFlag.length)

        if (hasFlag.length > 0) {
          this.$message({
            type: 'error',
            message: `${value} 分类已存在！`
          });
        } else {
          this.$message({
            type: 'success',
            message: `${value} 分类添加成功！`
          });
        }
        this.inClassBoxVal = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    // 测试
    look(){
      console.log(this.inClassBoxVal)
    }

  },

  watch: {
    inClassBoxVal(val){
      console.log(val)
    }
  },

  created() {

  },
  mounted() {
    console.log('goodsClass')
    // console.log(this.$route.params.id)
    
  },

 
}
