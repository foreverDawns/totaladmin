<template>
  <div class="order-shipping-box bg-white border-ra-15 min-height-100">
    <div class="order-shipping-header my-flex fw-700 p-l-60 p-r-60">
      <div class="">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link color-fff fs-16 fw-700">
            全选方式<i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              今日订单
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              昨日订单
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              所以订单
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              重置
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="color-fff m-l-30">选择了 {{selectValueArr.length}} 个产品</div>
      <div class="flex-1 text-align-r">
        <el-tooltip effect="dark" class="wh-50 ship-btn" content="发货" placement="top">
          <el-button @click='onShip'>
            <img src="../assets/images/ordersImg/orderShipImgOne.png" alt="" srcset="">
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="p-30">
      <OrdersItem :orderItem="ordersData" @updatedOrderSelectData="updatedOrderSelectData" :checkoutFlg='true'></OrdersItem>
    </div>
    <div class="">
      <!-- 分页 -->
      <div class="fenye" v-if="ordersData.length > 0">
        <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ordersTotal">
        </el-pagination>
      </div>
      <div style="height: 60px;"></div>
    </div>
  </div>
</template>

<script src="@/action/ordersBulkShippingAction.js"></script>

<style lang="scss" scoped>
  /* 当前组件顶部导航 */
  .order-shipping-header {
    height: 90px;
    align-items: center;
    background: #4890f7;
    border-radius: 15px 15px 0 0;


    .el-button {
      padding: 0px;
      border-radius: 50%;
      outline: none;
      background: none;
      border: none;
      margin-left: 0;
    }

    .el-button:hover {
      background: #e2e4ea;
    }

  }
</style>