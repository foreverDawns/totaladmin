<template>
  <div class="orders-details bg-white border-ra-15 min-height-100 p-30" v-if="ordersDetailsData">
    <div class="hpc-left-title">
      <div class="hpc-left-title-img">
        <img src="@/assets/images/homeImg/dotsImg.png" alt="">
      </div>
      <div class="hpc-left-title-con fs-16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name: 'ordersDetails', params:{id:`${orderId}`}}">订单详情</el-breadcrumb-item>
          <el-breadcrumb-item>确认发货</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- Orders Details status -->
    <!-- <div class="orders-status-box p-20">
      <div class="orders-status fw-700 fs-14 mb-10">当前订单状态： <span class="fs-14 blue">{{ orderStatus[ordersDetailsData.orderStatus] || '订单被删除' }}</span></div>
      <div class="orders-status-time fw-700 fs-13 color-999 mb-10">若平台在<span class="red"> 71:35:16 </span>内发货，系统将自动取消订单
      </div>
      <div class="orders-status-btn-box">
        <el-button class="" l-button type="primary" :disabled="ordersDetailsData.orderStatus == 0">发货</el-button>
        <router-link class="m-l-15 wh-50" :to="{name: 'goodsStock', params:{id:`${orderId}`}}">
          <el-button class="" l-button type="primary">发货</el-button>
        </router-link> -->
        <!-- <el-button class="" disabled="">修改发货地址</el-button> -->
        <!-- <el-button class="">取消订单</el-button> -->
      <!-- </div>
    </div> -->
    <!-- Orders details  -->
    <div class="m-t-20">
      <!-- <el-switch style="display: block" v-model="switchFlag" active-color="#409EFF" inactive-color="#409EFF"
        class="fs-20" active-text="收货与物流信息" inactive-text="订单详情">
      </el-switch> -->
      <div class="m-t-20">
        <div class="orders-info p-20">
          <div class="mb-20">
            <div class="info-title my-flex mb-10">
              <span class="info-title-label m-r-10"></span>
              <span class="info-title-text fw-700 fs-14">确认交易详情</span>
            </div>
            <div class="my-flex m-b-10 color-999 fs-14 fw-700 p-l-20">
              <div class="m-r-40">订单编号： {{ordersDetailsData[0].orderSn}}</div>
              <div class="m-r-40">订单类型： 普通订单</div>
            </div>
            <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
              <div class="m-r-40">创建时间： {{dateFormat(ordersDetailsData[0].createTime)}} </div>
              <div class="m-r-40">付款时间： {{dateFormat(ordersDetailsData[0].payTime)}}</div>
            </div>
            <!-- <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
              <div class="m-r-40">交易号：{{ordersDetailsData[0].paySn}}</div>
              <div class="m-r-40">支付方式： {{ paymentMethod[ordersDetailsData[0].paymentMethod] || '无' }}</div>
              <div class="m-r-40">支付流水： {{ordersDetailsData[0].paySn}}</div>
            </div> -->
          </div>
          <div class="mb-20 order-buyer-list-box m-t-80" v-if="ordersDetailsData[0].orderGoodsPOS.length > 0">
            <!-- list title -->
            <div class="my-flex order-buyer-list fw-700 fs-14 flex-h-center">
              <div class="order-buyer-list-one">商品信息</div>
              <div class="order-buyer-list-two">规格</div>
              <div class="order-buyer-list-three">单价</div>
              <div class="order-buyer-list-four">数量</div>
              <div class="order-buyer-list-five">商品总价</div>
            </div>
            <div class="order-buyer-list-info my-flex flex-l-center fs-13 dividing-line-2" v-for="(item, index) in ordersDetailsData[0].orderGoodsPOS" :key="index">
              <div class="order-buyer-list-info-one flex-l-center flex-center">
                <div class="wh-60 m-r-10 p-t-10 p-b-10">
                  <img :src="item.image" alt="" srcset="">
                </div>
                <div class="">
                  <div class="">{{ item.name }}</div>
                  <div class=""></div>
                </div>
              </div>
              <div class="order-buyer-list-info-two">{{ `${item.specList[0].key}/${item.specList[0].value}` }}</div>
              <div class="order-buyer-list-info-three"><span class="red">￥</span>{{ item.productPrice }} 元</div>
              <div class="order-buyer-list-info-four">{{item.productCnt}}</div>
              <div class="order-buyer-list-info-five"><span class="red">￥</span>{{ item.productTotal }} 元</div>
            </div>
          </div>
          <div class="m-t-20 text-align-r m-r-30">
            <div class="fs-14">实收款： <span class="fw-700 fs-20 red">￥{{ ordersDetailsData[0].paymentMoney }}</span></div>
            <div class="fs-12 m-t-10">含运费：{{ ordersDetailsData[0].districtMoney }}</div>
          </div>
          <div class="mb-20"></div>
          <div class="order-buyer-box mb-20">
            <div class="info-title my-flex mb-10">
              <span class="info-title-label m-r-10"></span>
              <span class="info-title-text fw-700 fs-14">确认收货信息</span>
            </div>
            <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
              <div class="m-r-40">用户名：{{ordersDetailsData[0].shippingUser || '无'}}</div>
              <div class="m-r-40">手机号码：{{ ordersDetailsData[0].phoneNo || '无' }}</div>
              <div class="m-r-40">所在地区: {{ordersDetailsData[0].address || '无'}}</div>
            </div>
          </div>
          <div class=" mb-20">
            <div class="info-title my-flex mb-10">
              <span class="info-title-label m-r-10"></span>
              <span class="info-title-text fw-700 fs-14">选择物流服务</span>
            </div>
            <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
              <el-select v-model="logisticsValue" clearable placeholder="请选择物流">
                <el-option
                  v-for="item in logisticsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="fs-16 fw-700 text-align-c">
            <el-button type="primary" :disabled="!logisticsValue" @click= "shippingOrder">发货</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/action/ordersSendAction.js"></script>

<style lang="scss" scoped>
  /* 状态部分 */
  .orders-status-box {
    background: #fff7ec;
    border: 2px solid #fde5c5;
    border-radius: 8px;

    .orders-status {}

    .orders-status-time {}

    .orders-status-btn-box {}
  }

  /* 订单详情部分 */
  .orders-info {
    border: 2px solid #7ba8fe;
    border-radius: 8px;
  }

  .order-buyer-box {
    border-bottom: 3px dashed #ccc;
  }

  .info-title {
    height: 20px;
  }

  .info-title-label {
    width: 6px;
    height: 20px;
    background: rgba(243, 171, 71, 1);
    border-radius: 6px;
  }

  .info-title-text {}

  /* 订单列表 */
  .order-buyer-list-box {

    box-shadow: 0 0 15px 10px #f7f7f7;

    .order-buyer-list {
      height: 40px;
      background: #fafafa;
      text-align: center;
    }

    .order-buyer-list-one {
      width: 300px;
    }

    .order-buyer-list-two {
      width: 200px;
    }

    .order-buyer-list-three {
      width: 200px;
    }

    .order-buyer-list-four {
      width: 200px;
    }

    .order-buyer-list-five {
      flex: 1;
    }

    .order-buyer-list-info {
      background: #fff;
      text-align: center;
    }

    .order-buyer-list-info-one {
      width: 300px;
      justify-content: center;
    }

    .order-buyer-list-info-two {
      width: 200px;
    }

    .order-buyer-list-info-three {
      width: 200px;
    }

    .order-buyer-list-info-four {
      width: 200px;
    }

    .order-buyer-list-info-five {
      flex: 1;
    }

  }
</style>