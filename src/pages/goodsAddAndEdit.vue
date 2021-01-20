<template>
  <div class="goods-edit">
    <div class="hpc-left-title">
      <div class="hpc-left-title-img">
        <img src="@/assets/images/homeImg/dotsImg.png" alt="">
      </div>
      <div class="hpc-left-title-con fs-26">{{headerTitle}}</div>
    </div>
    <!-- 添加 & 修改产品 -->
    <div class="edit-box">
      <div class="edit-box-little-title">1、商品基本信息</div>
      <!-- 商品分类 -->
      <div class="goods-class-box m-b-15">
        <div class="goods-class-title"><span class="red">* </span>商品分类：</div>
        <div class="goods-class-input-box">
          <el-cascader v-model="goodsDetailsData.category" clearable :options="classOptionsArr"></el-cascader>
        </div>
      </div>
      <!-- 商品名称： -->
      <div class="m-b-15 goods-class-box">
        <div class="goods-class-title"><span class="red">* </span>商品名称：</div>
        <el-input class="width-500" type="text" placeholder="请输入商品名称" v-model="goodsDetailsData.name" maxlength="24"
          show-word-limit>
        </el-input>
      </div>
      <!-- 商品副标题： -->
      <div class="m-b-15 goods-class-box">
        <div class="goods-class-title"><span class="red">* </span>商品副标题：</div>
        <el-input class="width-500" type="text" placeholder="请输入商品副标题" v-model="goodsDetailsData.caption" maxlength="24"
          show-word-limit>
        </el-input>
      </div>
      <!-- 商品图片： -->
      <div class="m-b-15">
        <div class="goods-class-box m-b-15">
          <div class="goods-class-title"><span class="red">* </span>商品副标题：</div>
          <div class="goods-img-text">宝贝图片尺寸： 800*800px，主图大小不能超过800k.</div>
        </div>
        <div class="goods-img-box">
          <el-upload :action="fileUpdate" :limit="limit" list-type="picture-card"
          :file-list="fileList" :on-remove="handleRemove" multiple
          :on-success='uploaderSuccess' :on-exceed="handleExceed" :beforeUpload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
         
        </div>
      </div>
      <!-- 商品规格： -->
      <div class="m-b-15">
        <div class="goods-class-box m-b-15">
          <div class="goods-class-title"><span class="red">* </span>商品规格：</div>
          <!-- <div class="goods-img-text">
            <el-radio v-model="goodsRadio" label="1">需要规格</el-radio>
            <el-radio v-model="goodsRadio" label="2">不需要规格</el-radio>
          </div> -->
        </div>
        <div class="goods-img-box goods-specification-box">
          <!-- 表格 -->
          <div v-if="goodsSpecValueArr.length > 0">
            <SkuForm ref="skuForm" :theme="theme" :source-attribute="goodsSpecValueArr" separator="," :attribute.sync="goodsDetailsData.attribute" :sku.sync="goodsDetailsData.sku" :structure="structure">
              <template #price="slotProps">
                {{ slotProps.row.price }}
              </template>
              <template #price="slotProps">
                {{ slotProps.row.salePrice }}
              </template>
              <template #price="slotProps">
                {{ slotProps.row.num }}
              </template>
            </SkuForm>
          </div>
          <!-- <div v-if="goodsSpecValueArr.length > 0 && goodsDetailsData.attribute">
            <SkuForm ref="skuForm" :theme="theme" :source-attribute="goodsSpecValueArr" separator="," :attribute="goodsDetailsData.attribute" :sku="goodsDetailsData.sku" :structure="structure">
              <template #price="slotProps">
                {{ slotProps.row.price }}
              </template>
              <template #price="slotProps">
                {{ slotProps.row.salePrice }}
              </template>
              <template #price="slotProps">
                {{ slotProps.row.num }}
              </template>
            </SkuForm>
          </div> -->
        </div>
      </div>
      <!-- 原价 -->
      <!-- <div class="m-b-15 goods-class-box">
        <div class="goods-class-title">原价：</div>
        <el-input class="width-140" type="number" clearable placeholder="原价" v-model="originalPriceInputVal">
        </el-input>
      </div> -->
      <!-- 赠送积分： -->
      <!-- <div class="m-b-15 goods-class-box">
        <div class="goods-class-title"><span class="red">* </span>赠送积分：</div>
        <el-input class="width-140" type="number" clearable placeholder="赠送积分" v-model="giftPointsInputVal">
        </el-input>
        <div class="fs-13 color-999 fw-700 m-l-15">填入数字，若设为X，则赠送用户积分为实际商品款项*X</div>
      </div> -->
      <!-- 商品详情 -->
      <div class="m-b-15 goods-class-box goods-detail">
        <div class="goods-class-title"><span class="red">* </span>商品详情：</div>
        <!-- <quill-editor ref="textAreaVal" placeholder='' v-model="textAreaValContent" class="myQuillEditor"
          :options="editorOption" /> -->
          <el-upload :action="fileUpdate" :limit="limitTwo" list-type="picture-card"
          :file-list="fileListTwo" :on-remove="handleRemoveTwo"
          :on-success='uploaderSuccessTwo' :on-exceed="handleExceedTwo" :beforeUpload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
    <div class="edit-box">
      <div class="edit-box-little-title">2、商品物流服务</div>
      <!-- 选择运费模块 -->
      <div class="goods-class-box m-b-15 freight-module">
        <div class="goods-class-title"><span class="red">* </span>实名认证：</div>
        <div class="goods-class-input-box">
          <el-select class="width-150 m-b-15" filterable v-model="freightModuleVal" clearable placeholder="选择运费模块">
            <el-option v-for="item in freightModuleArr" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
          <div class=" m-b-15">
            <el-radio-group v-model="quickWayVal">
              <el-radio-button class="quick-way-btn" fill="red" v-for="(item, index) in quickWayArr" :key="index"
                :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="fs-13 color-999 fw-700">默认运费： 5件内12元. 每增加2件，加5元.</div>
        </div>
      </div>
    </div>
    <div class="edit-box">
      <div class="edit-box-little-title">3、售后信息设置</div>
      <!-- 3、售后信息设置 -->
      <div class="goods-class-box m-b-15">
        <div class="goods-class-title"></div>
        <!-- 7天无理由退换 -->
        <div class="goods-class-input-box">
          <el-checkbox-group v-model="checkList7day">
            <el-checkbox label="true">7天无理由退换</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="edit-box">
      <div class="edit-box-little-title">4、商品其他信息</div>
      <!-- 3、售后信息设置 -->
      <!-- <div class="goods-class-box m-b-15">
        <div class="goods-class-title">库存计数：</div> -->
        <!-- 7天无理由退换 -->
        <!-- <div class="goods-class-input-box">
          <el-checkbox-group v-model="inventoryReduction">
            <el-checkbox label="true">买家拍下减库存</el-checkbox>
          </el-checkbox-group>
        </div>
      </div> -->
      <!-- 上架时间： -->
      <div class="goods-class-box m-b-15 freight-module">
        <div class="goods-class-title"><span class="red">* </span>上架时间：</div>
        <div class="goods-class-input-box">
          <el-checkbox-group v-model="putShelfVal">
            <el-checkbox label="1">立即上架</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="dividing-line m-b-15 m-t-20"></div>
      <el-row class="box-center m-t-40 m-b-60">
        <el-button class="m-r-20" type="primary" @click="goodsDetailsSubmit">提交</el-button>
        <span @click="goBack"><el-button type="info">取消</el-button></span>
        
      </el-row>
    </div>
  </div>
