import VDistpicker from 'v-distpicker'



// import { fileUpdate } from "@/config/api.js"

export default {
    name: 'secondaryDistributionCom',
    data() {
        return {
            ruleForm: {
                name: ""
            },
            rules: [],
            aRModuleDialogVisible: false,
         
            
        }
    },
    // 接收父页面的值
    props: {
        aRDetailJson: {
            type: Object,
            // default: {}
        },
        aRModuleDialogVisible: {
            type: Boolean,
            // default: false
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
      
    },
    mounted() {
        // addQuillTitle()
        console.log('detailData', this.detailData)
    },

    watch: {
        aRDetailJson(res) {
            console.log(res, "aRDetailJson")
            this.detailData = Object.assign({}, res)
       

        },
    },

    components: {
        VDistpicker,
    }


}
