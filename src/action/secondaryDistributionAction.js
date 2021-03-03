import { startLoading, endLoading } from '../common/util'
import { newUserManagement } from "@/config/api.js"
import SecondaryDistributionCom from '../components/componentsPages/secondaryDistributionCom.vue'
export default {
    name: 'secondaryDistribution',
    data() {
        return {
            aRModuleDialogVisible: false,
            listDataArr: [],
            aRDetailJson: {},
            supplierId: '1',
            pageIndex: 1,
            pageSize: 10,
            listTotal: 0,
            oneorderSn:"",
            twoorderSn:"",
        }
    },

    methods: {
  
        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.specList();
        },

        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.specList();
        },
        // 时间格式化
        dateFormat(val) {
            return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        // 弹框切换
        onAddCon() {
            this.aRModuleDialogVisible = !this.aRModuleDialogVisible
            console.log('开关',this.aRModuleDialogVisible)
        },
        // 添加Ar内容
        editARCon(id) {
            if (id) {
                console.log('111')
            } else {
                this.aRDetailJson = Object.assign({}, {})
                this.onAddCon()
            }
        },
               // 点击添加或编辑事件
               onChangeModule(data) {
                console.log('详情的值', data)
                this.aRDetailJson = Object.assign({}, data)
                this.onAddCon()
            },

        // 获取列表
        specList() {
            startLoading()
            newUserManagement({
                "getAwy": 6,
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize,
            }).then(res => {
                endLoading()
                if (res.state == 0) {
                    this.listDataArr = res.data.data;
                    this.listTotal = res.data.count;
                    if (this.listDataArr.length < 1) {
                        this.$message.warning('无积分！')
                    }
                } else {
                    this.$message.error('请求失败，请刷新重试！')
                }

            }).catch(() => {
                endLoading()
                this.$message.error('请求失败，请刷新重试！')
            })
        },
        // 一级分销配比保存
        oneDistribution() {
            
         },

        // 一级分销配比保存
        twoDistribution() {

        }
    },


    created() {
        this.specList()
    },
    mounted() {

    },
    components: {
        SecondaryDistributionCom,
    }


}
