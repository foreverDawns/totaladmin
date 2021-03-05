import { startLoading, endLoading } from "@/common/util";
import { memberList, membersSetmembersSet } from "@/config/api.js"; //memberUpdate
import UnerleverlCom from '../components/componentsPages/userlevelCom.vue'

export default {
    name: "",
    data() {
        return {
            listDataArr: [],
            aRDetailJson: {},
            aRModuleDialogVisible: false,

        };
    },
    methods: {
        // 弹框切换
        onAddCon() {
            this.aRModuleDialogVisible = !this.aRModuleDialogVisible
        },

        // 点击添加或编辑事件
        onChangeModule(data) {
            console.log('详情的值', data)
            if (JSON.stringify(data) == "{}") {

                data.titleName = "积分管理-积分消费-添加配比"
            } else {
                data.titleName = "积分管理-积分消费-编辑配比"
            }
            this.aRDetailJson = Object.assign({}, data)
            this.$refs.integralConsumption.onMembersList();
            this.onAddCon()
        },
        //   会员设置详情
        memberList() {
            startLoading()
            memberList().then(res => {
                console.log(res)
                endLoading()
                if (res.state == 0) {
                    this.listDataArr = res.data
                        .map(item => {
                            if (item.levelSign == 1) {
                                item.dengji = '普通'
                            } else if (item.levelSign == 1) {
                                item.dengji = '黄金'
                            } else {
                                item.dengji = '皇冠'
                            }
                            console.log('数据', item)
                            return item
                        })
                    console.log('111', this.listDataArr)
                    if (res.data.data.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '您还没有用户等级参数！'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请求失败，请刷新重试！'
                        })
                    }
                }
            }).catch(() => {

            })

        },
        // 子组件传入父组件
        addARConFunc(data, options) {
            console.log('保存', data, options)
            if (!data.consume) {
                this.$message({
                    type: 'warning',
                    message: '请输入消费钱数！'
                })
                return
            }
            if (data.consumeNum == undefined) {
                this.$message({
                    type: 'warning',
                    message: '请输入消费天数！'
                })
                return
            }
            if (data.recharge == undefined) {
                this.$message({
                    type: 'warning',
                    message: '请输入充值钱数！'
                })
                return
            }
            if (!data.levelSign) {
                this.$message({
                    type: 'warning',
                    message: '请输入会员等级！'
                })
                return
            }
               
                    for (let i = 0; i < options.length; i++) {
                        if (data.levelSign == options[i].value) {
                            data.levelSign = options[i].key
                            // this.integralintegralMatching(data)
                        }
                    }
                    this.integralintegralMatching(data)
                },
      
      
        integralintegralMatching(data) {
            startLoading();
            membersSetmembersSet(data)
                .then((res) => {
                    endLoading();
                    if (res.state === 0) {
                        this.$message({
                            type: "success",
                            message: "操作成功！",
                        });
                        this.memberList()
                    } else {
                        this.$message({
                            type: "error",
                            message: "请求失败，请刷新重试！",
                        });
                    }
                    this.aRModuleDialogVisible = false;
                })
                .catch(() => {
                    endLoading();
                    this.$message({
                        type: "error",
                        message: "请求失败，请刷新重试！",
                    });
                });

        },

    },
    created() {
        this.memberList()
    },
    mounted() {

    },
    components: {
        UnerleverlCom,
    }

};