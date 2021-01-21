<template>
  <div class="order-item-box">
    <div v-if="orderItem.length > 0">
      <!-- 表格 title -->
      <div :class="[checkoutFlg ? 'm-l-50' : '', 'order-item-title my-flex text-align-c fs-13 fw-700' ]">
        <div class="order-item-title-one">订单信息</div>
        <div class="order-item-title-two">订单总额</div>
        <div class="order-item-title-three">交易状态</div>
        <div class="order-item-title-four">收货人</div>
        <!-- <div class="order-item-title-five">操作</div> -->
      </div>

      <!-- orders list -->
      <div class="order-list-box m-b-10 m-l-5 m-r-5 my-flex" v-for="item in orderItem" :key="item.orderId">
        <div class="flex-h-center order-list-checkbox" v-if="checkoutFlg">  
          <el-checkbox v-model="item.checkboxFlag" @change="onChangeCheckBoxVal(item.checkboxFlag, item.orderId)" class=""></el-checkbox>
        </div>
        <div class="flex-1 order-list-box-item">
          <div class="order-id-box fs-14 fw-700 p-l-20 p-r-20">
            <span class="order-time m-r-20">{{ dateFormat(item.modifiedTime) }}</span>
            <span class="order-id">订单编号：{{ item.orderSn }}</span>
          </div>
          <div class="order-list-info my-flex">
            <div class="order-list-one flex-h-center my-flex">
              <div class="order-img p-l-20 m-r-20">
                <img :src="item.productImages" alt="" srcset="">
              </div>
              <div class="order-title-box fw-700 flex-1">
                <div class="order-title fs-16 m-b-15">{{ item.productName }}</div>
                <div class="order-title-size fs-14"> 规格：{{ item.productSpecValueName }}</div>
              </div>
              <div class="order-sell-num fs-16 fw-700">共{{ item.productNum }}件</div>
            </div>
            <div class="order-list-two flex-h-center  fw-700 fs-16">￥{{ item.orderMoney }}</div>
            <div class="order-list-three flex-h-center fw-700 fs-16">{{ item.orderStatusName }}</div>
            <div class="order-list-four fw-700 fs-16">
              <div class="mb-10" v-for="(sItem, sIndex) in item.shippingUser.split(',')" :key="sIndex">{{ sItem}}</div>
            </div>
            <!-- <div class="order-list-five flex-h-center">
              <router-link class="wh-50" :to="{name: 'ordersDetails', params:{id:`${item.orderId}`}}">
                <el-tooltip class="" effect="dark" content="详情" placement="top-start">
                  <el-button>
                    <img src="../../assets/images/ordersImg/ordersInfoImg.png" alt="" srcset="">
                  </el-button>
                </el-tooltip>
              </router-link>
              <router-link class="m-l-15 wh-50" v-if="item.orderStatus != 3" :to="{name: 'ordersSend', params:{id:`${item.orderId}`}}">
                <el-tooltip effect="dark" content="发货" placement="top">
                  <el-button>
                    <img src="../../assets/images/ordersImg/orderShipImgTwo.png" alt="" srcset="">
                  </el-button>
                </el-tooltip>
              </router-link>
            </div> -->
          </div>
        </div>
      </div>
      <el-checkbox v-if="checkoutFlg" v-model="checkboxAllFlag" @change="onChangeCheckBoxVal(checkboxAllFlag)" class="">全选</el-checkbox>
    </div>
    <!-- <div v-else>
      当前没有相关订单
    </div> -->
  </div>
</template>


<script src="../componentsAction/orderItemAction.js"></script>

<style lang="scss" scoped>
  .order-item-box {

    /* 表格 title */
    .order-item-title {
      height: 40px;
      align-items: center;

      .order-item-title-one {
        width: 535px;
      }

      .order-item-title-two {
        width: 135px;
      }

      .order-item-title-three {
        width: 135px;
      }

      .order-item-title-four {
        width: 300px;
      }

      .order-item-title-five {
        flex: 1;
      }
    }

    /* list */
    .order-list-box {

      .order-list-checkbox {
        height: auto;
        padding: 0 30px 0 10px;
      }

      .order-list-box-item {
        box-shadow: 0 0 5px 5px #e7e9ec;
        border-radius: 8px;

      }

      .order-list-box-item:hover {
        transform: scale(1.005);
        box-shadow: 0 0 5px 5px #d8dade;
      }

      .order-id-box {
        height: 40px;
        line-height: 40px;
        background: #f7f8fc;
      }

      .order-time {}

      .order-id {}

      .order-list-info {
        background: #fff;
        height: 100px;
        align-items: center;
        text-align: center;

        .order-list-one {
          width: 535px;
          border-right: 4px solid #f7f8fc;

          .order-img {
            width: 60px;
            border-radius: 15px;

            img {
              border-radius: 15px;
            }
          }

          .order-title-box {
            text-align: left;
          }

          .order-title {}

          .order-title-size {
            color: #999999;
          }

          .order-sell-num {
            width: 100px;
          }

        }

        .order-list-two {
          width: 135px;
          border-right: 4px solid #f7f8fc;
          justify-content: center;
        }

        .order-list-three {
          width: 135px;
          border-right: 4px solid #f7f8fc;
          justify-content: center;
        }

        .order-list-four {
          width: 300px;
          justify-content: center;
        }

        .order-list-five {
          flex: 1;
          border-left: 4px solid #f7f8fc;
          justify-content: center;

          .el-button {
            padding: 0px;
            border-radius: 50%;
            outline: none;
            background: #fff;
            border: none;
            margin-left: 0;
          }

          .el-button:hover {
            background: #ccc;
          }

        }
      }


    }


  }
</style>