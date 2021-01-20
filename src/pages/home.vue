<template>
    <div class="home-page">
        <div class="home-page-header">
            <div class="hph-item">
                <div class="hph-item-img-box">
                    <img src="../assets/images/homeImg/lookNum.png" alt="">
                </div>
                <div class="hph-item-con">
                    <div class="con-one">浏览量</div>
                    <div class="con-two">{{pageViews}}</div>
                </div>
            </div>
            <div class="hph-item">
                <div class="hph-item-img-box">
                    <img src="../assets/images/homeImg/cardNum.png" alt="">
                </div>
                <div class="hph-item-con">
                    <div class="con-one">订单量</div>
                    <div class="con-two">{{orderQuantity}}</div>
                </div>
            </div>
            <div class="hph-item">
                <div class="hph-item-img-box">
                    <img src="../assets/images/homeImg/amountNum.png" alt="">
                </div>
                <div class="hph-item-con">
                    <div class="con-one">总金额</div>
                    <div class="con-two">{{totalAmountData}}</div>
                </div>
            </div>

        </div>
        <div class="home-page-center">
            <!-- left -->
            <div class="home-page-center-left">
                <!-- 代办事项 -->
                <div class="hpc-left-box hide">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">待办事项</div>
                    </div>
                    <div class="todo-box">
                        <div class="todo-item">
                            <div class="todo-item-img">
                                <img src="@/assets/images/homeImg/todoOne.png" alt="" srcset="">
                            </div>
                            <div class="todo-item-con">
                                <div class="todo-item-con-title">
                                    共有<span class="txt-red">30</span>条待处理订单
                                </div>
                                <div class="todo-item-con-con">
                                    商家产品重要的一步，就是为你的产品穿上花了的外套（文案），好的产品描述还可以促进你和客户之间的关系，不仅可提高销售量，还可提高复购率哦~</div>
                            </div>
                            <router-link to="/goodsEdit">
                                <el-button type="primary" class="todo-item-btn">添加商品</el-button>
                            </router-link>
                        </div>
                        <div class="todo-item">
                            <div class="todo-item-img">
                                <img src="@/assets/images/homeImg/todoTwo.png" alt="" srcset="">
                            </div>
                            <div class="todo-item-con">
                                <div class="todo-item-con-title">
                                    共有<span class="txt-red">30</span>条待处理订单
                                </div>
                                <div class="todo-item-con-con">
                                    商家产品重要的一步，就是为你的产品穿上花了的外套（文案），好的产品描述还可以促进你和客户之间的关系，不仅可提高销售量，还可提高复购率哦~</div>
                            </div>
                            <router-link to="/orders">
                                <el-button type="primary" class="todo-item-btn">立即处理</el-button>
                            </router-link>
                        </div>
                        <div class="todo-item">
                            <div class="todo-item-img">
                                <img src="@/assets/images/homeImg/todoThree.png" alt="" srcset="">
                            </div>
                            <div class="todo-item-con">
                                <div class="todo-item-con-title">
                                    共有<span class="txt-red">30</span>条待处理订单
                                </div>
                                <div class="todo-item-con-con">
                                    商家产品重要的一步，就是为你的产品穿上花了的外套（文案），好的产品描述还可以促进你和客户之间的关系，不仅可提高销售量，还可提高复购率哦~</div>
                            </div>
                            <el-button type="primary" class="todo-item-btn">立即处理</el-button>
                        </div>
                    </div>
                </div>
                <!-- 零售额趋势图 -->
                <div class="hpc-left-trend hpc-left-box">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">零售额趋势图</div>
                    </div>
                    <div id="trendBox" :style="{width: '100%', height: '500px'}"></div>
                </div>
                <!-- 商品统计柱状图 -->
                <div class="hpc-left-columnar hpc-left-box">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">商品统计柱状图</div>
                    </div>
                    <div :style="{width: '100%', height: '400px'}" id="histogramBox"></div>
                </div>
            </div>
            <!-- right -->
            <div class="home-page-center-right">
                <!-- 商品零售量统计 -->
                <div class="hpc-right hpc-left-box">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">商品零售量统计</div>
                    </div>
                    <div class="total-sales-box">
                        <div class="total-sales-box-label">商品数量</div>
                        <div class="total-sales-box-num">{{salesVolumeData.sumProductCnt}}件</div>
                        <div class="total-sales-box-time">近7天</div>
                    </div>
                    <!-- 商品零售量统计列表 -->
                    <div class="total-sales-box-list fw-700">
                        <div class="tsbl-item" v-for="(item, index) in salesVolumeData.salesVolumePOS" :key="index">
                            <img class="tsbl-item-img" :src="item.image" alt="">
                            <div class="tsbl-item-cen">
                                <div class="tsbl-item-cen-label">{{item.name}}</div>
                                <div class="tsbl-item-cen-color">{{ item.specList.length > 0 ? `${item.specList[0].key}/${item.specList[0].value}` : '' }}</div>
                            </div>
                            <div class="tsbl-item-num p-r-10 fw-700 flex-l-center">{{item.productCnt}}</div>
                        </div>
                    </div>
                    <!-- 统计列表查看更多 -->
                    <router-link to="/commoditys">
                        <div class="tsbl-item-look-more">查看更多</div>
                    </router-link>
                </div>
                <!-- 用户统计环形图 -->
                <div class="hpc-right hpc-left-box">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">用户统计环形图</div>
                    </div>
                    <div id="userStatisticsBox" :style="{width: '100%', height: '400px'}"></div>
                </div>
                <div class="hpc-right hpc-left-box">
                    <div class="hpc-left-title">
                        <div class="hpc-left-title-img">
                            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
                        </div>
                        <div class="hpc-left-title-con">男女比例圆形状图</div>
                    </div>
                    <div id="maleFemaleRatioBox" :style="{width: '100%', height: '400px'}"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script src="@/action/homeAction.js">

