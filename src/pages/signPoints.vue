<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-签到积分</div>
    <div class="m-b-20">
      <div class="my-flex flex-between width-500 mb-20 fw-700">
        <div
          @click="changeModule(1)"
          :class="[
            type == '1' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">积分管理</div>
        </div>
        <div
          @click="changeModule(2)"
          :class="[
            type == '2' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">签到明细</div>
        </div>
      </div>
      <div>
        <div v-if="type == 1">
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
                <th width="10%">签到天数</th>
                <th width="15%">签到奖励</th>

                <th width="10%" class="blue fw-700" @click="onChangeModule({})">
                  + 添加
                </th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr
                class="fs-12"
                v-for="(item, index) in listDataArr"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td class="p-t-10 p-b-10">{{ item.signNumber }}</td>
                <td>{{ item.levelIntegral }}</td>
                <td>
                  <el-button type="info" round @click="deleteHHCon(item.id)"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    round
                    @click="onChangeModule(item)"
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
        </div>

        <div v-if="type == 2">
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
                <th width="10%">AR号</th>
                <th width="15%">签到时间</th>
                <th width="15%">连续签到天数</th>
                <th width="15%">获得积分</th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr
                class="fs-12"
                v-for="(item, index) in listDataArr2"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td class="p-t-10 p-b-10">{{ item.arNumber }}</td>
                <td>{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
                <td>{{ item.specValueName }}</td> 
                <td>{{ item.num }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="clear"></div>

    <!-- 分页 -->
    <div v-if="type == 1">
    </div>
    <div v-if="type == 2">
    </div>
    <SignPointsCom ref="SignPointsCom" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
      :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" ></SignPointsCom>
  </div>
</template>
<script src="../action/signPointsAction.js"></script>
<style lang='scss' scoped>
</style>