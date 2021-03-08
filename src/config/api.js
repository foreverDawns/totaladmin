import axios from 'axios'
// import { Loading, Message } from 'element-ui'
// import router from '../router/index.js'


axios.defaults.baseURL = process.env.VUE_APP_URL

//设置超时时间
axios.defaults.timeout = 25000;
// post请求头
axios.defaults.headers.post['Content-Type']
// axios拦截器
axios.interceptors.request.use(function (config) {
    console.log(config)
    // 将token给到一个前后台约定好的key中，作为请求发送
    let token = localStorage.getItem('totaladmintoken')
    if (token) {
        // config.headers['Authorization'] = token
        config.headers['token'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// 登录验证
export const checkUser = params => {
    try {
        return axios.post('login/login', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 退出登录验证
export const onLoginOut = params => {
    try {
        return axios.post('logout/logout', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 产品列表
// 获取产品列表
export const goodsQueryAll = params => {
    try {
        return axios.post('/tbSpu/queryAll', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 产品添加
export const goodsAdd = params => {
    try {
        return axios.post('/tbSpu/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除产品
export const goodsDelete = params => {
    try {
        return axios.post('/tbSpu/delete', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 更新产品
export const goodsUpdate = params => {
    try {
        return axios.post('/tbSpu/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 更新产品上下架状态
export const goodsUpdateStatus = params => {
    try {
        return axios.post('/tbSpu/updateMarktableStatus', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取产品详情
export const getGoodsDetails = params => {
    try {
        return axios.post('/tbSpu/queryById', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取产品分类
export const goodsClassAll = params => {
    try {
        return axios.post('/tbCategory/queryAll', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取产品规格
export const goodsSpecValue = params => {
    try {
        return axios.post('/goodsSpecValue/queryAll', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品评价
export const goodsEvaluationList = params => {
    try {
        return axios.post('/goodsEvaluation/queryAll', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品评价详情
export const goodsEvaluationInfo = params => {
    try {
        return axios.post('/goodsEvaluation/queryById', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 获取商品评价详情
export const evaluationSubmit = params => {
    try {
        return axios.post('/goodsEvaluation/submit', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品售后列表
export const afterSaleManagement = params => {
    try {
        return axios.post('/orderMaster/afterSaleManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品参数列表
export const queryAllBySupplierId1 = params => {
    try {
        return axios.post('/sellerGoodsParm/queryAllBySupplierId', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 添加商品参数列表
export const addBySupplierId1 = params => {
    try {
        return axios.post('/sellerGoodsParm/addBySupplierId', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 更新商品参数列表
export const updateBySupplierId1 = params => {
    try {
        return axios.post('/sellerGoodsParm/updateBySupplierId', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除商品参数列表
export const deleteBySupplierId1 = params => {
    try {
        return axios.post('/sellerGoodsParm/deleteBySupplierId', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 商品订单
// 获取商品订单列表
export const orderManagement = params => {
    try {
        return axios.post('/orderMaster/orderManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品订单列表详情
export const orderDetails = params => {
    try {
        return axios.post('/orderDetail/orderManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品订单代发货管理
export const shippingManagement = params => {
    try {
        return axios.post('/orderMaster/ShippingManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 商品订单发货
export const shippingOrder = params => {
    try {
        return axios.post('/orderMaster/FaHuo', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取订单物流详情
export const queryExpress = params => {
    try {
        return axios.post('/expressLog/queryExpress', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 首页
// 商家端订单量
export const orderVolume = params => {
    try {
        return axios.post('/orderMaster/orderVolume', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 商家端总金额
export const totalAmount = params => {
    try {
        return axios.post('/orderMaster/totalAmount', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 近7天零售量统计
export const salesVolume = params => {
    try {
        return axios.post('/orderMaster/salesVolume', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 近7天收入统计、财务
export const qiDaysIncome = params => {
    try {
        return axios.post('/orderMaster/qiDaysIncome', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}


// 以上是中台的api



// 商家管理
// 获取公司、店铺列表
export const sellerCompanyList = params => {
    try {
        return axios.post('/replaceSeller/sellerCompanyList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取入驻公司下面所有的商家信息
export const sellerListByCompanyId = params => {
    try {
        return axios.post('/seller/commonSuppliers', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取店铺下的产品
export const sellerGoodsList = params => {
    try {
        return axios.post('/sellerManagement/GoodsList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 上下架商品
export const goodsUpDownt = params => {
    try {
        return axios.post('/sellerManagement/upDown', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取公司、店铺商品
export const sellerDetail = params => {
    try {
        return axios.post('/seller/sellerDetail', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 添加公司
export const sellerAdd = params => {
    try {
        return axios.post('/seller/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 店铺冻结和解冻
export const sellerState = params => {
    try {
        return axios.post('/seller/sellerState', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 店铺更新
export const sellerUpdate = params => {
    try {
        return axios.post('/seller/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取公司订单列表
export const sellerOrderList = params => {
    try {
        return axios.post('/sellerOrder/sellerOrderList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取公司评价列表
export const commentsList = params => {
    try {
        return axios.post('/Comments/commentsList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取公司申述列表
export const auditCommentsList = params => {
    try {
        return axios.post('/Comments/auditcommentsList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 同意/拒绝商家申述列表
export const commentAudit = params => {
    try {
        return axios.post('/Comments/commentAudit', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品规格列表
export const specList = params => {
    try {
        return axios.post('/goodsSpec/specList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品规格详情
export const specDetail = params => {
    try {
        return axios.post('/goodsSpec/specDetail', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 商品更新规格
export const updateSpec = params => {
    try {
        return axios.post('/goodsSpec/updateSpec', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 添加商品规格列表
export const addSpecAndValue = params => {
    try {
        return axios.post('/goodsSpec/addSpecAndValue', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除规格属性下面的属性value值
export const deleteSpecValue = params => {
    try {
        return axios.post('/goodsSpec/deleteSpecValue', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除规格
export const deleteSpec = params => {
    try {
        return axios.post('/goodsSpec/deleteSpec', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取商品分类列表
export const categoryList = params => {
    try {
        return axios.post('/category/categoryList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 修改商品分类列表
export const categoryUpdate = params => {
    try {
        return axios.post('/category/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 添加商品分类列表
export const categoryAdd = params => {
    try {
        return axios.post('/category/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 删除商品分类列表
export const categoryDel = params => {
    try {
        return axios.post('/category/del', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取优惠券列表
export const couponList = params => {
    try {
        return axios.post('/sellerCoupon/couponList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 积分消费 列表

export const integralMatchingList = params => {
    try {
        return axios.post('/integral/integralMatchingList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 积分消费添加配比

export const integralintegralMatching = params => {
    try {
        return axios.post('/integral/integralMatching', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 积分明细

export const integralGainintegralSubsidiary = params => {
    try {
        return axios.post('/integralGain/integralSubsidiary', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 积分管理列表

export const integralintegralManagement = params => {
    try {
        return axios.post('/integral/integralManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 新用户，扫描，签到，一级分销，二级分销获得

export const integralnewUserManagement = params => {
    try {
        return axios.post('/integral/newUserManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}


// 失效天数

export const integralsetOverdueNumber = params => {
    try {
        return axios.post('/integral/setOverdueNumber', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 会员设置


export const membersSetmembersSet = params => {
    try {
        return axios.post('/membersSet/membersSet', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 会员设置列表


export const memberList = params => {
    try {
        return axios.post('/membersSet/membersSetList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 会员设置修改


export const memberUpdate = params => {
    try {
        return axios.post('/membersSet/updateMembersSet', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 置换商品列表
export const replaceProductList = params => {
    try {
        return axios.post('/replaceProductList/ReplaceProductList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 置换商品详情
export const replaceProductDetail = params => {
    try {
        return axios.post('/replaceProductList/ReplaceProductDetail', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 置换商品状态更新
export const updateStatus = params => {
    try {
        return axios.post('/replaceProductList/updateStatus', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 配置数量和价格
export const replaceProductPriceNumList = params => {
    try {
        return axios.post('/replaceProductPriceNum/ReplaceProductPriceNumList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 置换公司管理列表
export const replaceProductPriceNumReplaceProductPriceNumList = params => {
    try {
        return axios.post('/replaceProductPriceNum/ReplaceProductPriceNumList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 置换公司管理添加
export const reliaceSelleraddSeller = params => {
    try {
        return axios.post('/reliaceSeller/addSeller', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}




// 置换参数列表
export const replaceParamTitleList = params => {
    try {
        return axios.post('/replaceParamTitle/replaceParamTitleList', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 签到积分
// 积分管理删除
export const delIntegralSetting = params => {
    try {
        return axios.post('/integral/delIntegralSetting', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 积分保存
export const newUserManagement = params => {
    try {
        return axios.post('/integral/newUserManagement', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
//  积分  新用户获得 详情列表
export const queryRegisterList = params => {
    try {
        return axios.post('/integral/queryRegisterList ', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
//  邀请积分 获取奖励列表
export const sysBlindBoxgetPrize = params => {
    try {
        return axios.post('/sysBlindBox/getPrize', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 邀请积分 列表详情
export const sysBlindBoxList = params => {
    try {
        return axios.post('/sysBlindBox/list', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 邀请积分 修改
export const sysBlindBoxUpdate = params => {
    try {
        return axios.post('/sysBlindBox/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 邀请积分 添加
export const sysBlindBoxAdd = params => {
    try {
        return axios.post('/sysBlindBox/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 邀请积分 删除
export const sysBlindBoxDel = params => {
    try {
        return axios.post('/sysBlindBox/del', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}


// 添加置换参数列表
export const addGoodsTitle = params => {
    try {
        return axios.post('/replaceParamTitle/goodsEditor', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 根据商家id获取商品
export const getGoodsInfo  = params => {
        try {
            return axios.post('/integral/getGoodsInfo', params).then(res => res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
// 获取店铺信息id和name
export const getSupplierInfo  = params => {
    try {
        return axios.post('/integral/getSupplierInfo', params).then(res => res.data)

    } catch (error) {
        return Promise.reject(error)
    }
}

// 修改置换参数列表
export const updateParamTitle = params => {
    try {
        return axios.post('/replaceParamTitle/updateParamTitle', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 删除积分消费配比
export const delMatchingInfo  = params => {
    try {
        return axios.post('/integral/delMatchingInfo', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 启用禁用参数标题
export const disableTitle = params => {
    try {
        return axios.post('/replaceParamTitle/disableTitle', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 会员等级下拉
export const MembersSet  = params => {
    try {
        return axios.post('/integral/queryIntegralMembersSet', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除参数标题
export const deleteTitle = params => {
    try {
        return axios.post('/replaceParamTitle/deleteTitle', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 系统设置 API
// 获取用户列表
export const adminSysUserList = params => {
    try {
        return axios.post('/adminSysUser/list', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 修改用户列表
export const adminSysUserUpdate = params => {
    try {
        return axios.post('/adminSysUser/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 添加用户
export const adminSysUserAdd = params => {
    try {
        return axios.post('/adminSysUser/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除添加用户
export const adminSysUserDel = params => {
    try {
        return axios.post('/adminSysUser/del', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除添加用户
export const adminSysUserStatus = params => {
    try {
        return axios.post('/adminSysUser/updateStatus', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 获取角色列表
export const adminRoleList = params => {
    try {
        return axios.post('/adminSysRole/list', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 更新角色
export const updateRole = params => {
    try {
        return axios.post('/adminSysUser/updateRole', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 添加角色
export const roleAdd = params => {
    try {
        return axios.post('/adminSysRole/add', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 更新角色
export const roleUpdate = params => {
    try {
        return axios.post('/adminSysRole/update', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 删除角色
export const roleDelete = params => {
    try {
        return axios.post('/adminSysRole/del', params).then(res => res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

// 文件上传
export const fileUpdate = axios.defaults.baseURL + '/upload'