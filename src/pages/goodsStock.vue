<template>
  <div class="stock-box bg-white border-ra-15">
    <div class="goods-class">
      <div class="hpc-left-title p-15">
        <div class="hpc-left-title-img">
          <img src="@/assets/images/homeImg/dotsImg.png" alt="">
        </div>
        <div class="hpc-left-title-con fs-26">商品库存</div>
        <div class="flex-1 text-align-r">
          <div class="goods-add float-r " @click="addStuck">
            <div class="goods-add-img"></div>
            <div class="goods-add-text">添加库存</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="dividing-line m-b-60"></div>
    <!-- 商品库存 -->
    <div class="goods-stock-con p-l-60">
      <div class="goods-stock-info my-flex border-ra-15 fw-700  m-b-60">
        <div class="goods-stock-info-img">
          <img class="border-ra-15" src="../assets/images/goodsImg/goodsImg.png" alt="" srcset="">
        </div>
        <div class="goods-stock-details p-l-60 flex-1 flex-between">
          <div class="gs-details-title fs-20">钱包女短款折叠学生可爱韩版</div>
          <div class="gs-details-price fw-700">
            <span class="red fs-16">￥</span>
            <span class="red fs-48">88.88</span>
          </div>
          <div class="gs-details-stock-num fs-48">现有库存：360</div>
        </div>

      </div>
      <!-- 数据展示 -->
      <div class="sales-data-box my-flex m-b-60">
        <!--  某月库存数据报告 -->
        <div class="data-report m-r-20 p-30 fw-700">
          <div class="data-report-title fs-32 m-b-60">9月库存数据报告</div>
          <div class="data-report-info flex">
            <div class="data-report-month flex-1 text-align-c">
              <div class="month-data-num fs-48">662</div>
              <div class="month-num fs-16">9月已销售</div>
            </div>
            <div class="purchase flex-1 text-align-c">
              <div class="purchase-num fs-48">350</div>
              <div class="purchase-date fs-16">17年9月进货</div>
            </div>
          </div>
        </div>
        <!-- 数据表 -->
        <div class="data-report-echarts flex-1 p-l-20 p-r-20" id="dataECharts" :style="{width: '100%', height: '400px'}">
          <!--  -->
        </div>
      </div>

    </div>

    <div class="m-t-20 p-50 m-b-60">
      <el-row class="box-center m-t-40 m-b-60">
        <el-button class="m-r-20" type="primary">提交</el-button>
        <el-button type="info">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script src="@/action/goodsStockAction.js"></script>

<style lang="scss" scoped>
  .stock-box {
    min-height: 100%;

    /* 商品添加库存按钮样式 */
    .goods-add {
      border-left: none;
    }

    .goods-add-img {
      background: url(../assets/images/goodsImg/goodsStockImgOne.png) no-repeat 100% 100%;
    }

    /* 添加产品分类 hover 事件 */
    .goods-add:hover {

      .goods-add-img {
        background: url(../assets/images/goodsImg/goodsStockImgTwo.png) no-repeat 100% 100%;
      }
    }

    /* 商品库存详情 */
    .goods-stock-con {

      /* 顶部 */
      .goods-stock-info {
        .goods-stock-info-img {
          width: 230px;
          height: 230px;

          img {
            width: 100%;
            height: 100%;
            box-shadow: 0 0 10px 10px #f0f0f0;

          }
        }

        .goods-stock-details {
          flex-direction: column;
        }

        .gs-details-title {}

        .gs-details-price {}

        .gs-details-stock-num {}
      }

      /* 数据报告 */
      .sales-data-box {

        .data-report {
          width: 430px;
          height: 330px;
          border: 4px solid #000;
          box-sizing: border-box;
          
          .data-report-title {
          }

          .data-report-info {}

          .data-report-month {
            border-right: 5px solid #000;
          }

          .month-data-num {}

          .month-num {}

          .purchase {}

          .purchase-num {}

          .purchase-date {}
        }



        /* 数据表 */
        .data-report-echarts {}
      }





    }



  }
</style>