</template>

<script src="../action/goodsAddAndEditAction.js"></script>

<style lang="scss" scoped>
  .goods-edit {
    background: #fff;
    min-height: 100%;
    height: auto;
    padding: 15px;
    border-radius: 15px;

    /* 添加 & 修改产品 */
    .edit-box {
      margin-top: 10px;
      padding-left: 20px;

      .edit-box-little-title {
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        margin-bottom: 20px;
      }

      .goods-class-box {
        display: flex;
        align-items: center;

        .goods-class-input-box {}

        /* .goods-class-input {
          width: 120px;
          margin-right: 20px;
        } */
      }

      .goods-class-title {
        color: #999;
        font-weight: 700;
        font-size: 14px;
        margin-right: 10px;
        width: 110px;
        text-align: right;
      }

      /* 商品名称 商品副标题*/

      /* 商品图片 */
      .goods-img-text {
        font-weight: 700;
        font-style: normal;
        font-size: 12px;
        color: #999999;
      }

      .goods-img-box {
        padding-left: 120px;
      }

      /* 商品规格 */
      .goods-specification-box {
        .goods-specification {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
        }

        .el-tag+.el-tag {
          margin-left: 10px;
        }

        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }

        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }

        .specification-title {
          font-weight: 700;
          font-size: 12px;
          margin: 5px 0 10px;
        }
      }

      /* 商品详情 */
      .goods-detail {
        display: flex;
        align-items: normal;
        /* height: 470px; */
      }

    }

    /* 选择运费模块 */
    .freight-module {
      display: flex;
      align-items: normal !important;
    }

    .quick-way-btn {
      /* border: none; */
    }


  }
</style>