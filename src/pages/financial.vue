<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">财务管理</div>
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
          <div class="color-fff">消费</div>
        </div>
        <div
          @click="changeModule(2)"
          :class="[
            type == '2' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">充值</div>
        </div>
        <div
          @click="changeModule(3)"
          :class="[
            type == '3' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">获得积分</div>
        </div>
      </div>
      <div>
        <!-- 消费 -->
        <div v-if="type == 1">
          <!-- 条件查询 -->
          <div class="my-flex m-b-20">
            <div class="flex-1">
              <div class="my-flex">
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="fs-12 blue m-r-10">用户AR号</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.arNumber"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">用户昵称</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.nickName"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">订单编号</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.orderSn"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">消费店铺</span>
                  <div>
                    <el-select
                     class="width-135"
                      v-model="ruleForm.supplierName"
                      @change="onShop($event)"
                    >
                      <el-option
                        v-for="(item, index) in shop"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-flex flex-l-center width-200">
              <el-button class="" type="info" @click="clearConfigData"
                >重置</el-button
              >
              <el-button type="primary" @click="queryList(ruleForm)"
                >查询</el-button
              >
              <el-button type="danger" @click="exportExcel(ruleForm)"
                >导出</el-button
              >
            </div>
          </div>

          <div class="">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              class="orderC-tb"
            >
              <thead class="orderC-th">
                <tr style="height: 60px" class="fs-14 fw-700">
                  <th width="5%">排序</th>
                  <th width="10%">用户AR号</th>
                  <th width="10%">用户昵称</th>
                  <th width="10%">用户手机号</th>
                  <th width="10%">消费商品</th>
                  <th width="15%">消费店铺</th>
                  <th width="15%">消费时间</th>
                  <th width="10%">订单编号</th>
                  <!-- <th width="15%">操作</th> -->
                </tr>
              </thead>
              <tbody class="table-tbody">
                <tr
                  v-for="(item, index) in consumptionArr"
                  :key="index"
                  class="fs-12"
                >
                  <td class="fw-700">{{ index + 1 }}</td>
                  <td class="p-t-10 p-b-10">{{ item.arNumber }}</td>
                  <td>{{ item.nickName }}</td>
                  <td>{{ item.phone }}</td>
                  <td class="p-t-10 p-b-10">
                    <div class="my-flex flex-l-center">
                      <div class="m-r-5">
                        <img
                          class="width-52 d-in-b m-l-20"
                          :src="item.logo.split(',')[0]"
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td>{{ item.supplierName }}</td>
                  <td>
                    {{ item.payTime ? dateFormat(item.payTime) : "--" }}
                  </td>
                  <td>{{ item.orderSn }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 充值 -->
        <div v-if="type == 2">
          <!-- 条件查询 -->
          <div class="my-flex m-b-20">
            <div class="flex-1">
              <div class="my-flex">
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="fs-12 blue m-r-10">用户AR号</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.arNumber"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">用户昵称</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.nickName"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">订单编号</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.topUpOrdersn"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-flex flex-l-center width-200">
              <el-button class="" type="info" @click="clearConfigData"
                >重置</el-button
              >
              <el-button type="primary" @click="queryList(ruleForm)"
                >查询</el-button
              >
              <el-button type="danger" @click="exportExcel(ruleForm)"
                >导出</el-button
              >
            </div>
          </div>

          <div class="">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              class="orderC-tb"
            >
              <thead class="orderC-th">
                <tr style="height: 60px" class="fs-14 fw-700">
                  <th width="10%">排序</th>
                  <th width="10%">用户AR号</th>
                  <th width="10%">用户昵称</th>
                  <th width="15%">用户手机号</th>
                  <th width="10%">充值金额</th>
                  <th width="15%">充值时间</th>
                  <th width="15%">订单编号</th>
                </tr>
              </thead>
              <tbody class="table-tbody">
                <tr
                  v-for="(item, index) in RechargeArr"
                  :key="index"
                  class="fs-12"
                >
                  <td class="fw-700">{{ index + 1 }}</td>
                  <td class="p-t-10 p-b-10">{{ item.arNumber }}</td>
                  <td>{{ item.nickName }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.topUpMoney }}</td>
                  <td>
                    {{ item.createTime ? dateFormat(item.createTime) : "--" }}
                  </td>
                  <td>{{ item.topUpOrdersn }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 获得积分 -->
        <div v-if="type == 3">
          <!-- 条件查询 -->
          <div class="my-flex m-b-20">
            <div class="flex-1">
              <div class="my-flex">
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="fs-12 blue m-r-10">用户AR号</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.arNumber"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">用户昵称</span>
                  <div>
                    <el-input
                      type="text"
                      placeholder="请输入"
                      class="width-135"
                      v-model="ruleForm.nickName"
                      show-word-limit
                      clearable
                    >
                    </el-input>
                  </div>
                </div>
                <div class="bg-blue p-5 border-ra-6 m-r-10">
                  <span class="m-b-10 fs-13 blue m-r-10">获得积分方式</span>
                    <div>
                    <el-select
                     class="width-135"
                      v-model="ruleForm.integralWay"
                
                    >
                      <el-option
                        v-for="(item, index) in grawayShop"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-flex flex-l-center width-200">
              <el-button class="" type="info" @click="clearConfigData"
                >重置</el-button
              >
              <el-button type="primary" @click="queryList(ruleForm)"
                >查询</el-button
              >
              <el-button type="danger" @click="exportExcel(ruleForm)"
                >导出</el-button
              >
            </div>
          </div>

          <div class="">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              class="orderC-tb"
            >
              <thead class="orderC-th">
                <tr style="height: 60px" class="fs-14 fw-700">
                  <th width="10%">排序</th>
                  <th width="15%">用户AR号</th>
                  <th width="15%">用户昵称</th>
                  <th width="15%">用户手机号</th>
                  <th width="15%">获得积分方式</th>
                  <th width="15%">获得积分时间</th>
                </tr>
              </thead>
              <tbody class="table-tbody">
                <tr
                  v-for="(item, index) in getIntegralArr"
                  :key="index"
                  class="fs-12"
                >
                  <td class="fw-700">{{ index + 1 }}</td>
                  <td class="p-t-10 p-b-10">{{ item.arNumber }}</td>
                  <td>{{ item.nickName }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.integralWay }}</td>
                  <td>
                    {{ item.createTime ? dateFormat(item.createTime) : "--" }}
                  </td>
            
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="clear"></div>
  </div>
</template>
<script src="../action/financial.js"></script>
<style lang='scss' scoped>
</style>