</script>

<style lang="scss" scoped>
    /* home number */
    .home-page {
        margin: 20px;

        .home-page-header {
            display: flex;
            justify-content: space-between;

            .hph-item {
                background: #ccc;
                flex: 1;
                margin-right: 30px;
                border-radius: 15px;
                padding: 15px;
            }

            .hph-item:nth-child(1) {
                background: #5598f9;
            }

            .hph-item:nth-child(2) {
                background: #f79374;
            }

            .hph-item:last-child {
                margin-right: 0px;
                background: #fc92c6;
            }

            .hph-item-img-box {
                text-align: right;
                margin-bottom: 10px;
            }

            .hph-item-img-box img {
                width: 100px;
                height: 80px;
            }

            .hph-item-con {
                font-size: 24px;
                font-weight: 700;
                color: #fff;
            }

            .con-one {}

            .con-two {
                text-indent: 10px;
            }
        }

        /* home center */
        .home-page-center {
            /* left */
            display: flex;
            margin-top: 20px;

            /* 代办事项 */
            .hpc-left-box {
                padding: 15px;
                box-sizing: border-box;
                background: #fff;
                border-radius: 15px;
                margin-bottom: 20px;

                .todo-box {}

                .todo-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    padding: 15px 0px 10px;
                }

                .todo-item-img {
                    width: 35px;
                    height: 35px;
                    margin-right: 20px;
                }

                .todo-item-img img {
                    width: 100%;
                    height: 100%;
                }

                .todo-item-con {
                    margin-right: 5px;
                    flex: 1;

                    .todo-item-con-title {
                        font-weight: 700;
                        font-style: normal;
                        font-size: 18px;
                    }

                    .todo-item-con-con {
                        font-weight: 700;
                        font-style: normal;
                        font-size: 14px;
                        color: #666666;
                        line-height: 18px;
                    }
                }

                .todo-item-btn {
                    width: 100px;
                    height: 35px;
                }

            }

            .home-page-center-left {
                flex: 8;
                margin-right: 30px;

                /* 零售额趋势图 */
                .hpc-left-trend {}

                .hpc-left-columnar {}

            }

            /* right */
            .home-page-center-right {
                flex: 4;

                .hpc-right {
                    background: #fff;
                    border-radius: 15px;

                    .total-sales-box {
                        display: flex;
                        justify-content: space-between;
                        text-align: center;
                        border-bottom: 2px solid #f5f7fa;
                        padding: 10px 0 20px;
                        font-weight: 700;
                        align-items: flex-end;

                        .total-sales-box-label {
                            font-style: normal;
                            font-size: 14px;
                            color: #666666;
                        }

                        .total-sales-box-num {
                            font-style: normal;
                            font-size: 36px;
                        }

                        .total-sales-box-time {
                            font-style: normal;
                            font-size: 14px;
                            color: #666666;
                        }
                    }

                    /* 商品零售量统计统计列表 */
                    .total-sales-box-list {
                        padding-top: 20px;
                        max-height: 400px;
                        overflow-y: scroll;
                    }

                    .tsbl-item {
                        display: flex;
                        justify-content: space-between;
                        /* font-weight: 700; */
                        font-style: normal;
                        font-size: 14px;
                        color: #666666;
                        margin-bottom: 15px;
                    }

                    .tsbl-item:last-child {
                        margin-bottom: 0;
                    }

                    .tsbl-item-img {
                        width: 70px;
                        height: 70px;
                        margin-right: 10px;
                    }

                    .tsbl-item-cen {
                        flex: 1;
                        margin-right: 10px;
                    }

                    .tsbl-item-cen-label {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    .tsbl-item-cen-color {
                        font-style: normal;
                        font-size: 14px;
                        color: #999999;
                        margin-top: 5px;
                    }

                    .tsbl-item-num {}

                    .tsbl-item-look-more {
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        font-weight: 400;
                        font-style: normal;
                        font-size: 13px;
                        margin-top: 15px;
                        border-top: 2px solid #f5f7fa;
                    }

                }

                .sss {}
            }

        }

    }
</style>