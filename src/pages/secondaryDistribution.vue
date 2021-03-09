<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-二级分销</div>
    <div class="my-flex">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200 mb-20">
        <div class="m-b-10 fs-13 blue">默认一级分销配比</div>
        <el-input
          type="text"
          placeholder="1000"
          v-model="oneorderSn"
          show-word-limit
          clearable
        >
        </el-input>
        
      </div>
      <div style="margin-right:10%" class="my-flex flex-l-center">
        <el-button type="primary"  @click="oneDistribution()">保存</el-button>
      </div>
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200 mb-20">
        <div class="m-b-10 fs-13 blue">默认二级分销配比</div>
        <el-input
          type="text"
          placeholder="1000"
          v-model="twoorderSn"
          show-word-limit
          clearable
        >
        </el-input>
      </div>
      <div class="my-flex flex-l-center">
        <el-button type="primary"  @click="twoDistribution()">保存</el-button>
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
          <th width="5%">序号</th>
          <th width="10%">店铺</th>
          <th width="15%">商品</th>
          <th width="15%">一级分销百分比</th>
          <th width="15%">二级分销百分比</th>
          <th width="15%">状态</th>
          <th width="10%" class="blue fw-700" @click="onChangeModule({})">+ 新增配比</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12" v-for="(item, index) in listDataArr" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="p-t-10 p-b-10">{{ item.supplierName }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.distributionOne }}</td>
          <td>{{ item.distributionTwo }}</td>
             <td>
                <el-switch v-model="item.status" :active-value="0" :inactive-value="1"
                  @change="whetherToEnable($event, item.id)" active-color="#13ce66" inactive-color="red">
                </el-switch>
              </td>
          <td>
            <el-button type="info" round @click="deleteHHCon(item.id)"
              >删除</el-button
            >
            <el-button type="primary" round @click="onChangeModule(item)"
              >编辑</el-button
            >
          </td>
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
        :total="listTotal"
      >
      </el-pagination>
    </div>
    <SecondaryDistributionCom ref="secondaryDistribution" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"  :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson"></SecondaryDistributionCom>
  </div>
</template>



<script src="../action/secondaryDistributionAction.js"></script>
<style lang='scss' scoped>
</style>