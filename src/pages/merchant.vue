<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">商家管理</div>
    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
      <thead class="orderC-th">
        <tr style="height: 60px;" class="fs-13">
          <th width="5%">序号</th>
          <th width="10%">商家头像</th>
          <th width="7%">商家名称</th>
          <th width="10%">营业执照</th>
          <th width="10%">账号/密码</th>
          <th width="7.5%">联系方式</th>
          <th width="7.5%">商品列表</th>
          <th width="7.5%">订单信息</th>
          <th width="7.5%">评价信息</th>
          <th width="10%">创建时间</th>
          <th width="13%" class="blue fw-700" @click="onAddCon()">+ 添加商家</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="(item, index) in queryListArr" :key="index" class="fs-12">
          <td>{{index + 1 }}</td>
          <td class="order-gw">
            <div class="order-img"><img :src="item.logo" /></div>
          </td>
          <td class="">{{item.supplierName}}</td>
          <td class="order-gw">
            <div class="order-img"><img :src="item.description" /></div>
          </td>
          <td class="">
            <div class="" v-for="(item, index) in item.userPassWord.split(',')" :key="index">{{item}}</div>
          </td>
          <td class="">{{item.phoneNumber}}</td>
          <td class="">
            <!-- <router-link :to="{name: 'merchantDetails', params:{id: item.supplierId, type: '1'}}"> -->
              <span class="a-link">
                去查看 >>
              </span>
            <!-- </router-link> -->
          </td>

          <td class="">
            <router-link :to="{name: 'merchantDetails', params:{id: item.supplierId, type: '2'}}">
              <span class="a-link">
                去查看 >>
              </span>
            </router-link>
          </td>
          <td class="">
            <router-link :to="{name: 'merchantDetails', params:{id: item.supplierId, type: '3'}}">
              <span class="a-link">
                去查看 >>
              </span>
            </router-link>
          </td>
          <td class="">{{dateFormat(item.modifiedTime)}}</td>
          <td>
            <el-button type="danger" round class="m-r-10" @click="deleteHHCon(item.supplierId, item.supplierStatus)">
              {{ item.supplierStatus === 0 ? '解冻':'冻结' }}</el-button>
            <router-link :to="{name: 'merchantDetails', params:{id: item.supplierId, type: '1'}}">
              <el-button type="primary" round >详情</el-button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="clear"></div>
    <!-- 分页 -->
    <div class="fenye" v-if="queryListArr.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>
    <!-- 添加加内容组件 -->
    <MerchantCom :addYRConDialogVisible="addYRConDialogVisible" @onAddCon="onAddCon" :addYRConFunc="addYRConFunc"
      :editCurrentCon="editCurrentCon">
    </MerchantCom>
  </div>
</template>

<script src="../action/merchantAction.js"></script>

<style lang="scss" scoped>
  .mingRen-con>p img,
  .mingRen-con>p video {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
</style>