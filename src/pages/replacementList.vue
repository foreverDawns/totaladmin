<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">置换-置换商品</div>
    <el-card class="mb-20" v-for="(item, index) in listDataArr" :key="index">
      <el-row class="mb-20" type="flex" justify="space-between">
        <el-col :span="12">
          <span style="color: #333333; font-size: 23px">{{
            item.replaceSupplierName
          }}</span
          ><span style="color: #6aacf9; font-size: 16px"
            >{{ item.num }}个商品</span
          >
        </el-col>
        <el-col :span="2">
          <span class="el-icon-caret-bottom" @click="changeShow(index)">{{
            showArr[index] ? "折叠" : "展开"
          }}</span>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="showArr[index]">
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
                <th width="20%">商品名称</th>
                <th width="25%">可使用时间</th>
                <th width="25%">状态</th>
                <th width="25%">操作</th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr
                class="fs-12"
                v-for="(i, index) in item.replaceProducts"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ i.productName }}</td>
                <td class="p-t-10 p-b-10">{{ i.updateTime }}</td>
                <td>
                  <el-switch
                    v-model="i.status"
                    disabled
                    active-value="0"
                    inactive-value="1"
                  >
                  </el-switch>
                </td>
                <td>
                  <el-button type="info" round @click="details(i.id)"
                    >详情</el-button
                  >
                  <el-button type="primary" round @click="editARCon(i.id)"
                    >编辑</el-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-collapse-transition>
    </el-card>

    <div>
      <el-dialog
        :close-on-click-modal="false"
        center
        title="置换-置换商品管理-详情"
        :visible.sync="aRModuleDialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form>
          <el-row type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="商品名称：">
                <span>{{ detailsData.replaceProduct.productName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品取消限制：">
                <span>{{ detailsData.replaceProduct.cancelLimit }}</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="可使用时间：">
                <span>{{ detailsData.replaceProduct.createTime }}</span>
              </el-form-item></el-col
            >
          </el-row>
          <el-form-item label="商品照片:">
            <span>{{ detailsData.replaceProduct.productImages }}</span>
          </el-form-item>
          <el-form-item label="主要参数选择:">
            <span>{{ detailsData.replaceProduct.productImages }}</span>
          </el-form-item>
          <el-form-item label="次要参数:">
            <span>{{ detailsData.replaceProduct.productImages }}</span>
          </el-form-item>
          <el-form-item label="标题:">
            <span>{{ detailsData.replaceProduct.productImages }}</span>
          </el-form-item>
          <el-form-item label="购买必读:">
            <span>{{ detailsData.replaceProduct.buyExplain }}</span>
          </el-form-item>
          <el-form-item label="说明添加:">
            <span>{{ detailsData.replaceProduct.productImages }}</span>
          </el-form-item>
          <el-form-item label="状态:">
            <el-radio
              disabled
              v-model="detailsData.replaceProduct.status"
              :label="0"
              >上架</el-radio
            >
            <el-radio
              disabled
              v-model="detailsData.replaceProduct.status"
              :label="1"
              >下架</el-radio
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { startLoading, endLoading } from "@/common/util";
import { replaceProductListReplaceProductDetail } from "@/config/api.js";
export default {
  name: "",

  data() {
    return {
      detailsData: {
        replaceProduct: {},
      },
      aRModuleDialogVisible: false,
      showArr: [true, true],
      listDataArr: [
        {
          sulipperId: 1, // 店铺id
          replaceSupplierName: "1", //店铺名称
          num: 4, //商品数量
          replaceProducts: [
            {
              id: 1,
              replaceSulipperId: 1,
              productName: "本", //商品名称
              productImages: "1", //商品图片
              buyExplain: "别买", //购买商品必读
              status: 0, //商品状态 0   开启   1关闭

              cancelLimit: "123123", //商品取消限制
              createTime: "2021-01-25T14:23:43.000+0000",
              updateTime: "2021-02-03T14:32:05.000+0000",
              delFlag: 0,
              replaceSupplierName: null,
            },
            {
              id: 2,
              replaceSulipperId: 1,
              productName: "本1",
              productImages: "123232",
              buyExplain: "别买1",
              status: 0,
              cancelLimit: "123123",
              createTime: "2021-01-25T14:23:43.000+0000",
              updateTime: "2021-02-03T14:31:33.000+0000",
              delFlag: 0,
              replaceSupplierName: null,
            },
            {
              id: 3,
              replaceSulipperId: 1,
              productName: "大三大四的",
              productImages: "但是当时的",
              buyExplain: "sdsd",
              status: 0,
              cancelLimit: "dsdsdsdsd",
              createTime: "2021-02-01T16:46:30.000+0000",
              updateTime: "2021-02-01T16:46:30.000+0000",
              delFlag: 0,
              replaceSupplierName: null,
            },
            {
              id: 16,
              replaceSulipperId: 1,
              productName: "123456",
              productImages:
                "https://wanjia-image.oss-cn-beijing.aliyuncs.com/996904ca1baf49cab3219e11cb6df340.png,https://wanjia-image.oss-cn-beijing.aliyuncs.com/1eceaaa5af9d43af9b59c2d263db1cbd.png,https://wanjia-image.oss-cn-beijing.aliyuncs.com/39d11928d09f47dba1f99c2026f1d2dd.png",
              buyExplain: "<p>456456</p>",
              status: 0,
              cancelLimit: "19:00",
              createTime: "2021-02-03T11:08:08.000+0000",
              updateTime: "2021-02-03T14:16:40.000+0000",
              delFlag: 0,
              replaceSupplierName: null,
            },
          ],
        },
        {
          sulipperId: 2,
          replaceSupplierName: "2",
          num: 0,
          replaceProducts: [],
        },
      ],
    };
  },
  methods: {
    handleClose() {
      this.aRModuleDialogVisible = false;
    },
    changeShow(index) {
      this.showArr[index] = !this.showArr[index];
      this.$forceUpdate();
    },
    details(id) {
      startLoading();

      replaceProductListReplaceProductDetail({ id }).then((res) => {
        this.detailsData = res.data;
        this.aRModuleDialogVisible = true;

        endLoading();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
/deep/.el-form-item__label {
  color: #999eb4;
  font-size: 20px;
}
/deep/.el-form-item__content {
  span {
    color: #000;
    font-size: 20px;
  }
}
</style>