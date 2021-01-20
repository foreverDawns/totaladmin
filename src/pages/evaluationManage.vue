<template>
  <div class="order-manage-box bg-white border-ra-15 min-height-100">
    <div class="my-flex p-15">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200">
        <div class="m-b-10 fs-13 blue">订单编号</div>
        <el-input type="text" placeholder="请输入" v-model="orderSn" show-word-limit clearable>
        </el-input>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200">
        <div class="m-b-10 fs-13 blue">商品名称</div>
        <el-input type="text" placeholder="请输入" v-model="productName" show-word-limit clearable>
        </el-input>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-120">
        <div class="m-b-10 fs-13 blue">商品描述</div>
        <el-select v-model="optionValue" placeholder="请选择" disabled clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-120">
        <div class="m-b-10 fs-13 blue">物流服务</div>
        <el-select v-model="optionValue" placeholder="请选择" disabled clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10">
        <div class="m-b-10 fs-13 blue">开始时间~结束时间</div>
        <el-date-picker v-model="timeValue" type="daterange" disabled clearable align="right" unlink-panels
          @change="onSelectTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="my-flex flex-l-center">
        <el-button class="" type="info" @click="clearConfigData">重置</el-button>
        <el-button type="primary" @click="goodsEvaluationList">搜索</el-button>
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
                    <th width="10%">订单信息</th>
                    <th width="10%">商品描述</th>
                    <th width="7%">物流服务</th>
                    <th width="15%">服务态度</th>
                    <th width="7%">评价内容</th>
                    <th width="10%">申请日期</th>
                    <th width="15%">操作</th>
                    <!-- <th width="20%" class="blue fw-700" @click="editARCon()">+ 添加内容</th> -->
                  </tr>
                </thead>
                <tbody class="table-tbody">
                  <tr v-for="(item, index) in evaluationLists" :key="index" class="fs-12">
                    <td class="fw-700">{{ index+1 }}</td>
                    <td class="p-t-10 p-b-10">
                      <div class="my-flex flex-l-center">
                        <div class="m-r-5">
                          <img class="width-52 d-in-b" :src="item.images" alt="">
                        </div>
                        <div>{{item.productName}}</div>
                      </div>
                    </td>
                    <td>{{ item.orderSn }}</td>
                    <td>{{ `${item.conformityGoods} 星` || '/' }}</td>
                    <td>{{ `${item.courierService} 星` || '/' }}</td>
                    <td>{{ `${item.storeService} 星` || '/' }}</td>
                    <!-- <td>{{ item.deliveryTime ? dateFormat(item.deliveryTime, "YYYY-MM-DD") : "/" }}</td> -->
                    <td class="line-3">{{ item.content || '/' }}</td>
                    <td>{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
                    <td>
                      <router-link :to="{name: 'evaluationDetails', params:{id:`${item.id}`}}">
                        <el-button type="primary" round >详情</el-button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane name="toBeProcessed" selected="true">
            <span slot="label" class="fs-16 fw-700">好评 <span class="blue fs-16">456</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="evaluationLists.slice(1,2)" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
          <el-tab-pane name="picking">
            <span slot="label" class="fs-16 fw-700">中评 <span class="blue fs-16">789</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="evaluationLists" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
          <el-tab-pane name="shipped">
            <span slot="label" class="fs-16 fw-700">差评 <span class="blue fs-16">321</span></span>
            <div class="">
              <!-- <OrdersItem :orderItem="evaluationLists" :checkoutFlg='false'></OrdersItem> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 分页 -->
    <div class="fenye" v-if="evaluationLists.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="evaluationTotal">
      </el-pagination>
    </div>
    <div style="height: 60px;"></div>
  </div>
</template>


<script src="../action/evaluationManageAction.js"></script>


<style lang="scss" scoped>

</style>