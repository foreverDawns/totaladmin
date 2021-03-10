// import VDistpicker from 'v-distpicker'
import { startLoading, endLoading } from '../../common/util'


import { getSupplierInfo, getGoodsInfo, MembersSet } from "@/config/api.js"

export default {
    name: 'integralConsumptionCom',
    data() {
        return {
            ruleForm: {
              startTime: "",
                endTime: '',
                supplierName: '',
                supplierId:"",
                skuId:"",
                skuName: '',
                membersId: '',
                integralMatching: '',
                returnsIntegral: ''
            },
            title: "",

            rules: {
              startTime: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                endTime: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                supplierName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                skuName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                membersId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                integralMatching: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                returnsIntegral: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            },
            shop: [],   //店铺
            product: [],  //产品
            MembersList: [],  //会员等级
            startTimeOptions:{}, 
            endTimeOptions:{},


        }
    },
    // 接收父页面的值
    props: {
        aRDetailJson: {
            type: Object,
            default: {}
        },
        aRModuleDialogVisible: {
            type: Boolean,
            default: false
        },

        addARConFunc: {
            type: Function
        },

    },

    methods: {
        // 限制开始时间
        clickStartTime() {
            this.startTimeOptions.disabledDate = time => {
              if (this.ruleForm.endTime) {
                if (time.getTime() > new Date(this.ruleForm.endTime).getTime()) {
                  return true
                }
                if (time.getTime() < Date.now() - 8.64e7) {
                  return true
                }
              } else {
                if (time.getTime() < Date.now() - 8.64e7) {
                  return true
                }
              }
            }
          },
          // 限制结束时间
          clickEndTime(){
            this.endTimeOptions.disabledDate = time => {
              if (this.ruleForm.startTime) {
                return (
                  time.getTime() > Date.now || time.getTime() < new Date(this.ruleForm.startTime).getTime()
                )
              } else {
                return time.getTime() < Date.now()
              }
            }
          },
    

        skuNamehange($event){
          console.log('产品id',$event)
          console.log('产品name',this.ruleForm.skuName)

          this.ruleForm.skuId=$event
        this.$forceUpdate()
      },

        // 取消提示
        handleClose() {
            this.$emit('onAddCon');
        },
        // 根据商家id获取商品
        onShop($event) {
          console.log('店铺id', $event)
          console.log('店铺name',this.ruleForm.supplierName)
           this.ruleForm.supplierId=$event
            this.ruleForm.skuName = ''
            let id = $event
            startLoading()
            getGoodsInfo({ supplierId: id }).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.product = [];
                    this.product = res.data
                }
            }).catch(() => {
              endLoading()
              this.$message({
                  type: 'error',
                  message: '请求失败，请刷新重试！'
              })
            })

        },


        // 获取店铺信息id和name
        getSupplierInfo() {
            console.log('店铺')
            startLoading()
            getSupplierInfo().then(res => {
              console.log('错了')
                endLoading()
                if (res.state === 0) {
                    console.log('店铺name', res.data)
                    this.shop = res.data
                }
            }).catch(() => {
              endLoading()
              this.$message({
                  type: 'error',
                  message: '请求失败，请刷新重试！'
              })
            })
        },
        //  会员等级下拉
        onMembersList() {
            console.log('会员')
            startLoading()
            MembersSet().then(res => {
                endLoading()
                if (res.state === 0) {
                    this.MembersList = res.data
                    for (let i = 0; i < res.data.length; i++) {
                        if (this.ruleForm.membersId == res.data[i].key) {
                            this.ruleForm.membersId = res.data[i].value
                        }
                    }
                }
            }).catch(() => {
              endLoading()
              this.$message({
                  type: 'error',
                  message: '请求失败，请刷新重试！'
              })
            })

        }
    },
    created() {
        this.getSupplierInfo()
        this.onMembersList()
    },
    mounted() {
    },
    watch: {
        aRDetailJson(res) {
            console.log(res, "aRDetailJson")
            this.ruleForm = Object.assign({}, res)
            this.title = res.titleName
            // console.log(this.ruleForm)
        },

    },

    components: {
    }


}
