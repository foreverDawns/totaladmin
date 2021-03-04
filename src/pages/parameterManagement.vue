<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">置换-置换参数管理</div>
    <div class="m-b-20">
      <div class="my-flex flex-between width-500 fw-700">
        <div @click="changeModule(1)" :class="[
            titleType == '1' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]">
          <div class=""></div>
          <div class="color-fff">店铺参数管理</div>
        </div>
        <div @click="changeModule(2)" :class="[
            titleType == '2' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]">
          <div class=""></div>
          <div class="color-fff">商品参数管理</div>
        </div>
      </div>
      <div class="bg-568 p-10 border-ra-8">
        <div class="m-b-10">
          <div class="hpc-left-title">
            <div class="hpc-left-title-img">
              <img src="@/assets/images/homeImg/dotsImg.png" alt="" />
            </div>
            <div class="hpc-left-title-con">{{ titleCon }}</div>
          </div>
        </div>
        <div class="" v-if="titleType == 1 && shopParamList">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead class="orderC-th">
              <tr style="height: 40px;" class="fs-13">
                <th width="10%">序号</th>
                <th width="15%">参数标题</th>
                <th width="35%">参数选项</th>
                <th width="10%">状态</th>
                <th width="30%" class="fw-700">
                  <span class="red m-r-20 d-in-b">- 全部删除</span>
                  <span class="blue d-in-b" @click="shopEditAndAddCon()">+ 添加</span>
                </th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr v-for="(item, index) in shopParamList" :key="index" class="fs-12">
                <td>{{ index + 1 }}</td>
                <td class="">
                  {{ item.paramName }}
                </td>
                <td class="">
                  <div class="m-b-10" v-for="(i, d) in item.canshuPOS" :key="d">
                    <span class="">{{ i.paramValue }}： </span>
                    <span class="color-999">{{ i.content }}</span>
                  </div>
                </td>
                <td class="">
                  <el-switch v-model="item.delFlag" @change="onPublishGoods($event, item.titleId)" :active-value="0"
                    :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </td>
                <td class=" p-t-10 p-b-10">
                  <el-button type="danger" round size="mini" @click="onDeleteTitle(item.titleId)">删除</el-button>
                  <el-button type="primary" round size="mini" @click="shopEditAndAddCon(item)">编辑</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-l-50" v-if="titleType == 2 && mainParamList">
          <el-tabs class="" v-model="dataType" @tab-click="handleClick">
            <el-tab-pane name="2">
              <span slot="label" class="fs-14 fw-700">主要参数
                <span class="blue fs-16">{{ mainParamList.allNum }}</span></span>
              <div class="" v-if="mainParamList">
                <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
                  <thead class="orderC-th">
                    <tr style="height: 40px;" class="fs-13">
                      <th width="10%">序号</th>
                      <th width="15%">主要参数</th>
                      <th width="35%">参数 Icon</th>
                      <th width="10%">状态</th>
                      <th width="30%" class="fw-700">
                        <span class="red m-r-20 d-in-b">- 全部删除</span>
                        <span class="blue d-in-b" @click="shopEditAndAddCon()">+ 添加</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-tbody">
                    <tr v-for="(item, index) in mainParamList" :key="index" class="fs-12">
                      <td>{{ index + 1 }}</td>
                      <td class="">
                        {{ item.paramName }}
                      </td>
                      <td class="">
                        <div class="m-b-10 m-t-10" v-for="(i, d) in item.canshuPOS" :key="d">
                          <!-- <span class="">{{ i.content }}： </span> -->
                          <span class="color-999"><img :src="i.paramValue" class="wh-60" alt="" srcset=""></span>
                        </div>
                      </td>
                      <td class="">
                        <el-switch v-model="item.delFlag" @change="onPublishGoods($event, item.titleId)" :active-value="0"
                          :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                      </td>
                      <td class=" p-t-10 p-b-10">
                        <el-button type="danger" round size="mini" @click="onDeleteTitle(item.titleId)">删除</el-button>
                        <el-button type="primary" round size="mini" @click="shopEditAndAddCon(item)">编辑</el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3" selected="true">
              <span slot="label" class="fs-14 fw-700">次要参数
                <span class="blue fs-16">{{
                  mainParamList.pendingNum
                  }}</span></span>
              <div class="" v-if="secondParamList">
                <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
                  <thead class="orderC-th">
                    <tr style="height: 40px;" class="fs-13">
                      <th width="10%">序号</th>
                      <th width="15%">次要参数标题</th>
                      <th width="35%">次要参数内容</th>
                      <th width="10%">状态</th>
                      <th width="30%" class="fw-700">
                        <span class="red m-r-20 d-in-b">- 全部删除</span>
                        <span class="blue d-in-b" @click="shopEditAndAddCon()">+ 添加</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-tbody">
                    <tr v-for="(item, index) in secondParamList" :key="index" class="fs-12">
                      <td>{{ index + 1 }}</td>
                      <td class="">
                        {{ item.paramName }}
                      </td>
                      <td class="">
                        <div class="m-b-10" v-for="(i, d) in item.canshuPOS" :key="d">
                          <span class="">{{ i.paramValue }}</span>
                          <!-- <span class="color-999">{{ i.content }}</span> -->
                        </div>
                      </td>
                      <td class="">
                        <el-switch v-model="item.delFlag" @change="onPublishGoods($event, item.titleId)" :active-value="0"
                          :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                      </td>
                      <td class=" p-t-10 p-b-10">
                        <el-button type="danger" round size="mini" @click="onDeleteTitle(item.titleId)">删除</el-button>
                        <el-button type="primary" round size="mini" @click="shopEditAndAddCon(item)">编辑</el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4">
              <span slot="label" class="fs-14 fw-700">标题管理
                <span class="blue fs-16">{{
                  mainParamList.deliveryNum
                  }}</span></span>
              <div class="" v-if="supTitleList">
                <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
                  <thead class="orderC-th">
                    <tr style="height: 40px;" class="fs-13">
                      <th width="10%">序号</th>
                      <th width="15%">一级标题</th>
                      <th width="15%">二级标题</th>
                      <th width="20%">标题内容</th>
                      <th width="10%">状态</th>
                      <th width="30%" class="fw-700">
                        <span class="red m-r-20 d-in-b">- 全部删除</span>
                        <span class="blue d-in-b" @click="shopEditAndAddCon()">+ 添加</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-tbody">
                    <tr v-for="(item, index) in supTitleList" :key="index" class="fs-12">
                      <td>{{ index + 1 }}</td>
                      <td class="">
                        {{ item.paramName }}
                      </td>
                      <td class="">
                        <div class="m-b-10" v-for="(i, d) in item.canshuPOS" :key="d">
                          <span class="">{{ i.paramValue }}</span>
                          <!-- <span class="color-999">{{ i.content }}</span> -->
                        </div>
                      </td>
                      <td class="">
                        <div class="m-b-10" v-for="(i, d) in item.canshuPOS" :key="d">
                          <span class="color-999">{{ i.content }}</span>
                        </div>
                      </td>
                      <td class="">
                        <el-switch v-model="item.delFlag" @change="onPublishGoods($event, item.titleId)" :active-value="0"
                          :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                      </td>
                      <td class=" p-t-10 p-b-10">
                        <el-button type="danger" round size="mini" @click="onDeleteTitle(item.titleId)">删除</el-button>
                        <el-button type="primary" round size="mini" @click="shopEditAndAddCon(item)">编辑</el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </div>

    <div class="clear"></div>

    <!-- 店铺参数弹窗 -->
    <ParameterCom :shopModuleFlag="shopModuleFlag" @onShopToggleCon="onShopToggleCon"
      :onShopAddAndEditfunc="onShopAddAndEditfunc" :shopDetailJson="shopDetailJson" :dataType="dataType">
    </ParameterCom>
  </div>
</template>

<script src="../action/parameterManagementAction.js"></script>

<style lang="scss" scoped>
  .mingRen-con>p img,
  .mingRen-con>p video {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .order-img {
    height: 80px;
    width: auto;
  }

  .order-img img {
    /* width: 100%; */
    height: 100%;
  }
</style>