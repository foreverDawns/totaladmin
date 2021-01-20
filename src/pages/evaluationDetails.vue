<template>
  <div class="orders-details bg-white border-ra-15 min-height-100 p-30" v-if='evaluationDetails'>
    <div class="hpc-left-title">
      <div class="hpc-left-title-img">
        <img src="@/assets/images/homeImg/dotsImg.png" alt="">
      </div>
      <div class="hpc-left-title-con fs-16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/evaluation' }">评价管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{!representationFlag ? '详情' : '申述'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="mb-20 m-t-20">
      <div class="info-title my-flex mb-10">
        <span class="info-title-label m-r-10"></span>
        <span class="info-title-text fw-700 fs-14">订单信息</span>
      </div>
      <div class="">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
          <thead class="orderC-th">
            <tr style="height: 60px;" class="fs-14 fw-700">
              <th width="25%">商品信息</th>
              <th width="25%">单价</th>
              <th width="25%">数量</th>
              <th width="25%">商品总价</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr class="fs-12">
              <td class="p-t-10 p-b-10 flex-j-center">
                <div class="my-flex flex-l-center">
                  <div class="m-r-5">
                    <img class="width-52 d-in-b" :src="evaluationDetails.images" alt="">
                  </div>
                  <div>{{evaluationDetails.productName}}</div>
                </div>
              </td>
              <td>{{ evaluationDetails.productPrice }}</td>
              <td>{{ evaluationDetails.productCnt }}</td>
              <td class="red">{{ evaluationDetails.orderMoney }} 元</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="order-buyer-box mb-20">
      <div class="info-title my-flex mb-10">
        <span class="info-title-label m-r-10"></span>
        <span class="info-title-text fw-700 fs-14">买家信息</span>
      </div>
      <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
        <div class="m-r-40">用户名：{{ evaluationDetails.userName }}</div>
        <div class="m-r-40">手机号码： {{evaluationDetails.phone}}</div>
        <div class="m-r-40">所在地区: 浙江 杭州</div>
        <div class="m-r-40">订单编号: {{evaluationDetails.orderSn}}</div>
        <div class="m-r-40">付款时间: {{evaluationDetails.createTime ? dateFormat(evaluationDetails.createTime) : '--'}}</div>
      </div>
    </div>

    <div class=" mb-20">
      <div class="info-title my-flex mb-10">
        <span class="info-title-label m-r-10"></span>
        <span class="info-title-text fw-700 fs-14">评价内容</span>
      </div>
      <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
        <div class="m-r-40">商品描述：{{evaluationDetails.conformityGoods}}星</div>
        <div class="m-r-40">物流服务：{{evaluationDetails.courierSpeed}}星</div>
        <div class="m-r-40">快递服务：{{evaluationDetails.courierService}}星</div>
        <div class="m-r-40">服务态度：{{evaluationDetails.storeService}}星</div>
      </div>
      <div class="my-flex m-b-30 color-999 fs-14 fw-700 p-l-20">
        <div class="m-r-40">商品评价：{{evaluationDetails.content}}</div>
      </div>
    </div>
    <div class="m-t-60 flex-j-center" v-if="!representationFlag">
      <el-button class="width-100" type="primary" @click="onRepresentationFlag">申述</el-button>
    </div>
    <div v-else>
      <div class="hpc-left-title flex-j-center">
        <div class="hpc-left-title-img">
          <img src="@/assets/images/homeImg/dotsImg.png" alt="">
        </div>
        <div class="hpc-left-title-con fs-16">
          申诉内容
        </div>
      </div>
      <div class="">
        <el-input type="textarea" :rows="5" maxlength="120" minlength="10" show-word-limit placeholder="请输入申述内容" v-model="representationContent">
        </el-input>
        <div class="fs-12 m-t-10"><span class="red">注：</span> 至少10字描述</div>
      </div>
      <div class="m-t-60 flex-j-center">
        <el-button class="width-100" type="primary" :disabled="representationContent.length < 10 ? true : false" @click="evaluationSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script src="../action/evaluationDetailsAction.js"></script>

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