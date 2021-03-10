import { startLoading, endLoading } from '../common/util'
import { integralMatchingList, integralMatchingAdd, delMatchingInfo, inupdateStatus, inupdateRecommend } from "@/config/api.js"
import IntegralConsumptionCom from '../components/componentsPages/integralConsumptionCom.vue'
export default {
    name: 'integralConsumption',
    data() {
        return {
            aRModuleDialogVisible: false,
            listDataArr: [],
            aRDetailJson: {},
            supplierId: '1',
            pageIndex: 1,
            pageSize: 10,
            listTotal: 0,
            oneorderSn: "1",
            twoorderSn: "100",
            recommend:"",
            status:"",

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
        dateFormat(beginTime, endTime) {
            var dateBegin = new Date(beginTime);
            var dateEnd = new Date(endTime);
            var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            var leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
            //计算相差分钟数
            // var leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
            // var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
            //计算相差秒数
            // var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
            // var seconds = Math.round(leave3 / 1000);
            var time = dayDiff + "天" + hours + "小时";
            return time
        },

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

        // 获取列表
        specList() {
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            integralMatchingList(reqData).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.listDataArr = res.data.data.map(item => {
                        // item.status == 1 ? item.status = true : item.status = false;
                        // this.getGoodsInfo(item.skuId)
                        // console.log('数据', item)
                        return item
                    })

                    console.log('列表', this.listDataArr)
                    this.listTotal = res.data.count
                    if (this.listDataArr.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '您还没有积分消费参数！'
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
        // 子传父的接收值方法  保存方法
        addARConFunc(data,shop,product,MembersList) {
            console.log('传进来的值', data,shop,product,MembersList)
            for( let i=0; i<shop.length; i++){
                if( data.supplierId ==shop[i].id){
                    data.supplierName=shop[i].name
                }

            }
            for( let i=0; i<product.length; i++){
                if( data.skuId ==product[i].skuId){
                    data.skuName=product[i].name
                }

            }
            for( let i=0; i<MembersList.length; i++){
                if( data.membersId ==MembersList[i].value){
                    data.membersId=MembersList[i].key
                }

            }
            if (!data.startTime) {
                this.$message({
                    type: 'warning',
                    message: '请输入活动期限！'
                })
                return
            }
            if (!data.endTime) {
                this.$message({
                    type: 'warning',
                    message: '请输入结束时间！'
                })
                return
            }
            if (!data.supplierName) {
                this.$message({
                    type: 'warning',
                    message: '请输入活动店铺！'
                })
                return
            }
            if (!data.skuName) {
                this.$message({
                    type: 'warning',
                    message: '请输入活动产品！'
                })
                return
            }
            if (!data.membersId) {
                this.$message({
                    type: 'warning',
                    message: '请输入用户等级！'
                })
                return
            }
            if (!data.integralMatching) {
                this.$message({
                    type: 'warning',
                    message: '请输入积分配比！'
                })
                return
            }
            if (!data.returnsIntegral) {
                this.$message({
                    type: 'warning',
                    message: '请输入返还积分！'
                })
                return
            }
            if(data.id){
                console.log('编辑')
                this.integralMatchingAdd(data)

            }else{
                data.id = null
                this.integralMatchingAdd(data)
            }
         
        },
        integralMatchingAdd(data) {
            startLoading()
            console.log('保存的参数', data)
            integralMatchingAdd(data).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.onAddCon()
                    this.$message({
                        type: 'success',
                        message: '操作成功！'
                    })
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
        // 推荐 、 不推荐
        recommendChange($event, id){
            console.log($event, id)
            if ($event === 2) { //1 推荐 2 不推荐
                // 提示
                this.$confirm('此操作设置为不推荐, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.inupdateRecommend( $event,id)
                }).catch(() => {
                  this.specList()
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              } else {
                // 不需要提示
                this.inupdateRecommend( $event,id)
              }
        },
        // 推荐 不推荐 是否请求
        inupdateRecommend( status,id){
            startLoading()
            inupdateRecommend({ "id": id, 'status': status }).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.$message({
                        type: 'success',
                        message: '更新成功！'
                    })
                } else {
                    this.specList()
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.specList()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            })
        },

           // 禁用启用请求
           whetherToEnable( status,id) {
               console.log(status,id)
            if (status === 2) { //1 启用 2 禁用
                // 提示
                this.$confirm('此操作将禁用当前状态, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.inupdateStatus( status,id)
                }).catch(() => {
                  this.specList()
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              } else {
                // 不需要提示
                this.inupdateStatus( status,id)
              }
            
        },
        // 是否启用
        inupdateStatus( status,id){
            startLoading()
            inupdateStatus({ "id": id, 'status': status }).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.$message({
                        type: 'success',
                        message: '更新成功！'
                    })
                } else {
                    this.specList()
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.specList()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            })
        },
        // 删除方法
        deleteHHCon(id) {
            this.$confirm('此操作将删除内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                startLoading()
                this.delMatchingInfo({ id: id })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        delMatchingInfo(reqJson) {
            delMatchingInfo(reqJson).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
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




    },

    created() {
        this.specList()
    },
    mounted() {

    },
    components: {
        IntegralConsumptionCom,
    }


}
