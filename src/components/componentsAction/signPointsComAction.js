import VDistpicker from 'v-distpicker'
// import { startLoading, endLoading } from '../../common/util'


// import { integralnewUserManagement } from "@/config/api.js"

export default {
    name: 'parameterManageCom',
    data() {
        return {
            ruleForm: {
                signNumber: "",
                levelIntegral: ''
            },

            rules: {
                levelIntegral: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                signNumber: [{ required: true, message: '请输入内容', trigger: 'blur' },]
            },
            aRModuleDialogVisible: false,
            dialogImageUrl: '',
            yellowRiverFlag: false,
            dialogVisible: false,
            limit: 2,
            limitTwo: 1,
            fileList: [],
            fileListTwo: [],
            detailData: {},
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            deleteValueArr: [],//删除的参数值 id
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
    },
    created() {
        this.deleteValueArr = []
    },
    mounted() {
        // addQuillTitle()
        console.log('detailData', this.detailData)
    },

    watch: {
        aRDetailJson(res) {
            console.log('编辑展示内容')
            console.log(res, "aRDetailJson")
            this.fileList = []
            this.fileListTwo = []
            this.ruleForm = Object.assign({}, res)
            // if (!this.detailData.specValues) {
            //     this.detailData.specValues = []
            // }
            console.log(this.ruleForm)

        },

        detailData(res) {
            console.log(res, "detailData")
        },
    },

    components: {
        VDistpicker,
    }


}
