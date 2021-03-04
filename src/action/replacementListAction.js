import { startLoading, endLoading } from "@/common/util";
import { replaceProductList, replaceProductDetail, replaceProductPriceNumList, updateStatus } from "@/config/api.js";

// 2. 主要参数
// 3. 次要参数
// 4. 标题参数
// 5. 说明参数
export default {
  name: "replacementList",
  data() {
    return {
      detailsData: {
        replaceProduct: {},
      },
      aRModuleDialogVisible: false,
      showArr: [false, false],
      listDataArr: [],
      dialogVisible: false,
      productId: '',
      calendarData: [],//日历数据
      dayLists: [],//日历渲染数据
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      days: [],
      currentWeek: 1,
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
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    // 获取置换店铺列表及商品
    replaceProductList() {
      startLoading()
      replaceProductList().then(res => {
        endLoading()
        console.log(res)
        if (res.state == 0) {
          this.listDataArr = res.data
        } else {
          this.$message.error('请求失败，请刷新重试！')
        }
      }).catch(() => {
        this.$message.error('请求失败，请刷新重试！')
        endLoading()
      })
    },
    // 获取置换店铺列表及商品
    replaceProductDetail(id) {
      startLoading()
      replaceProductDetail({id: id}).then(res => {
        endLoading()
        console.log(res)
        if (res.state == 0) {
          this.detailsData = res.data;
          this.aRModuleDialogVisible = true;
        } else {
          this.$message.error('请求失败，请刷新重试！')
        }
      }).catch(() => {
        this.$message.error('请求失败，请刷新重试！')
        endLoading()
      })
    },
    // 是否启用
    whetherToEnable($event, id) {
      console.log($event, id)
      if ($event === 1) { //0 启用 1 禁用
        // 提示
        this.$confirm('此操作将禁用当前商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onWhetherToEnable(id)
        }).catch(() => {
          this.replaceProductList()
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        // 不需要提示
        this.onWhetherToEnable(id)
      }

    },
    // 是否启用
    onWhetherToEnable(id) {
      console.log(id)
      startLoading()
      updateStatus({ "id": id }).then(res => {
        endLoading()
        if (res.state === 0) {
          this.replaceProductList()
          this.$message({
            type: 'success',
            message: '更新成功！'
          })
        } else {
          this.replaceProductList()
          this.$message({
            type: 'error',
            message: '请求失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.replaceProductList()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      })
    },

    // 显示模块
    handleShow() {
      this.dialogVisible = !this.dialogVisible
    },

    // 获取配置数量和价钱
    replaceProductPriceNumList(data) {
      // console.log(id, status)
      return new Promise((resolve, reject) => {
        startLoading()
        replaceProductPriceNumList(data).then(res => {
          endLoading()
          if (res.state === 0) {
            this.calendarData = res.data
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },

    configureQuantityPrice(id, newDate = new Date()) {
      this.initData(newDate);
      this.productId = id
      this.dayLists = []
      const monthNum = `${this.currentYear}-${this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth  }`
      console.log(monthNum)
      const reqData = {
        "monthNum": monthNum,
        "productId": this.productId
      }
      startLoading()
      Promise.all([this.replaceProductPriceNumList(reqData)]).then(() => {
        console.log(this.calendarData)
        this.days.map(item => {
          item.data = {
            calendarDay: this.dateFormat(item.day, 'YYYY-MM-DD'),
            id: '',
            price: '',
            remainingSeatNum: '',
            replaceProductId: this.productId,
            seatNum: '',
            isSelect: false
          }
          this.calendarData.map(c => {
            if(this.dateFormat(item.day, 'YYYY-MM-DD') == c.calendarDay) {
              item.data = c
              item.data.isSelect = false
            }
          })
        })
        this.dayLists = this.days
        console.log(this.dayLists)
        // this.handleShow()
        this.dialogVisible = true
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请重试！'
        })
      });
    },
     // 日期代码
     initData(cur) {
      // let leftcount = 0; //存放剩余数量
      let date = new Date(cur);


      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str);
        d.setDate(d.getDate() - i);
        let dateObj = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dateObj.day = d;
        this.days.push(dateObj);//将日期放入data 中的days数组 供页面渲染使用


      }
      //其他周
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        let dataObj = {};
        dataObj.day = d;
        this.days.push(dataObj);
      }
      // console.log(this.days)
    },
    pickPre(year, month) {
      console.log(year, month,'左')
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      let d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      const newDate = this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
      this.configureQuantityPrice(this.productId, newDate)
      // this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext(year, month) {
      console.log(year, month,'右')
      let d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      const newDate = this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
      this.configureQuantityPrice(this.productId, newDate)
      // this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear(year, month) {
      console.log(year + "," + month);
    },

    // 返回 类似 2020-01-02 格式的字符串
    formatDate(year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d
    },
  },
  created () {
    this.replaceProductList()
  },
  mounted () {
    
  },
  watch: {
    
  }
};