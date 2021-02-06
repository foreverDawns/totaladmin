<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">商城管理-商品分类</div>
    <div class="p-t-10 p-b-10 text-align-c my-flex">
      <div class="flex-1"></div>
      <div class=" blue fs-16 width-140 pointer fw-700" @click="editARCon({})">
        + 添加分类
      </div>
    </div>
    <el-table :data="listDataArr.chindList" style="width: 100%;margin-bottom: 20px;" row-key="id" border accordion
      :tree-props="{children: 'childCategoryList', hasChildren: 'false'}">
      <el-table-column type="" label="序号" align="center" width="60">
        <template slot-scope="scope">
          <div :class="[scope.row.floor == 1 ? 'blue' : scope.row.floor == 2 ? 'yellow' : 'red', 'fw-700 fs-20']">
            {{scope.row.index}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" width="300">
      </el-table-column>
      <el-table-column align="center" label="层级">
        <template slot-scope="scope">
          <div :class="[scope.row.floor == 1 ? 'blue' : scope.row.floor == 2 ? 'yellow' : 'red']">
            {{scope.row.floor}} 级
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seq" align="center" label="状态">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="info" round @click="deleteHHCon(scope.row.id)">删除</el-button>
            <el-button type="primary" round @click="editARCon(scope.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="clear"></div>
    <!-- <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div> -->
    <!-- 添加内容组件 -->
    <div class="" v-if="listDataArr">
      <GoodsClassManageCom :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
        :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" :dataList="menuList">
      </GoodsClassManageCom>
    </div>

  </div>
</template>

<script src="../action/goodsClassManageAction.js"></script>

<style lang="scss" scoped>

</style>