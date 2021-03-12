// import VDistpicker from 'v-distpicker'

import { startLoading, endLoading } from '../../common/util'
import { sysBlindBoxgetPrize } from "@/config/api.js"

export default {
    name: 'InvitePointsCom',
    data() {
        return {
            ruleForm: {
                inviteNum: "",
                integralNum: '',
                probability: '',
                validHour: "",
                zhoubianIds: '',
                quanbaoIds: '',
                quanbaoMenpiaoIds: '',
                shibaoIds: '',
                giftIds: '',
                jingquMenpiaoIds: "",
            },
            gailv:'',
            options: [],
            jinianpin: [],
            juanbao:[],
            menjuanbao:[],
            shibai:[],
            lipin:[],
            mianmenpiao:[],
            probabilityList:[],
            rules: {
                inviteNum: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                integralNum: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                // probability: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                validHour: [{ required: true, message: '请输入内容', trigger: 'blur' },]
            },
            title: '',
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
        listData: {
            type:   Array,
            default: []
        },

    },

    methods: {
        onTest($event) {
            console.log($event)
        },
        // 取消提示
        handleClose() {
            this.$emit('onAddCon');
        },
        // 限制概率  @blur
        probabilityChange($event){
            console.log($event)
            let probabilityList= this.probabilityList
            let N=0;
             for( var i=0; i<probabilityList.length; i++){
               N += probabilityList[i].probability
            }
            if( this.ruleForm.id){
                console.log('编辑')
                N=N-Number(this.gailv)
            }
            if(N>=100){
                this.$message({
                    type: 'warning',
                    message: '已添加概率已超过100%'
                })
                this.ruleForm.probability=''
                return
            }
            let M=100-N
            if(this.ruleForm.probability>M){
                this.$message({
                    type: 'warning',
                    message: '概率不能超过'+M+'%'
                })
                this.ruleForm.probability=''
                return
            }
            
          
        },
        // 获取奖励列表
        sysBlindBoxgetPrize() {
            startLoading()
            sysBlindBoxgetPrize().then(res => {
                endLoading()
                if (res.state === 0) {
                    this.jinianpin=[],
                    this.juanbao=[],
                    this.menjuanbao=[],
                    this.shibai=[],
                    this.lipin=[],
                    this.mianmenpiao=[],
                    this.options = res.data
                    this.options.map(item => {
                        item.label = item.name + ""
                        item.value = item.id + ''
                        if (item.type == 2) {
                            this.jinianpin.push(item)
                        }
                        if (item.type == 3) {
                            this.juanbao.push(item)
                        }
                        if (item.type == 4) {
                            this.menjuanbao.push(item)
                        }
                        if (item.type == 1) {
                            this.shibai.push(item)
                        }
                        if (item.type == 6) {
                            this.lipin.push(item)
                        }
                        if (item.type == 5) {
                            this.mianmenpiao.push(item)
                        }
                       
                    })
               
                    console.log('shibao1', this.juanbao)
                    if (this.options.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '您还没有奖励列表参数！'
                        })
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
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
        this.sysBlindBoxgetPrize()

    },
    mounted() {

    },
    watch: {
        aRDetailJson(res) {
            console.log('子组件', res)
            console.log('列表值', this.jinianpin)
            this.ruleForm = Object.assign({}, res)
            this.gailv=this.ruleForm.probability 
            if (this.ruleForm.zhoubianIds) { this.ruleForm.zhoubianIds = this.ruleForm.zhoubianIds.split(',') }
            if (this.ruleForm.quanbaoIds) { this.ruleForm.quanbaoIds = this.ruleForm.quanbaoIds.split(',') }
            if (this.ruleForm.quanbaoMenpiaoIds) { this.ruleForm.quanbaoMenpiaoIds = this.ruleForm.quanbaoMenpiaoIds.split(',') }
            if (this.ruleForm.shibaoIds) { this.ruleForm.shibaoIds = this.ruleForm.shibaoIds.split(',') }
            if (this.ruleForm.giftIds) { this.ruleForm.giftIds = this.ruleForm.giftIds.split(',') }
            if (this.ruleForm.jingquMenpiaoIds) { this.ruleForm.jingquMenpiaoIds = this.ruleForm.jingquMenpiaoIds.split(',') }

            this.title = res.titleName
            console.log(this.title)
        },
        listData(res){
            console.log('列表',res)
            this.probabilityList = Object.assign([], res)
        }

    },

    components: {

    }


}
