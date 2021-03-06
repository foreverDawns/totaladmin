<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-新用户获得</div>
    <div class="my-flex">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200 mb-20">
        <div class="m-b-10 fs-13 blue">新用户积分获得数</div>

        <el-input
          type="text"
          placeholder="1000"
          v-model="levelIntegral"
          show-word-limit
          clearable
        >
        </el-input>
      </div>
      <div class="my-flex flex-l-center">
        <el-button type="primary" @click="userSave()">保存</el-button>
      </div>
    </div>

    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      class="orderC-tb"
    >
      <thead class="orderC-th">
        <tr style="height: 60px" class="fs-14 fw-700">
          <th width="10%">序号</th>
          <th width="30%">联系人电话</th>
          <th width="30%">AR号</th>
          <th width="30%">日期</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12 height-40" v-for="(item, index) in listDataArr" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="p-t-10 p-b-10">{{ item.phone }}</td>
          <td>{{ item.arNumber }}</td>
          <td>{{ item.createTime ? dateFormat(item.createTime) : '--'  }}</td>
        </tr>
      </tbody>
    </table>
    <div class="clear"></div> 
   <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script src="../action/newusersget.js"></script>

<style lang='scss' scoped>
</style>