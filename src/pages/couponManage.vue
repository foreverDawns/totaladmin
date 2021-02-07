<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">优惠券</div>
    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
      <thead class="orderC-th">
        <tr style="height: 60px;" class="fs-14 fw-700">
          <th width="10%">序号</th>
          <th width="10%">优惠券ID</th>
          <th width="10%">优惠券名称</th>
          <th width="10%">优惠券额度</th>
          <th width="10%">使用门款</th>
          <th width="15%">有效期</th>
          <th width="15%">已使用</th>
          <th width="20%">操作</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12" v-for="(item, index) in listDataArr" :key="index">
          <td>{{index + 1 }}</td>
          <td>{{index + 1 }}</td>
          <td>{{index + 1 }}</td>
          <td>{{index + 1 }}</td>
          <td>{{index + 1 }}</td>
          <td class="p-t-10 p-b-10">{{ item.specName }}</td>
          <td>{{ item.specValueName }}</td>
          <td>
            <el-button type="info" round @click="deleteHHCon(item.specId)">删除</el-button>
            <el-button type="primary" round @click="editARCon(item.specId)">编辑</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="clear"></div>
    <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div>
    <!-- 添加内容组件 -->
    <CouponManageCom :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
      :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson"
      >
    </CouponManageCom>
  </div>
</template>

<script src="../action/couponManageAction.js"></script>

<style lang="scss" scoped>

</style>