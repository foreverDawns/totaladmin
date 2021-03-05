export default {
    name: 'signPointsCom',
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

    },

    watch: {
        aRDetailJson(res) {
            console.log('编辑展示内容')
            this.ruleForm = Object.assign({}, res)
            console.log(this.ruleForm)
        },

    },

    components: {
    }


}
