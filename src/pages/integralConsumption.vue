<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-积分消费</div>
    <div class="my-flex">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-300 mb-20">
        <div class="m-b-10 fs-13 blue">默认积分配比</div>
         <span style="margin-right:10px" class=" m-b-10 fs-13 blue ">RMB</span>
        <span style="width: 82px; display: inline-block">
        
          <el-input
            type="text"
            placeholder="1000"
            v-model="oneorderSn"
            show-word-limit
            clearable
          >
          </el-input>
        </span>
        <span style="color: #8199ff; margin:0px 20px" >:</span>
        <span style="width: 82px; display: inline-block">
          <el-input
            type="text"
            placeholder="1000"
            v-model="twoorderSn"
            show-word-limit
            clearable
          >
          </el-input>
        </span>
       <span style="margin-left:10px" class=" m-b-10 fs-13 blue">积分</span>
      </div>

      <div class="my-flex flex-l-center">
        <!-- <el-button type="primary">保存</el-button> -->
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
          <th width="10%">活动期限</th>
          <th width="15%">活动店铺</th>
          <th width="15%">活动产品</th>
          <th width="15%">用户等级/积分配比</th>
          <th width="15%">是否设为推荐</th>
          <th width="10%">状态</th>
          <th width="15%" class="blue fw-700" @click="onChangeModule({})">
            + 新增配比
          </th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12" v-for="(item, index) in listDataArr" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="p-t-10 p-b-10">  {{ dateFormat(item.startTime,item.endTime) }} </td>
          <td>{{ item.supplierName }}</td>
          <td>{{ item.skuName }}</td>
          <td>{{ item.membersId }}/{{ item.integralMatching }}</td>
          <td>{{ item.recommend === "1" ? "推荐" : "不推荐" }}</td>
          <td>
            <el-switch v-model="item.status" disabled> </el-switch>
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
    <IntegralConsumptionCom ref="integralConsumption" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
    :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" ></IntegralConsumptionCom>
  </div>
</template>



<script src="../action/integralConsumptionAction.js"></script>
<style lang='scss' scoped></style>