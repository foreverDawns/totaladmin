<template>
  <div class="order-item-box">
    <div v-if="orderItem.length > 0">
      <div class="">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
          <thead class="orderC-th">
            <tr style="height: 60px;" class="fs-14 fw-700">
              <th width="10%">序号{{operation}}</th>
              <th :width="operation ? '10%' : '20%'">商品信息</th>
              <!-- <th width="8%">订单信息</th> -->
              <th :width="operation ? '14%' : '15%'">商品描述</th>
              <th :width="operation ? '7%' : '15%'">物流服务</th>
              <th :width="operation ? '10%' : '20%'">服务态度</th>
              <th :width="operation ? '14%' : '20%'">评价内容</th>
              <th width="10%" v-if="operation">申请日期</th>
              <th width="10%" v-if="operation">申述内容</th>
              <th width="15%" v-if="operation">操作</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr v-for="(item, index) in orderItem" :key="index" class="fs-12">
              <td class="fw-700">{{ index+1 }}</td>
              <td class="p-t-10 p-b-10">
                <div class="my-flex flex-l-center">
                  <div class="m-r-5">
                    <img class="width-52 d-in-b"
                      :src="item.productImages ? item.productImages.split(',')[0] : item.productImages " alt="">
                  </div>
                  <div>{{item.productName}}</div>
                </div>
              </td>
              <!-- <td>{{ item.orderId }}</td> -->
              <td>{{ `${item.conformityGoods} 星` || '/' }}</td>
              <td>{{ `${item.courierService} 星` || '/' }}</td>
              <td>{{ `${item.storeService} 星` || '/' }}</td>
              <!-- <td>{{ item.deliveryTime ? dateFormat(item.deliveryTime, "YYYY-MM-DD") : "/" }}</td> -->
              <td class="line-3" :title="item.content">{{ item.content || '/' }}</td>
              <td v-if="operation">{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
              <td v-if="operation" class="line-3" :title="item.auditComment">{{ item.auditComment || '/' }}</td>
              <td v-if="operation">
                <div v-if="item.status == 1">
                  <el-button type="danger" @click="onOperation(item.id, 3)" round>拒绝</el-button>
                  <el-button type="primary" @click="onOperation(item.id, 2)" round>同意</el-button>
                </div>
                <div v-if="item.status == 2">
                  <el-button type="primary" @click="onOperation(item.id, 2)" disabled round>同意</el-button>
                </div>
                <div v-if="item.status == 3">
                  <el-button type="danger" @click="onOperation(item.id, 3)" disabled round>拒绝</el-button>
                </div>
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script src="../componentsAction/evaluationDetailsItemAction.js"></script>

<style lang="scss" scoped>

</style>