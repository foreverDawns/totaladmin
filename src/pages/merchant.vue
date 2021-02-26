<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">商家管理</div>

    <div class="shop">
      <div class="shop-box height-60 line-h-60">
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 10%"
          >序号</span
        >
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 10%"
          >公司名称</span
        >
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 10%"
          >联系方式</span
        >
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 10%"
          >公司账号</span
        >
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 20%"
          >营业执照</span
        >
        <span class="d-in-b text-align-c fs-14 fw-700" style="width: 15%"
          >创建时间</span
        >
        <span
          class="d-in-b text-align-c blue fs-14 fw-700 height-40 line-h-40"
          style="width: 25%"
          @click="onAddCon()"
        >
          + 添加商家
        </span>
      </div>

      <div class="bor" v-for="(item, index) in queryListArr" :key="index">
        <div class="fs-12 my-flex flex-l-center ">
          <td class="text-align-c" style="width: 10%">{{ index + 1 }}</td>
          <td class="text-align-c" style="width: 10%">
            {{ item.companyName }}
          </td>
          <td class="text-align-c" style="width: 10%">{{ item.headPhone }}</td>
          <td class="text-align-c" style="width: 10%">{{ item.loginName }}</td>
          <td class="text-align-c order-gw my-flex" style="width: 20%">
            <div class="order-img"><img :src="item.companyAptitude" /></div>
          </td>
          <td class="text-align-c" style="width: 15%">
            {{ dateFormat(item.createTime) }}
          </td>
          <td class="text-align-c" style="width: 25%">
            <el-button
              type="danger"
              size="mini"
              round
              class="m-r-5"
              @click="deleteHHCon(item.supplierId, item.supplierStatus)"
            >
              {{ item.supplierStatus === 0 ? "解冻" : "冻结" }}
            </el-button>
            <router-link
              class="m-r-5"
              :to="{
                name: 'merchantDetails',
                params: { id: item.supplierId, type: '1' },
              }"
            >
              <el-button type="primary" size="mini" round>详情</el-button>
            </router-link>
            <el-button size="mini" round @click="onChangeModule(item.id)">{{
              item.select ? "收起" : "展开"
            }}</el-button>
          </td>
        </div>
        <div class="shop-list" v-if="item.select && item.shopList.length > 0">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead class="orderC-th">
              <tr style="height: 40px;" class="fs-13">
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
                <th width="13%" class="blue fw-700" @click="onAddCon()">
                  + 添加商家
                </th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr
                v-for="(item, index) in item.shopList"
                :key="index"
                class="fs-12"
              >
                <td>{{ index + 1 }}</td>
                <td class="order-gw">
                  <div class="order-img"><img :src="item.logo" /></div>
                </td>
                <td class="">{{ item.supplierName }}</td>
                <td class="order-gw">
                  <div class="order-img"><img :src="item.description" /></div>
                </td>
                <td class="">
                  <!-- <div class="" v-for="(item, index) in item.userPassWord.split(',')" :key="index">{{item}}</div> -->
                </td>
                <td class="">{{ item.phoneNumber }}</td>
                <td class="">
                  <!-- <router-link :to="{name: 'merchantDetails', params:{id: item.supplierId, type: '1'}}"> -->
                  <span class="a-link">
                    去查看 >>
                  </span>
                  <!-- </router-link> -->
                </td>

                <td class="">
                  <router-link
                    :to="{
                      name: 'merchantDetails',
                      params: { id: item.supplierId, type: '2' },
                    }"
                  >
                    <span class="a-link">
                      去查看 >>
                    </span>
                  </router-link>
                </td>
                <td class="">
                  <router-link
                    :to="{
                      name: 'merchantDetails',
                      params: { id: item.supplierId, type: '3' },
                    }"
                  >
                    <span class="a-link">
                      去查看 >>
                    </span>
                  </router-link>
                </td>
                <td class="">{{ dateFormat(item.modifiedTime) }}</td>
                <td>
                  <el-button
                    type="danger"
                    round
                    class="m-r-10"
                    @click="deleteHHCon(item.supplierId, item.supplierStatus)"
                  >
                    {{ item.supplierStatus === 0 ? "解冻" : "冻结" }}</el-button
                  >
                  <router-link
                    :to="{
                      name: 'merchantDetails',
                      params: { id: item.supplierId, type: '1' },
                    }"
                  >
                    <el-button type="primary" round>详情</el-button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="fs-12 fw-700 text-align-c height-40 line-h-40" v-if="item.select && item.shopList.length < 1">当前公司下面没有店铺！</div>
      </div>
    </div>

    <div class="clear m-t-60"></div>
    <!-- 分页 -->
    <div class="fenye" v-if="queryListArr.length > 0">
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
    <!-- 添加加内容组件 -->
    <MerchantCom
      :addYRConDialogVisible="addYRConDialogVisible"
      @onAddCon="onAddCon"
      :addYRConFunc="addYRConFunc"
      :editCurrentCon="editCurrentCon"
    >
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
    
    .shop-box {
        background: #becbf7;
        color: #fff;
        border-radius: 15px 15px 0 0;
    }
    
    .order-img {
        width: 60px;
        height: 60px;
        border: 1px solid #cccccc;
        margin: 0 auto;
    }
    
    .shop {
        border-bottom: 1px solid #f5f5f5;
    }
    
    .bor {
        background: #fff;
        border-top: 1px solid #f5f5f5;
        border-left: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;
        /* box-shadow: 0 0 5px 2px #ccc; */
    }
    
    .shop-list {
        box-shadow: 0 0 5px 2px #ccc;
    }
    
    .bor:nth-child(2n) {
        background: #f9f9f9;
    }
    
    .orderC-tb {
        border-radius: 0;
    }
    
    .orderC-th {
        background: #d4dbf3;
        color: #fff;
        border-radius: 0px;
        height: 60px;
    }
</style>