<template>
  <div class="order-manage-box bg-white border-ra-15 min-height-100">
    <div class="my-flex p-15 p-b-0">
      <div class="flex-1">
        <div class="my-flex">
          <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="fs-13 blue m-r-10">订单编号</span>
            <el-input type="text" placeholder="请输入" class="width-135" v-model="refundSn" show-word-limit clearable>
            </el-input>
          </div>
          <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="m-b-10 fs-13 blue m-r-10">商品名称</span>
            <el-input type="text" placeholder="请输入" class="width-135" v-model="productName" show-word-limit clearable>
            </el-input>
          </div>
          <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="m-b-10 fs-13 blue m-r-10">发货状态</span>
            <el-select v-model="orderStatus" placeholder="请选择" class="width-135" clearable>
              <el-option v-for="item in orderStatusArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="m-b-10 fs-13 blue m-r-10">售后状态</span>
            <el-select v-model="serverStatus" placeholder="请选择" class="width-135" clearable>
              <el-option v-for="item in serverStatusArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="my-flex m-t-10">
          <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="m-b-10 fs-13 blue m-r-10">申请原因</span>
            <el-select v-model="optionValue" placeholder="请选择" class="width-135" disabled clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="bg-blue p-5 border-ra-6 m-r-10 width-200">
            <span class="m-b-10 fs-13 blue m-r-10">卖家昵称</span>
            <el-input type="text" placeholder="请输入" class="width-135" v-model="productName" show-word-limit clearable>
            </el-input>
          </div> -->
          <div class="bg-blue p-5 border-ra-6 width-420">
            <span class="m-b-10 fs-13 blue m-r-10">退款金额</span>
            <el-input type="text" placeholder="请输入" class="width-150" v-model="paymentMoney" show-word-limit clearable>
            </el-input>
            <span class="fs-12 m-l-5 m-r-5">至</span>
            <el-input type="text" placeholder="请输入" class="width-150" v-model="endPaymentMoney" show-word-limit clearable>
            </el-input>
          </div>
        </div>
        <div class="my-flex m-t-10">
          <div class="bg-blue p-5 border-ra-6 m-r-10">
            <span class="m-b-10 fs-13 blue m-r-10">开始时间~结束时间</span>
            <el-date-picker v-model="afterSaleTime" type="daterange" clearable align="right" unlink-panels
              @change="onSelectTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              value-format="yyyy-MM-dd" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="my-flex flex-l-center width-200">
        <el-button class="" type="info" @click="clearConfigData">重置</el-button>
        <el-button type="primary" @click="afterSaleManagement">搜索</el-button>
      </div>
    </div>


    <!-- tabs -->
    <div class="p-30">
      <template>
        <el-tabs class="" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="all">
            <span slot="label" class="fs-16 fw-700">全部 <span class="blue fs-16">{{evaluationTotal}}</span></span>
            <div class="">
              <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
                <thead class="orderC-th">
                  <tr style="height: 60px;" class="fs-14 fw-700">
                    <th width="10%">售后编号</th>
                    <th width="15%">商品信息</th>
                    <th width="10%">实付金额</th>
                    <th width="10%">退款金额</th>
                    <th width="17.5%">申请原因</th>
                    <th width="10%">发货状态</th>
                    <th width="7.5%">售后状态</th>
                    <th width="10%">申请时间</th>
                    <th width="10%">操作</th>
                    <!-- <th width="20%" class="blue fw-700" @click="editARCon()">+ 添加内容</th> -->
                  </tr>
                </thead>
                <tbody class="table-tbody">
                  <tr v-for="(item, index) in listDataArr" :key="index" class="fs-12">
                    <td class="fw-700">{{ item.refundSn }}</td>
                    <td class="p-t-10 p-b-10">
                      <div class="my-flex flex-l-center">
                        <div class="m-r-5">
                          <img class="width-52 d-in-b" :src="item.images" alt="">
                        </div>
                        <div>{{item.productName}}</div>
                      </div>
                    </td>
                    <td>{{ item.paymentMoney }}</td>
                    <td>{{ item.paymentMoney }}</td>
                    <td>{{ item.refundWhyState }}</td>
                    <td>{{ orderStatusSearchData[item.orderStatus]}}</td>
                    <td>{{ serverStatusSearchData[item.serverStatus]}}</td>
                    <td>{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
                    <td>
                      <router-link :to="{name: 'afterSaleDetails', params:{id:`${item.orderId}`}}">
                        <el-button type="primary" round>详情</el-button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane name="toBeProcessed" selected="true">
            <span slot="label" class="fs-16 fw-700">退款 <span class="blue fs-16">456</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="listDataArr.slice(1,2)" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
          <el-tab-pane name="picking">
            <span slot="label" class="fs-16 fw-700">退款退货 <span class="blue fs-16">789</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="listDataArr" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
          <el-tab-pane name="shipped">
            <span slot="label" class="fs-16 fw-700">换货 <span class="blue fs-16">321</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="listDataArr" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 分页 -->
    <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="evaluationTotal">
      </el-pagination>
    </div>
    <div style="height: 60px;"></div>
  </div>
</template>


<script src="../action/afterSaleManageAction.js"></script>


<style lang="scss" scoped>

</style>