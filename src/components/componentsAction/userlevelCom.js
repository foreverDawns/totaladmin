// import VDistpicker from 'v-distpicker'
import { startLoading, endLoading } from '../../common/util'


import { MembersSet } from "@/config/api.js"

export default {
    name: 'unerleverlCom',
    data() {
        return {
            ruleForm: {
                consume: "",
                consumeNum: "",
                recharge: "",
                levelSign: "",
            },
            rules: {
                consume: [{ required: true, message: "请输入内容", trigger: "blur" }],
                consumeNum: [
                    { required: true, message: "请输入内容", trigger: "blur" },
                ],
                recharge: [{ required: true, message: "请输入内容", trigger: "blur" }],
                levelSign: [{ required: true, message: "请输入内容", trigger: "blur" }],
            },
            options: [],
            title: "",


            MembersList: [],  //会员等级



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
        //  会员等级下拉
        onMembersList() {
            console.log('会员')
            startLoading()
            MembersSet().then(res => {
                endLoading()
                if (res.state === 0) {
                    this.options = res.data
                    for (let i = 0; i < res.data.length; i++) {
                        if (this.ruleForm.levelSign == res.data[i].key) {
                            this.ruleForm.levelSign = res.data[i].value
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
        this.onMembersList()
    },
    mounted() {
    },
    watch: {
        aRDetailJson(res) {
            console.log(res, "aRDetailJson")
            this.ruleForm = Object.assign({}, res)
            this.title = res.titleName
            console.log(this.ruleForm)
        },

        detailData(res) {
            console.log(res, "detailData")
        },
    },

    components: {
    }
}
