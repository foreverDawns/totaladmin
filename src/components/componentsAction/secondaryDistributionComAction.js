
import { Supplier, SkuName,} from "@/config/api.js"
import { startLoading, endLoading } from '../../common/util'
export default {
    name: 'secondaryDistributionCom',
    data() {
        return {
            ruleForm: {
                productId:'',
                supplierId:"",
                supplierName: "",
                productName: "",
                distributionOne: "",
                distributionTwo: "",
            },
            title: "",
            shop: [],
            product:[],
            rules: {
                supplierName: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                productName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                distributionOne: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                distributionTwo: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            }
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
            type: Function,
        },

    },

    methods: {
        // 获取店铺
        getSupplierInfo() {
            console.log('店铺')
            startLoading()
            Supplier().then(res => {
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
            // 获取 活动产品
        onShop($event){
            console.log($event)
            this.ruleForm.productName = ''
            this.ruleForm.supplierId = $event
            console.log('店铺id', $event)
            let id = $event
            startLoading()
            SkuName({ supplierId: id }).then(res => {
                endLoading()
                if (res.state === 0) {
                    console.log('店铺name', res.data)
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
        productName($event){
            console.log($event)
            this.ruleForm.productId = $event
            this.$forceUpdate()
        },
        // 取消提示
        handleClose() {
            this.$emit('onAddCon');
        },
     
    },
    created() {
        this.getSupplierInfo()
    },
    mounted() {
    },

    watch: {
        aRDetailJson(res) {
            console.log(res, "aRDetailJson")
            this.ruleForm = Object.assign({}, res)
            this.title = res.titleName
        },
    },

 


}
