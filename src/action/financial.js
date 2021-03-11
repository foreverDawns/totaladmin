// import { integralGainintegralSubsidiary, integralintegralManagement, delIntegralSetting,newUserManagement} from "@/config/api.js"
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
                accountNum: '',
                accountName: '',
                accountPhone: ''
            },
            consumptionArr:[],  //消费
            RechargeArr:[],   //充值 
            getIntegralArr:[], //获得积分


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
        },
        //  充值列表
        RechargeList() {
            console.log('充值列表')
        },
        // 获得积分列表
        getIntegralList() {
            console.log('获得积分列表')
        },
        // 重置
        clearConfigData() {
            console.log('重置')
        },
        // 查询
        queryList(data) {
            console.log(data)
        },
        // 导出功能
        exportExcel(data){
            console.log('导出',data)
        },

        changeModule(val) {
            console.log('切换')
            this.type = val;
            console.log(this.type)
        },
    },

    created() {
        this.initPage();
    },

    mounted() {


    },



}

