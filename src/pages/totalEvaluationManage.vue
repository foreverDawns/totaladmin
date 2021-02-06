<template>
  <div class="order-manage-box bg-white border-ra-15 min-height-100 m-20">
    <div class="my-flex p-15">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200">
        <div class="m-b-10 fs-13 blue">商品名称</div>
        <el-input type="text" placeholder="请输入" v-model="sellerId" show-word-limit clearable>
        </el-input>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10">
        <div class="m-b-10 fs-13 blue">开始时间~结束时间</div>
        <el-date-picker v-model="timeValue" type="daterange" clearable align="right" unlink-panels
          @change="onSelectTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="my-flex flex-l-center">
        <el-button class="" type="info" @click="clearConfigData">重置</el-button>
        <el-button type="primary" @click="auditCommentsList">搜索</el-button>
      </div>
    </div>
    <!-- tabs -->
    <div class="p-30">
      <div class="">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
          <thead class="orderC-th">
            <tr style="height: 60px;" class="fs-14 fw-700">
              <th width="10%">商家名称</th>
              <th width="14%">商品信息</th>
              <th width="7%">商品描述</th>
              <th width="7%">物流服务</th>
              <th width="7%">服务态度</th>
              <th width="15%">评价内容</th>
              <th width="10%">申诉日期</th>
              <th width="15%">申诉内容</th>
              <th width="15%">操作</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr v-for="(item, index) in evaluationLists" :key="index" class="fs-12">
              <td class="fw-700">{{ item.sellerName }}</td>
              <td class="p-t-10 p-b-10">
                <div class="my-flex flex-l-center">
                  <div class="m-r-5">
                    <img class="width-52 d-in-b" :src="item.productImages.split(',')[0]" alt="">
                  </div>
                  <div>{{item.productName}}</div>
                </div>
              </td>
              <td>{{ `${item.conformityGoods} 星` || '/' }}</td>
              <td>{{ `${item.courierService} 星` || '/' }}</td>
              <td>{{ `${item.storeService} 星` || '/' }}</td>
              <!-- <td>{{ item.deliveryTime ? dateFormat(item.deliveryTime, "YYYY-MM-DD") : "/" }}</td> -->
              <td class="line-3" :title="item.content">{{ item.content || '/' }}</td>
              <td>{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
              <td class="line-3" :title="item.auditComment">{{ item.auditComment || '/' }}</td>
              <td>
                <div v-if="item.status == 1">
                  <el-button type="danger" @click="onEditaction(item, '1')" round>拒绝</el-button>
                  <el-button type="primary" @click="onEditaction(item, '2')" round>同意</el-button>
                </div>
                <div v-if="item.status == 2">
                  <el-button type="primary" disabled round>已同意</el-button>
                </div>
                <div v-if="item.status == 3">
                  <el-button type="danger" disabled round>已拒绝</el-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 分页 -->
    <!-- <div class="fenye" v-if="evaluationLists.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="evaluationTotal">
      </el-pagination>
    </div> -->
    <div style="height: 60px;"></div>
    <div class="">
      <TotalEvaluationManageCom :moduleFlag="moduleFlag" @onAddCon="onAddCon" :onSaveData="onSaveData"
      :currentItemData="currentItemData" :styleStatus="styleStatus">
    </TotalEvaluationManageCom>
    </div>
  </div>
</template>


<script src="../action/totalEvaluationManageAction.js"></script>


<style lang="scss" scoped>

</style>