<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">商城管理-商城列表-详情</div>
    <div class="m-b-20">
      <div class="my-flex flex-between width-500 mb-20 fw-700">
        <div @click="changeModule(1)"
          :class="[type == '1' ? 'bg-blue1' : '' , 'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue']">
          <div class=""></div>
          <div class="color-fff">商品信息 ({{goodsTotalNum || 0}})</div>
        </div>
        <div @click="changeModule(2)"
          :class="[type == '2' ? 'bg-blue1' : '' , 'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue']">
          <div class=""></div>
          <div class="color-fff">订单信息 ({{detailsData.orderNum}})</div>
        </div>
        <div @click="changeModule(3)"
          :class="[type == '3' ? 'bg-blue1' : '' , 'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue']">
          <div class=""></div>
          <div class="color-fff">评价信息 ({{detailsData.commentNum}})</div>
        </div>
      </div>
      <div class="bg-568 p-10 border-ra-8">
        <div class="m-b-10">
          <div class="hpc-left-title">
            <div class="hpc-left-title-img">
              <img src="@/assets/images/homeImg/dotsImg.png" alt="">
            </div>
            <div class="hpc-left-title-con">{{titleCon}}</div>
          </div>
        </div>
        <div class="" v-if="type == 1 && goodsList">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead class="orderC-th">
              <tr style="height: 40px;" class="fs-13">
                <th width="5%">序号</th>
                <th width="35%">商品图片</th>
                <th width="15%">商品名称</th>
                <th width="10%">商品价格</th>
                <th width="10%">所属分类</th>
                <th width="10%">商品库存</th>
                <th width="15%">销售量</th>
                <!-- <th width="20%">操作</th> -->
                <!-- <th width="20%" class="blue fw-700" @click="onAddCon()">
                  + 添加商家
                </th> -->
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="(item, index) in goodsList" :key="index" class="fs-12">
                <td>{{ index + 1 }}</td>
                <td class="">
                  <div class="order-img m-t-10 m-b-10"><img :src="item.images.split(',')[0]" /></div>
                </td>
                <td class="">{{ item.name }}</td>
                <td class="">{{ item.price }}</td>
                <td class="">{{ item.category3Name }}</td>
                <td class="">{{ item.num }}</td>
                <td class="">{{ item.saleNum }}</td>
                <!-- <td class="p-t-10 p-b-10">
                  <el-button
                    :type="item.isMarketable == 0 ? 'warning' : 'danger' "
                    round
                    size="mini"
                    class="m-r-10"
                    @click="onPublishGoods(item.id, item.isMarketable)"
                  >
                    {{ item.isMarketable == 1 ? "下架" : "上架 " }}</el-button
                  >
                  <router-link
                    :to="{
                      name: 'merchantDetails',
                      params: { id: item.id, type: '1' },
                    }"
                  >
                    <el-button type="primary" round size="mini">删除</el-button>
                  </router-link>
                </td> -->
              </tr>
            </tbody>
          </table>
          <!-- <div class="my-flex m-b-10">
            <div class="color-999 fs-12 flex-1">商家名称：<span
                class="color-000">{{detailsData.sellerInfo.supplierName}}</span></div>
            <div class="color-999 fs-12 flex-1">联系方式：<span
                class="color-000">{{detailsData.sellerInfo.phoneNumber}}</span></div>
            <div class="color-999 fs-12 flex-1">商家账号：<span
                class="color-000">{{detailsData.sellerInfo.userPassWord.split(',')[0]}}</span></div>
            <div class="color-999 fs-12 flex-1">商家密码：<span
                class="color-000">{{detailsData.sellerInfo.userPassWord.split(',')[1]}}</span></div>
          </div>
          <div class="my-flex m-b-10 p-b-50">
            <div class="color-999 fs-12 flex-1 my-flex">商家头像：
              <img :src="detailsData.sellerInfo.logo" class="width-100">
            </div>
            <div class="color-999 fs-12 flex-1 my-flex">营业执照：
              <img :src="detailsData.sellerInfo.description" class="width-80" alt="营业执照">
            </div>
            <div class="color-999 fs-12 flex-1"></div>
            <div class="color-999 fs-12 flex-1"></div>
          </div> -->
        </div>

        <div class="p-l-50" v-if="type == 2 && ordersData">
          <el-tabs class="" v-model="orderActiveName" @tab-click="handleClick">
            <el-tab-pane name="0">
              <span slot="label" class="fs-14 fw-700">全部 <span class="blue fs-16">{{ordersData.allNum}}</span></span>
              <div class="" v-if="ordersData">
                <OrderDetailsItem :orderItem="ordersData.orderList.data" :checkoutFlg='false'></OrderDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="1" selected="true">
              <span slot="label" class="fs-14 fw-700">待处理 <span
                  class="blue fs-16">{{ordersData.pendingNum}}</span></span>
              <div class="" v-if="ordersData">
                <OrderDetailsItem :orderItem="ordersData.orderList.data" :checkoutFlg='false'></OrderDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label" class="fs-14 fw-700">已发货 <span
                  class="blue fs-16">{{ordersData.deliveryNum}}</span></span>
              <div class="" v-if="ordersData">
                <OrderDetailsItem :orderItem="ordersData.orderList.data" :checkoutFlg='false'></OrderDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label" class="fs-14 fw-700">已完成 <span
                  class="blue fs-16">{{ordersData.completeNum}}</span></span>
              <div class="" v-if="ordersData">
                <OrderDetailsItem :orderItem="ordersData.orderList.data" :checkoutFlg='false'></OrderDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4">
              <span slot="label" class="fs-14 fw-700">已关闭 <span class="blue fs-16">{{ordersData.closeNum}}</span></span>
              <div class="" v-if="ordersData">
                <OrderDetailsItem :orderItem="ordersData.orderList.data" :checkoutFlg='false'></OrderDetailsItem>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="p-l-50" v-if="type == 3 && evaluationData">
          <el-tabs class="" v-model="evaluationActiveName" @tab-click="evaluationHandleClick">
            <el-tab-pane name="0">
              <span slot="label" class="fs-14 fw-700">全部 <span
                  class="blue fs-16">{{evaluationData.AllNum}}</span></span>
              <div class="" v-if="evaluationData">
                <EvaluationDetailsItem :orderItem="evaluationData.commentList.data" :operation='false'>
                </EvaluationDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="1" selected="true">
              <span slot="label" class="fs-14 fw-700">好评 <span
                  class="blue fs-16">{{evaluationData.goodNum}}</span></span>
              <div class="" v-if="evaluationData">
                <EvaluationDetailsItem :orderItem="evaluationData.commentList.data" :operation='false'>
                </EvaluationDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label" class="fs-14 fw-700">中评 <span
                  class="blue fs-16">{{evaluationData.inTheNum}}</span></span>
              <div class="" v-if="evaluationData">
                <EvaluationDetailsItem :orderItem="evaluationData.commentList.data" :operation='false'>
                </EvaluationDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3">
              <span slot="label" class="fs-14 fw-700">差评 <span
                  class="blue fs-16">{{evaluationData.badNum}}</span></span>
              <div class="" v-if="evaluationData">
                <EvaluationDetailsItem :orderItem="evaluationData.commentList.data" :operation='false'>
                </EvaluationDetailsItem>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4" v-if="representationData">
              <span slot="label" class="fs-14 fw-700">申述 <span
                  class="blue fs-16">{{representationData.count}}</span></span>
              <div class="" v-if="evaluationData">
                <EvaluationDetailsItem :orderItem="representationData.data" :operation='true'></EvaluationDetailsItem>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <div class="clear"></div>

    <!-- 分页 -->
    <div class="p-l-50" v-if="type == 1">
      <div class="fenye" v-if="goodsList && goodsList.length > 0">
        <el-pagination @size-change="goodsPageSizeChange" @current-change="goodsPageChange"
          :current-page="goodsPageIndex" :page-size="goodsPageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="goodsTotalNum">
        </el-pagination>
      </div>
    </div>
    <div class="p-l-50" v-if="type == 2">
      <div class="fenye" v-if="ordersData && ordersData.orderList.data.length > 0">
        <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ordersData.orderList.count">
        </el-pagination>
      </div>
    </div>
    <div class="p-l-50" v-if="type == 3 && commentState != 4">
      <div class="fenye" v-if="evaluationData && evaluationData.commentList.data.length > 0">
        <el-pagination @size-change="pageSizeChangeTwo" @current-change="pageChangeTwo" :current-page="pageIndexTwo"
          :page-size="pageSizeTwo" layout="total, sizes, prev, pager, next, jumper"
          :total="evaluationData.commentList.count">
        </el-pagination>
      </div>
    </div>
    <div class="p-l-50" v-if="type == 3 && commentState == 4">
      <div class="fenye" v-if="representationData && representationData.data.length > 0">
        <el-pagination @size-change="pageSizeChangeTwo" @current-change="pageChangeTwo" :current-page="pageIndexTwo"
          :page-size="pageSizeTwo" layout="total, sizes, prev, pager, next, jumper" :total="representationData.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script src="../action/merchantDetailsAction.js"></script>

<style lang="scss" scoped>
  .mingRen-con>p img,
  .mingRen-con>p video {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .order-img {
    height: 80px;
    width: auto;
  }

  .order-img img {
    /* width: 100%; */
    height: 100%;
  }
</style>