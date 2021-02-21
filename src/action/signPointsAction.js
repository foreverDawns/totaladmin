import { integralGainintegralSubsidiary, integralintegralManagement } from "@/config/api.js"
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
            detailsData: '', //详情
            ordersData: '', // 订单
            evaluationData: '',// 评价
            representationData: '',// 申述
            totalNum: '0',
            pageIndex: 1,
            pageSize: 10,
            pageIndexTwo: 1,
            pageSizeTwo: 10,

            listTotal: 1,
            type: 1,//1：详情 2.订单 3：评价

            titleCon: '',
        }
    },
    // props: ['changeValue'],
    methods: {
        // 添加黄河专题内容弹框切换
        addPoints() {
            this.$refs.SignPointsCom.aRModuleDialogVisible = true
        },
        onAddCon() {
            this.addYRConDialogVisible = !this.addYRConDialogVisible
            console.log(this.addYRConDialogVisible)
        },
        // 时间格式化
        dateFormat(val, format) {
            return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
        },
        //获取时间间隔
        onSelectTime(e) {
            this.timeValueOne = e
        },
        // 分页
        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getPointsManagementList();
        },
        // 分页
        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getPointsManagementList();
        },
        // 分页
        pageChangeTwo(pageIndex) {
            this.pageIndexTwo = pageIndex;


        },
        // 分页
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

        getPointsDetailsList() {
            integralGainintegralSubsidiary().then(res => {
                this.listDataArr2 = res.data;
            })
        },
        getPointsManagementList() {
            integralintegralManagement({
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize,
            }).then(res => {
                this.listDataArr = res.data.data;
                this.listTotal = res.data.count;
            })
        },



        changeModule(val) {
            this.type = val;
        },










    },

    created() {

        this.initPage()
    },

    mounted() {


    },



}

