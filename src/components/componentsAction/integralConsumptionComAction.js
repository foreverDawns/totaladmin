// import VDistpicker from 'v-distpicker'
import { startLoading, endLoading } from '../../common/util'


import { getSupplierInfo, getGoodsInfo } from "@/config/api.js"

export default {
    name: 'parameterManageCom',
    data() {
        return {
            ruleForm: {
                createTime: "",
                endTime: '',
                supplierId: '',
                skuId: '',
                membersId: '',
                integralMatching: '',
                returnsIntegral: ''
            },

            rules: {
                createTime: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                endTime: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                supplierId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                skuId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                membersId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                integralMatching: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                returnsIntegral: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            },
            shop:[],   //店铺
            product:[],  //产品
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
        // 取消提示
        handleClose() {
            this.$emit('onAddCon');
        },
        // 根据商家id获取商品
        onShop($event){
            this.ruleForm.skuName=''
            console.log('店铺id',$event)
            let id=$event
            startLoading()
            getGoodsInfo({supplierId:id}).then(res => {
                endLoading()
                if (res.state === 0) {
                    console.log('店铺name',res.data)
                    this.product=[];
                    this.product=res.data
                } 
            }).catch(() => {
            })

        },
          
       
         // 获取店铺信息id和name
         getSupplierInfo(){
             console.log('店铺')
             startLoading()
             getSupplierInfo().then(res => {
                 endLoading()
                 if (res.state === 0) {
                     console.log('店铺name',res.data)
                     this.shop=res.data
                 } 
             }).catch(() => {
             })
         },
    },
    created() {
        this.getSupplierInfo()
    },
    mounted() {
    },
    watch: {
        aRDetailJson(res) {
            console.log('编辑')
            console.log(res, "aRDetailJson")
            this.ruleForm = Object.assign({}, res)
            console.log(this.ruleForm)
        },

        detailData(res) {
            console.log(res, "detailData")
        },
    },

    components: {
    }


}
