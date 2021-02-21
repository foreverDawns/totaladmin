<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">置换-置换参数管理</div>
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
          <div class="color-fff">店铺参数管理</div>
        </div>
        <div
          @click="changeModule(2)"
          :class="[
            type == '2' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">商品参数管理</div>
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
                <th width="25%">参数标题</th>
                <th width="25%">参数选项</th>
                <th width="25%">状态</th>
                <th width="20%" class="blue fw-700" @click="addPoints()">
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
                <td>{{ item.specValueName }}</td>
                <td>{{ item.specValueName }}</td>

                <td>
                  <el-button type="info" round @click="deleteHHCon(item.specId)"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    round
                    @click="editARCon(item.specId)"
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
                <th width="10%">ar号</th>
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
                <td>{{ item.createTime }}</td>
                <td>{{ item.num }}</td>
                <td>{{ item.specValueName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="clear"></div>

    <!-- 分页 -->
    <div v-if="type == 1">
      <div
        class="fenye"
        v-if="ordersData && ordersData.orderList.data.length > 0"
      >
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ordersData.orderList.count"
        >
        </el-pagination>
      </div>
    </div>
    <div v-if="type == 2">
      <div
        class="fenye"
        v-if="evaluationData && evaluationData.commentList.data.length > 0"
      >
        <el-pagination
          @size-change="pageSizeChangeTwo"
          @current-change="pageChangeTwo"
          :current-page="pageIndexTwo"
          :page-size="pageSizeTwo"
          layout="total, sizes, prev, pager, next, jumper"
          :total="evaluationData.commentList.count"
        >
        </el-pagination>
      </div>
    </div>

    <div>
      <el-dialog
        :close-on-click-modal="false"
        center
        title="店铺参数添加"
        :visible.sync="aRModuleDialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="参数标题" prop="consume">
            <el-select
              v-model="ruleForm.levelSign"
              class="width-500"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数选项" prop="consumeNum">
            <el-select
              v-model="ruleForm.levelSign"
              class="width-500"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数选项" prop="recharge">
            <el-select
              v-model="ruleForm.levelSign"
              class="width-500"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
          <el-button @click="aRModuleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addARConFunc()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { startLoading, endLoading } from "@/common/util";
import { replaceParamTitlereplaceParamTitleList } from "@/config/api.js";
export default {
  name: "",
  data() {
    return {
      type: 1,
      listDataArr: [],
      pageIndex: 1,
      pageSize: 10,
      listTotal: "",
      listDataArr2: "",
      ordersData: "",
      evaluationData: "",
      pageIndexTwo: "",
      pageSizeTwo: "",
    };
  },
  mounted() {
    this.getlist(1);
  },
  methods: {
    changeModule(val) {
      this.type = val;
    },
    getlist(type) {
      startLoading();
      replaceParamTitlereplaceParamTitleList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        paramType: type,
      }).then((res) => {
        console.log(res);
        endLoading();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>