<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-26 fw-700 mb-20">优惠券</div>
    <div class="border-ra-8 border-blue m-b-20" v-for="(item, index) in listDataArr" :key="index">
      <div class="fs-20 fw-700 my-flex height-40 p-10 flex-h-center">
        <div class="hpc-left-title-img m-r-10">
          <img src="@/assets/images/homeImg/dotsImg.png" alt="">
        </div>
        <div class="m-r-20">{{item.supplierName}}</div>
        <div class="blue flex-1">{{item.pos.length}}个优惠券</div>
        <div class="width-40 fw-700 fs-16 text-align-c">
          <div class="pointer" @click="onChangeModule(index)">
            <div
              :class="[item.select ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'width-40 fw-700 fs-16 text-align-c']">
            </div>
            <div class="fs-12">{{ item.select ? '收起' : '展开' }}</div>
          </div>
        </div>
      </div>
      <div class="p-l-10 p-r-10" v-if="item.select">
        <div class="" v-if="item.pos.length > 0">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead class="orderC-th">
              <tr style="height: 60px;" class="fs-14 fw-700">
                <th width="10%">序号</th>
                <th width="10%">优惠券ID</th>
                <th width="10%">优惠券名称</th>
                <th width="10%">优惠券额度</th>
                <th width="10%">使用门槛</th>
                <th width="15%">有效期</th>
                <th width="15%">已使用</th>
                <th width="20%">操作</th>
                
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr class="fs-12" v-for="(pItem, pIndex) in item.pos" :key="pIndex">
                <td>{{pIndex + 1 }}</td>
                <td>{{pItem.id }}</td>
                <td>{{pItem.name }}</td>
                <td>{{pItem.money }}</td>
                <td>{{pItem.fullMoney}}</td>
                <td class="p-t-10 p-b-10">{{ dateFormat(pItem.startTime)}} - {{dateFormat(pItem.endTime) }}</td>
                <td>{{ pItem.useNum }}</td>
                <td>
                  <el-button type="primary" round @click="editARCon(pItem)">详情</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="height-50 my-flex text-align-c flex-j-center flex-l-center fw-700 fs-20" v-else>此商家没有优惠券</div>
      </div>
    </div>
    
    <div class="clear"></div>
    <!-- <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div> -->
    <!-- 添加内容组件 -->
    <CouponManageCom :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon" :aRDetailJson="aRDetailJson"
      >
    </CouponManageCom>
  </div>
</template>

<script src="../action/couponManageAction.js"></script>

<style lang="scss" scoped>

</style>