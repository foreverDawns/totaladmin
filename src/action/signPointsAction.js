import { integralGainintegralSubsidiary, integralintegralManagement, delIntegralSetting,newUserManagement} from "@/config/api.js"
import { startLoading, endLoading } from '../common/util'
import SignPointsCom from '../components/componentsPages/signPointsCom.vue'
export default {
    name: 'signPoints',
    components: {
        SignPointsCom
    },
    data() {
        return {
            listDataArr: [],
            listDataArr2: [],
            addYRConDialogVisible: false,
            totalNum: '0',
            pageIndex: 1,
            pageSize: 10,
            pageIndexTwo: 1,
            pageSizeTwo: 10,

            listTotal: 1,
            type: 1,//1：详情 2.订单 3：评价
            aRDetailJson: {},//储存当前点击item的数据
            titleCon: '',
            aRModuleDialogVisible: false,
            json:{}
        }
    },
    // props: ['changeValue'],
    methods: {
    
        onAddCon() {
            this.aRModuleDialogVisible = !this.aRModuleDialogVisible;
            console.log(this.aRModuleDialogVisible)
        },
        // 时间格式化
        dateFormat(val, format) {
            return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
        },
        
        //  积分管里 当前页  
        pageChange(pageIndex) {
            console.log('当前页',pageIndex)
            this.pageIndex = pageIndex;
            this.getPointsManagementList();
        },
        // 每页多少条
        pageSizeChange(pageSize) {
            console.log( '每页多少条',pageSize)
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getPointsManagementList();
        },
        // 签到明细 分页
        pageChangeTwo(pageIndex) {
            this.pageIndexTwo = pageIndex;


        },
        // 签到明细   每页多少条
        pageSizeChangeTwo(pageSize) {
            this.pageIndexTwo = 1;
            this.pageSizeTwo = pageSize;

        },

        // 初始化数据
        initPage() {
            startLoading()
            Promise.all([this.getPointsDetailsList(), this.getPointsManagementList()]).then(() => {
                endLoading()
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            });
        },
        // 子传父的接收值方法  保存方法
        addARConFunc(data) {
            console.log(data)
            console.log('保存')
            if (!data.signNumber) {
                this.$message({
                    type: 'warning',
                    message: '请输入签到天数！'
                })
                return
            }
            if (!data.levelIntegral) {
                this.$message({
                    type: 'warning',
                    message: '请输入奖励积分！'
                })
                return
            }
            // 保存的方法
            this.newUserManagement(data)

        },
        newUserManagement(data){
            this.json.getAwy='1';
            this.json.levelIntegral=data.levelIntegral;
            this.json.signNumber=data.signNumber;
            newUserManagement(this.json).then(res => {
                endLoading()
                if (res.state === 0) {
                  this.getPointsManagementList()
                  this.onAddCon()
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                }
              }).catch(() => {
                endLoading()
                this.$message({
                  type: 'error',
                  message: '保存失败!'
                });
              })

        },

        // 点击添加或编辑事件
        onChangeModule(data) {
            console.log('详情的值', data)
            this.aRDetailJson = Object.assign({}, data)
            this.onAddCon()
        },
        // 获取签到明细详情
        getPointsDetailsList() {
            integralGainintegralSubsidiary().then(res => {
                this.listDataArr2 = res.data;
                console.log('签到明细详情',this.listDataArr2)

            })
        },
        // 获取积分管理详情
        getPointsManagementList() {
            startLoading()
            integralintegralManagement({
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize,
            }).then(res => {
                endLoading()
                if (res.state == 0) {
                    this.listDataArr = res.data.data;
                    this.listTotal = res.data.count;
                    if (this.listDataArr.length < 1) {
                        this.$message.warning('无签到积分！')
                    }
                } else {
                    this.$message.error('请求失败，请刷新重试！')
                }

            }).catch(() => {
                endLoading()
                this.$message.error('请求失败，请刷新重试！')
            })
        },
        // 积分管理删除
        deleteHHCon(id) {
            this.$confirm('此操作将删除内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                startLoading()
                this.delIntegralSetting({ id: id })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        delIntegralSetting(reqJson) {
            delIntegralSetting(reqJson).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.getPointsManagementList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '删除失败!'
                });
            })
        },



        changeModule(val) {
            console.log('切换')
            this.type = val;
        },
    },

    created() {
        this.initPage()
    },

    mounted() {


    },



}

