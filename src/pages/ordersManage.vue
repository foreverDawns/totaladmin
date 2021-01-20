<template>
  <div class="order-manage-box bg-white border-ra-15 min-height-100">
    <!-- tabs -->
    <div class="p-30">
      <template>
        <el-tabs class="" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="all">
            <span slot="label" class="fs-16 fw-700">全部 <span class="blue fs-16">{{ordersTotal}}</span></span>
            <div class="">
              <OrdersItem :orderItem="ordersData" :checkoutFlg='false'></OrdersItem>
            </div>
          </el-tab-pane>
          <el-tab-pane name="toBeProcessed" selected="true">
            <span slot="label" class="fs-16 fw-700">待发货 <span class="blue fs-16">456</span></span>
            <div class="" v-if="ordersData.length > 0">
              <OrdersItem :orderItem="ordersData.slice(1,2)" :checkoutFlg='false'></OrdersItem>
            </div>
          </el-tab-pane>
          <el-tab-pane name="shipped">
            <span slot="label" class="fs-16 fw-700">已发货 <span class="blue fs-16">321</span></span>
            <div class="" v-if="ordersData.length > 0">
              <OrdersItem :orderItem="ordersData" :checkoutFlg='false'></OrdersItem>
            </div>
          </el-tab-pane>
          <el-tab-pane name="completed">
            <span slot="label" class="fs-16 fw-700">已完成 <span class="blue fs-16">654</span></span>
            <div class="" v-if="ordersData.length > 0">
              <OrdersItem :orderItem="ordersData" :checkoutFlg='false'></OrdersItem>
            </div>
          </el-tab-pane>
          <el-tab-pane name="closed">
            <span slot="label" class="fs-16 fw-700">已关闭 <span class="blue fs-16">999</span></span>
            <div class="" v-if="ordersData.length > 0">
              <OrdersItem :orderItem="ordersData" :checkoutFlg='false'></OrdersItem>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 分页 -->
    <div class="fenye" v-if="ordersData.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ordersTotal">
      </el-pagination>
    </div>
  <div style="height: 60px;"></div>
  </div>

</template>


<script src="@/action/ordersManageAction.js"></script>


<style lang="scss" scoped>

</style>