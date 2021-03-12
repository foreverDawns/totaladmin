import { getIntegralConsumption, getIntegralRecharge, getIntegralRecord, getSupplierInfo } from "@/config/api.js"
import { startLoading, endLoading } from '../common/util'
export default {
    name: 'financial',
    data() {
        return {

            totalNum: '0',
            pageIndex: 1,
            pageSize: 10,
            pageIndexTwo: 1,
            pageSizeTwo: 10,
            pageIndexThree: 1,
            pageSizeThree: 10,
            listTotal: 1,
            type: 1,//1：消费  2：充值  3：获得积分
            ruleForm: {
                arNumber: '',
                nickName: '',
                orderSn: '',
                supplierId: '',
                supplierName: "",
                topUpOrdersn: "",
                integralWay: ""
            },
            consumptionArr: [],  //消费
            RechargeArr: [],   //充值 
            getIntegralArr: [], //获得积分
            shop: [],
            grawayShop: []


        }
    },
    methods: {
        // 时间格式化
        dateFormat(val, format) {
            return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
        },

        //  消费 当前页  
        pageChange(pageIndex) {
            console.log('当前页', pageIndex)
            this.pageIndex = pageIndex;
            this.consumptionList();
        },
        // 每页多少条
        pageSizeChange(pageSize) {
            console.log('每页多少条', pageSize)
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.consumptionList();
        },
        // 充值 当前页
        pageChangeTwo(pageIndex) {
            this.pageIndexTwo = pageIndex;
            this.RechargeList()
        },
        // 充值   每页多少条
        pageSizeChangeTwo(pageSize) {
            this.pageIndexTwo = 1;
            this.pageSizeTwo = pageSize;
            this.RechargeList()
        },
        //获得积分 当前页
        pageChangeThree(pageIndex) {
            this.pageIndexThree = pageIndex;
            this.getIntegralList()
        },
        // 获得积分   每页多少条
        pageSizeChangeThree(pageSize) {
            this.pageIndexThree = 1;
            this.pageIndexThree = pageSize;
            this.getIntegralList()
        },

        // 初始化数据
        initPage() {
            startLoading()
            Promise.all([this.consumptionList(), this.RechargeList(), this.getIntegralList()]).then(() => {
                endLoading()
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            });
        },
        // 消费列表
        consumptionList() {
            console.log('消费列表')
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            getIntegralConsumption(reqData).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.consumptionArr = res.data.data
                    this.listTotal = res.data.count
                    console.log('消费列表', this.consumptionArr)
                    if (this.consumptionArr.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '暂无用户积分消费记录列表！'
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
        },
        //  充值列表
        RechargeList() {
            // console.log('充值列表')
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            getIntegralRecharge(reqData).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.RechargeArr = res.data.data
                    this.listTotal = res.data.count
                    console.log('充值列表', this.RechargeArr)
                    if (this.RechargeArr.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '暂无用户充值积分列表！'
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
        },
        // 获得积分列表
        getIntegralList() {
            console.log('获得积分列表')
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            getIntegralRecord(reqData).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.getIntegralArr = res.data.data
                    this.listTotal = res.data.count
                    console.log('获得积分列表', this.getIntegralArr)
                    if (this.getIntegralArr.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '暂无用户获取积分记录列表'
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
        },
        // 消费店铺下拉
        getSupplierInfo() {
            startLoading()
            getSupplierInfo().then(res => {
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
        
              // 获取积分方式下拉
              getGrawy() {
                startLoading()
                getSupplierInfo().then(res => {
                    endLoading()
                    if (res.state === 0) {
                        console.log('店铺name', res.data)
                        this.grawayShop = res.data
                    }
                }).catch(() => {
                    endLoading()
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                })
            },
        onShop($event) {
            console.log($event)
            this.ruleForm.supplierId = $event
        },
        // 重置
        clearConfigData() {
            this.ruleForm = []
        },
        // 查询
        queryList(data) {
            console.log(data)
        },
        // 导出功能
        exportExcel(data) {
            console.log('导出', data)
        },

        changeModule(val) {
            console.log('切换')
            this.type = val;
            console.log(this.type)
            this.ruleForm = []
        },
    },

    created() {
        this.initPage();
        this.getSupplierInfo()
        this.getGrawy()
    },

    mounted() {


    },



}

