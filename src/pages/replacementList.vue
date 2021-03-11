<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">置换-置换商品</div>
    <el-card class="mb-20" v-for="(item, index) in listDataArr" :key="index">
      <el-row class="mb-20" type="flex" justify="space-between">
        <el-col :span="12" class="my-flex flex-l-center">
          <span class="hpc-left-title-img">
            <img src="@/assets/images/homeImg/dotsImg.png" alt="" />
          </span>
          <!-- <div class="hpc-left-title-con">{{ titleCo n }}</div> -->
          <span class="fs-16 fw-700 m-r-10">{{ item.replaceSupplierName }}</span><span class="fs-13">{{ item.num }}
            个商品</span>
        </el-col>
        <el-col :span="2">
          <span class="el-icon-caret-bottom" @click="changeShow(index)">{{
            showArr[index] ? "折叠" : "展开"
            }}</span>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="showArr[index]">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead class="orderC-th">
              <tr style="height: 60px" class="fs-14 fw-700">
                <th width="10%">序号</th>
                <th width="20%">商品名称</th>
                <th width="25%">可使用时间</th>
                <th width="20%">状态(上/下架)</th>
                <th width="25%">操作</th>
              </tr>
            </thead>
            <tbody class="table-tbody">
              <tr class="fs-12" v-for="(i, index) in item.replaceProducts" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ i.productName }}</td>
                <td class="p-t-10 p-b-10">24/h</td>
                <td>
                  <el-switch v-model="i.status" @change="whetherToEnable($event, i.id)" :active-value="0"
                    :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </td>
                <td>
                  <el-button type="primary" size="mini" round @click="configureQuantityPrice(i.id)">查看配置数量和价格</el-button>
                  <el-button type="info" size="mini" round @click="replaceProductDetail(i.id)">详情</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-collapse-transition>
    </el-card>
    <!-- 详情    -->
    <div>
      <el-dialog :close-on-click-modal="false" center title="置换-置换商品管理-详情" :visible.sync="aRModuleDialogVisible"
        width="60%" :before-close="handleClose">
        <el-form v-if="detailsData.replaceProduct">
          <div class="my-flex flex-l-center m-b-20">
            <div class="hpc-left-title-img m-r-10 ">
              <img src="@/assets/images/homeImg/dotsImg.png" alt="" />
            </div>
            <div class="fs-16 fw-700">
              {{ detailsData.replaceProduct.replaceSupplierName }}
            </div>
          </div>

          <div class="flex-between m-b-10">
            <div class="">
              <span class="d-in-b m-r-10"> 商家名称：</span>
              <span>{{ detailsData.replaceProduct.productName }}</span>
            </div>
            <div class="">
              <span class="d-in-b m-r-10"> 商品取消限制：</span>
              <span>{{ detailsData.replaceProduct.cancelLimit }}</span>
            </div>
            <div class="">
              <span class="d-in-b m-r-10"> 可使用时间：</span>
              <span>24/h</span>
            </div>
          </div>

          <div class="my-flex flex-l-center">
            <div class="d-in-b m-r-10">商品图片：</div>
            <div class="flex-1" v-if="detailsData.replaceProduct.productImages">
              <img v-for="(p,
                pIndex) in detailsData.replaceProduct.productImages.split(',')" :key="pIndex"
                class="wh-100a m-r-10 m-b-10" :src="p" alt="" srcset="" />
            </div>
          </div>
          <div class="m-b-5 my-flex">
            <div class="m-r-10">主要参数：</div>
            <div class="flex-1" v-if="
                detailsData.titleAndValuePOS &&
                  detailsData.titleAndValuePOS.filter((i) => i.paramType == 2)
                    .length > 0
              ">
              <div class="my-flex flex-wrap m-b-10" v-for="(rItem, rIndex) in detailsData.titleAndValuePOS.filter(
                  (i) => i.paramType == 2
                )" :key="rIndex">
                <div class="p-5 border-ra-6 bg-blue2 m-r-5 m-b-10 flex-l-center">
                  {{ rItem.paramName }}
                </div>
                <div class="flex-1 my-flex flex-wrap">
                  <div v-for="(pItem, pIndex) in rItem.paramValue" :key="pIndex"
                    class="p-5 border-ra-6 bg-blue1 m-r-5 m-b-10">
                    <img class="wh-60" :src="pItem" alt="" srcset="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-b-5 my-flex">
            <div class="m-r-10">次要参数：</div>
            <div class="flex-1" v-if="
                detailsData.titleAndValuePOS &&
                  detailsData.titleAndValuePOS.filter((i) => i.paramType == 3)
                    .length > 0
              ">
              <div class="my-flex flex-wrap m-b-10" v-for="(rItem, rIndex) in detailsData.titleAndValuePOS.filter(
                  (i) => i.paramType == 3
                )" :key="rIndex">
                <div class="p-5 border-ra-6 bg-blue2 m-r-5 m-b-10 flex-l-center">
                  {{ rItem.paramName }}
                </div>
                <div class="flex-1 my-flex flex-wrap">
                  <div v-for="(pItem, pIndex) in rItem.paramValue" :key="pIndex"
                    class="p-5 border-ra-6 bg-blue1 m-r-5 m-b-10">
                    {{ pItem }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-b-5 my-flex">
            <div class="m-r-10">标题参数:</div>
            <div class="flex-1" v-if="
                detailsData.titleAndValuePOS &&
                  detailsData.titleAndValuePOS.filter((i) => i.paramType == 4)
                    .length > 0
              ">
              <div class="my-flex flex-wrap m-b-10" v-for="(rItem, rIndex) in detailsData.titleAndValuePOS.filter(
                  (i) => i.paramType == 4
                )" :key="rIndex">
                <div class="p-5 border-ra-6 bg-blue2 m-r-5 m-b-10 flex-l-center">
                  {{ rItem.paramName }}
                </div>
                <div class="flex-1 my-flex flex-wrap">
                  <div v-for="(pItem, pIndex) in rItem.paramValue" :key="pIndex"
                    class="p-5 border-ra-6 bg-blue1 m-r-5 m-b-10">
                    {{ pItem }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-b-5 my-flex">
            <div class="m-r-10">说明参数:</div>
            <div class="flex-1" v-if="
                detailsData.titleAndValuePOS &&
                  detailsData.titleAndValuePOS.filter((i) => i.paramType == 5)
                    .length > 0
              ">
              <div class="my-flex flex-wrap m-b-10" v-for="(rItem, rIndex) in detailsData.titleAndValuePOS.filter(
                  (i) => i.paramType == 5
                )" :key="rIndex">
                <div class="p-5 border-ra-6 bg-blue2 m-r-5 m-b-10 flex-l-center">
                  {{ rItem.paramName }}
                </div>
                <div class="flex-1 my-flex flex-wrap">
                  <div v-for="(pItem, pIndex) in rItem.paramValue" :key="pIndex"
                    class="p-5 border-ra-6 bg-blue1 m-r-5 m-b-10">
                    {{ pItem }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-flex flex-l-center m-b-15">
            <div class="d-in-b m-r-10">购买必读：</div>
            <div class="flex-1" v-if="detailsData.replaceProduct.buyExplain" v-html="detailsData.replaceProduct.buyExplain">
            </div>
          </div>
          <el-form-item label="状态:">
            <el-radio disabled v-model="detailsData.replaceProduct.status" :label="0">上架</el-radio>
            <el-radio disabled v-model="detailsData.replaceProduct.status" :label="1">下架</el-radio>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <el-dialog title="查看配置数量和价格" center :close-on-click-modal="false" :visible.sync="dialogVisible" width="80%"
      :before-close="handleShow">
      <div id="calendar" v-if="dayLists.length > 0" style="min-height: 65vh;">
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li v-for="(item, index) in dayLists" :key="index" class="p-10 relative">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <div @dblclick="item.day.getMonth()+1 != currentMonth ? undefined : undefined"
              :class="[item.day.getFullYear() == new Date().getFullYear() && item.day.getMonth() == new Date().getMonth() && item.day.getDate() == new Date().getDate() ? 'blue' : '']" style="height: 100%;">
              <div class="text-align-r fs-12">
                <span v-if="item.day.getMonth()+1 != currentMonth" class="other-month">{{ item.day.getDate() }}</span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else>
                  <!--今天  同年同月同日-->
                  <span
                    v-if="item.day.getFullYear() == new Date().getFullYear() && item.day.getMonth() == new Date().getMonth() && item.day.getDate() == new Date().getDate()"
                    class="active">{{ item.day.getDate() }}</span>
                  <span v-else>{{ item.day.getDate() }}</span>
                </span>
              </div>
              <div class="fs-12 text-left" v-if="item.data.id">
                <div class="">总占位数：{{item.data.seatNum}}</div>
                <div class="">剩余数量：{{item.data.remainingSeatNum}}</div>
                <div class="">价格：<span class="red">¥{{item.data.price}}</span></div>
              </div>
            </div>
            <div class="absolute fs-12 p-10 show-border" v-if="item.isSelect">
              <div class="my-flex">
                <div  class="flex-1 text-align-r p-0 other-month-1 fs-20" v-if="item.day.getMonth()+1 != currentMonth">{{ item.day.getDate() }}</div>
                <div  class="flex-1 text-align-r fs-20" v-else>{{ item.day.getDate() }}</div>
              </div>
              <div class="m-b-5">
                <span class="d-in-b fs-12 m-r-5"><span class="red">*</span>总占位</span>
                <input class="inputOne" type="text" placeholder="请输入" @input="inputChange($event)" v-model="item.data.seatNum">
              </div>
              <div class="">
                <span class="d-in-b fs-12 m-r-5"><span class="red">*</span>价&nbsp;&nbsp;&nbsp;格</span>
                <input class="inputTwo" type="text" placeholder="请输入" @input="inputChange($event)" v-model="item.data.price">
              </div>
              <div class="my-flex m-t-15 flex-between p-l-10 p-r-10">
                <div class="el-icon-circle-close fs-12 calendar-btn pointer" v-if="item.data.id" @click="configurationNumDel(item.data)">删除</div>
                <div class="el-icon-circle-check fs-12 calendar-btn pointer" v-if="item.data.seatNum && item.data.price" @click="saveData(item.data)">保存</div>
              </div>
            </div>

          </li>
        </ul>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="handleShow">取 消</el-button>
        <el-button type="primary" @click="handleShow">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script src="../action/replacementListAction.js"></script>

<style lang="scss" scoped>
  /* /deep/.el-form-item__label {
    color: #999eb4;
    font-size: 20px;
  }

  /deep/.el-form-item__content {
    span {
      color: #000;
      font-size: 20px;
    }
  } */
  #calendar {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .month {
    width: 100%;
    background: #00B8EC;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 12%;
    height: 110px;
    font-size: 1rem;
    color: #000;
    border: 1px solid #ccc;
    border-top: none;
  }

  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .other-month-1 {
    color: gainsboro;
  }

  .days li:hover {
    background: rgba(150, 2, 12, 0.1);
  }
</style>