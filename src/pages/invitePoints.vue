<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-邀请盲盒池</div>
    <div class="my-flex">
      <div class="bg-blue p-15 border-ra-6 m-r-10 width-200 mb-20">
        <div class="m-b-10 fs-13 blue">默认区间值</div>
        <span style="width: 82px; display: inline-block">
          <el-input
            type="text"
            placeholder="1"
            v-model="orderSnSter"
            show-word-limit
            clearable
          >
          </el-input>
        </span>
        <span style="color: #8199ff">——</span>
        <span style="width: 82px; display: inline-block">
          <el-input
            type="text"
            placeholder="100"
            v-model="orderSnEnd"
            show-word-limit
            clearable
          >
          </el-input>
        </span>
      </div>
      <div class="my-flex flex-l-center">
        <el-button type="primary"   @click="integralSave()">保存</el-button>
        
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
          <th width="10%">邀请人数</th>
          <th width="15%">获得积分</th>
          <th width="15%">获得奖励</th>
          <th width="15%">有效时间</th>
          <th width="15%">概率</th>
          <!-- addPoints -->
          <th width="10%" class="blue fw-700" @click="editPoint({},listDataArr)">+ 添加</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12" v-for="(item, index) in listDataArr" :key="index"> 
          <td>{{ index + 1 }}</td>
          <td class="p-t-10 p-b-10">{{ item.inviteNum }}</td>
          <td>{{ item.integralNum }}</td>
          <td>{{ item.prizeStr }}</td>
          <td>{{ item.validHour }}</td>
          <td>{{ item.probability }}%</td> 
          <td>
            <!-- <el-button type="info" round @click="deletePoint(item.id)"
              >删除</el-button
            > -->
            <el-button type="primary" round @click="editPoint(item,listDataArr)"
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
    <InvitePointsCom  ref="InvitePointsCom" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
      :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" :listData="listData"></InvitePointsCom>
  </div>
</template>



<script src="../action/invitePointsAction.js"></script>
<style lang='scss' scoped></style>