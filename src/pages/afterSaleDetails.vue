<template>
  <div class="orders-details bg-white border-ra-15 min-height-100 p-30">
    <div class="hpc-left-title">
      <div class="hpc-left-title-img">
        <img src="@/assets/images/homeImg/dotsImg.png" alt="">
      </div>
      <div class="hpc-left-title-con fs-16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/afterSale' }">售后管理</el-breadcrumb-item>
          <el-breadcrumb-item>售后信息</el-breadcrumb-item>
          <el-breadcrumb-item>{{!representationFlag ? '详情' : '申述'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="mb-20 m-t-20">
      <div class="my-flex">
        <div class="m-r-10 flex-1">
          <div class="my-flex flex-between">
            <div class="width-200 height-85 text-align-c bg-blue1 flex-l-center flex-j-center border-ra-8">
              <div class="fw-700">
                <div class="color-fff fs-14">111</div>
                <div class="color-fff fs-14">仅退款</div>
              </div>
            </div>
            <div class="width-200 height-85 text-align-c bg-blue1 flex-l-center flex-j-center border-ra-8">
              <div class="fw-700">
                <div class="color-fff fs-14">222</div>
                <div class="color-fff fs-14">退款退货</div>
              </div>
            </div>
            <div class="width-200 height-85 text-align-c bg-blue1 flex-l-center flex-j-center border-ra-8">
              <div class="fw-700">
                <div class="color-fff fs-14">333</div>
                <div class="color-fff fs-14">换货</div>
              </div>
            </div>
          </div>

          <div class="m-t-20 p-15 bg-blue border-ra-8">
            <el-steps :active="4" align-center>
              <el-step title="步骤1"></el-step>
              <el-step title="步骤2"></el-step>
              <el-step title="步骤3"></el-step>
              <el-step title="步骤4"></el-step>
            </el-steps>  
            <div class="m-t-15 fs-13 p-t-10 p-b-10 dividing-line-2">
              <div class="mb-20">
                <div class="m-b-10">倒计时：<span class="red fs-20">2天 19:20:08</span> </div>
                <div class="m-b-10">买家申请退款，请尽快处理，如倒计时前未同意将自动同意买家申请</div>
              </div>
              <div class="m-b-10">用户名：梦里 </div>
              <div class="m-b-10">买家申请退款原因：<span class="fw-700">7天无理由换货</span></div>
              <div class="m-b-10">换货型号：黑色马丁包</div>
              <div class="my-flex flex-between">
                <div class="">退款说明：<span class="fw-700">颜色有偏差</span></div>
                <div class="">2020/01/02 09:50:03</div>
              </div>
            </div>
            <div class="fs-13 p-t-10 p-b-10 dividing-line-2">
              <div class="my-flex flex-between">
                <div class="">同意申请时间</div>
                <div class="">2020/01/02 09:50:03</div>
              </div>
            </div>
            <div class="fs-13 p-t-10 p-b-10 dividing-line-2">
              <div class="my-flex flex-between">
                <div class="">买家填写单号：<span class="fw-700">SF145745547474544</span></div>
                <div class="">2020/01/02 09:50:03</div>
              </div>
            </div>
            <div class="fs-13 p-t-10 p-b-10">
              <div class="my-flex flex-between">
                <div class="">卖家收货并发货：<span class="fw-700">SF147552145557598</span></div>
                <div class="">2020/01/02 09:50:03</div>
              </div>
            </div>
            <div class="my-flex m-t-40 flex-j-center">
              <el-button type="info">取消</el-button>
              <el-button type="primary">同意</el-button>
            </div>
          </div>
          <div class="m-t-20">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
              <thead class="orderC-th">
                <tr style="height: 60px;" class="fs-14 fw-700">
                  <th width="20%">用户名</th>
                  <th width="35%">申请退款原因</th>
                  <th width="15%">退款金额</th>
                  <th width="20%">申请时间</th>
                  <th width="10%">状态</th>
                </tr>
              </thead>
              <tbody class="table-tbody">
                <tr v-for="(item, index) in evaluationDetails" :key="index" class="fs-12">
                  <td class="p-t-10 p-b-10 flex-j-center">
                    <div class="my-flex flex-l-center">
                      <div class="m-r-5 m-l-10">
                        <img class="width-52 d-in-b" :src="item.images" alt="">
                      </div>
                      <div>{{item.productName}}</div>
                    </div>
                  </td>
                  <td>{{ item.danJia }} 元</td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.number }}</td>
                  <td class="red">待审核</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="width-360">
          <div class="bg-blue border-ra-8 fs-13 m-t-105">
            <div class="hpc-left-title my-flex flex-j-center">
              <div class="hpc-left-title-img">
                <img src="@/assets/images/homeImg/dotsImg.png" alt="">
              </div>
              <div class="hpc-left-title-con fs-16">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item class="fs-14">售后信息</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div class="m-t-10 p-10">
              <div class="p-b-15 dividing-line-2">
                <div class="m-b-10">退款类型：仅退款 </div>
                <div class="m-b-10">退款金额：90.00</div>
                <div class="m-b-10">退款原因：7天无理由退货</div>
                <div class="m-b-10">退款编号：AS54163</div>
                <div class="m-b-10">发起时间：2020/01/24 </div>
              </div>
            </div>
            <div class="p-10">
              <div class="p-b-15 dividing-line-2">
                <div class="my-flex flex-l-center m-b-10">
                  <div class="m-r-5 border-ra-6">
                    <img class="width-52 d-in-b" src="../assets/images/goodsImg/goodsImg.png" alt="">
                  </div>
                  <div>这是商品名字</div>
                </div>
                <div class="m-b-10">实付金额：<span class="red">270.00</span> </div>
                <div class="m-b-10">购买数量：3个</div>
              </div>
            </div>
            <div class="m-t-10 p-10">
              <div class="p-b-15">
                <div class="m-b-10">买家信息：梦里 </div>
                <div class="m-b-10">买家手机：12345875620</div>
                <div class="m-b-10">订单编号：AS2657422111456</div>
                <div class="m-b-10">付款时间：2020/01/02 </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>




    </div>
  </div>
</template>

<script src="../action/afterSaleDetailsAction.js"></script>

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