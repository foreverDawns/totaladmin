<template>
  <div class="block">
    <!-- 产品列表 -->
    <div v-if="goodsListStyle" class="goods-box goods-box-one" v-loading="loading">
      <ul class="goods-ul">
        <li class="goods-li" v-for="item in goodsLists" :key="item.id">
          <div class="goods-img-box">
            <img class="goods-img" :src="item.image.split(',')[0]" alt="" srcset="">
          </div>
          <div class="goods-setting">
            <router-link :to="{name: 'goodsAddAndEdit', params:{id:`${item.spuId}`}}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button>
                  <img src="../assets/images/goodsImg/goodsEdit.png" alt="" srcset="">
                </el-button>
              </el-tooltip>
            </router-link>
            <!-- <router-link :to="{name: 'goodsStock', params:{id:`${item.stock}`}}">
              <el-tooltip class="item" effect="dark" content="库存" placement="top">
                <el-button>
                  <img src="../assets/images/goodsImg/goodsStock.png" alt="" srcset="">
                </el-button>
              </el-tooltip>
            </router-link> -->
            <el-tooltip class="item" v-if="item.isMarketable == '1'" effect="dark" content="下架" placement="top-end">
              <el-button @click="onOffShelfGoods(0, item.spuId)">
                <img src="../assets/images/goodsImg/goodsOffShelf.png" alt="" srcset="">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item rotate-180" v-if="item.isMarketable == '0'" effect="dark" content="上架" placement="top-end">
              <el-button @click="onOffShelfGoods(1, item.spuId)">
                <img src="../assets/images/goodsImg/goodsOffShelf.png" alt="" srcset="">
              </el-button>
            </el-tooltip>
          </div>
          <div class="goods-monthly">
            <div class="goods-monthly-left">
              <span class="goods-monthly-left-coin">￥</span>
              <span class="goods-monthly-left-price">{{ item.salePrice }}</span>
            </div>
            <div class="goods-monthly-right">月销售{{ item.saleNum }}个</div>
          </div>
          <div class="goods-con">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <!-- 样式 二 -->
    <div v-if="!goodsListStyle" class="goods-box goods-box-two m-b-60" v-loading="loading">
      <div class="goods-class">
        <div class="hpc-left-title p-15">
          <div class="hpc-left-title-img">
            <img src="@/assets/images/homeImg/dotsImg.png" alt="">
          </div>
          <div class="hpc-left-title-con fs-26">列表查看</div>
        </div>
      </div>
      <template>
        <el-table :data="goodsLists" style="width: 100%" :stripe="true">
          <el-table-column align="center" label="图片" width="180">
            <template slot-scope="scope">
              <img class="two-img" :src="scope.row.image.split(',')[0]" alt="" srcset="">
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="商品" width="180">
            <template slot-scope="scope">
              <span class="fw-700">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="category1Name" label="商品分类">
            <template slot-scope="scope">
              <span class="fs-16 fw-700">{{scope.row.category1Name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="价格" prop="salePrice">
            <template slot-scope="scope">
              <span class="red fs-16 fw-700">￥</span>
              <span class="red fs-28 fw-700">{{scope.row.salePrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="saleNum" label="销售量">
            <template slot-scope="scope">
              <span class="fs-16 fw-700">{{scope.row.saleNum}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isMarketableName" label="状态">
            <template slot-scope="scope">
              <span class="fs-13 fw-700">{{scope.row.isMarketableName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="statusName" label="审核状态">
            <template slot-scope="scope">
              <div class="fs-13 fw-700 two-approval-status">{{scope.row.statusName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="approvalStatus" label="操作" width="200">
            <template slot-scope="scope">
              <!-- <span class="fs-16 fw-700">{{scope.row.isMarketable}}</span> -->
              <div class="goods-setting">
                <router-link :to="{name: 'goodsAddAndEdit', params:{id:`${scope.row.spuId}`}}">
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                    <el-button>
                      <img src="../assets/images/goodsImg/goodsEdit.png" alt="" srcset="">
                    </el-button>
                  </el-tooltip>
                </router-link>
                <!-- <router-link :to="{name: 'goodsStock', params:{id:`${scope.row.stock}`}}">
                  <el-tooltip class="item" effect="dark" content="库存" placement="top">
                    <el-button>
                      <img src="../assets/images/goodsImg/goodsStock.png" alt="" srcset="">
                    </el-button>
                  </el-tooltip>
                </router-link> -->
                <el-tooltip class="item" effect="dark" v-if="scope.row.isMarketable == '1'" content="下架" placement="top-end">
                  <el-button @click="onOffShelfGoods(0, scope.row.spuId)">
                    <img src="../assets/images/goodsImg/goodsOffShelf.png" alt="" srcset="">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item rotate-180" v-if="scope.row.isMarketable == '0'" effect="dark" content="上架" placement="top-end">
                  <el-button @click="onOffShelfGoods(1, scope.row.spuId)">
                    <img src="../assets/images/goodsImg/goodsOffShelf.png" alt="" srcset="">
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="fenye" v-if="goodsLists.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="goodsTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script src="../action/goodsManageAction.js"></script>

<style lang="scss" scoped>
  /* 产品列表 */
  .goods-box-one {
    .goods-ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .goods-li {
      width: 21%;
      background: #fff;
      border-radius: 8px;
      margin: 20px 0;
      padding: 15px;
    }

    .goods-img-box {
      text-align: center;
    }

    .goods-img {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .goods-li:hover {
      .goods-img {
        transform: translateY(-40px);
      }
    }

    .goods-setting {
      margin-top: -40px;
      text-align: center;
    }

    .el-button {
      padding: 10px;
      border-radius: 50%;
      outline: none;
      background: #fff;
      border: none;
      margin-left: 0;
    }

    .el-button:hover {
      background: #ccc;
    }

    .goods-monthly {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 10px;

      .goods-monthly-left {
        font-weight: 700;
        font-style: normal;
        color: #FA6130;
      }

      .goods-monthly-left-coin {
        font-size: 16px;
      }

      .goods-monthly-left-price {
        font-size: 28px;
      }

      .goods-monthly-right {
        font-size: 12px;
        color: #999999;
      }

    }

    .goods-con {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      margin-top: 5px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }


  }



  /* 产品二样式 */
  .goods-box-two {
    min-height: 80%;
    background: #fff;
    border-radius: 15px;

    .two-img {
      width: 90px;
      height: 90px;
      border-radius: 8px;
    }

    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid #EBEEF5;
    }

    .two-approval-status {
      width: 75px;
      height: 30px;
      color: #fff;
      background: #999999;
      border-radius: 15px;
      line-height: 30px;
      margin: 0 auto;
    }

    .goods-setting {
      /* width: 100%; */
      /* height: 100px; */
      /* margin-top: -40px; */
      /* background-color: black; */
      /* text-align: center; */
    }

    .el-button {
      padding: 10px;
      border-radius: 50%;
      outline: none;
      background: none;
      border: none;
      margin-left: 0;
    }

    .el-button:hover {
      background: #ccc;
    }

  }

  /* 分页器 */
  .el-pagination {
    text-align: center;
  }

  .el-input__inner {
    border-radius: 15px;
    background: red;
  }

  .btn-prev {
    /* border-top-left-radius: 15px; */
  }

  .btn-next {}
</style>