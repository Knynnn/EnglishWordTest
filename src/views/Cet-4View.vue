<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.word" style="width: 200px" placeholder="请输入单词"></el-input>
      <el-input v-model="params.definition" style="width: 200px; margin-left: 5px" placeholder="请输入中文"></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="findBySearch()">查询</el-button>
      <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="word" label="单词" width="180">
        </el-table-column>
        <el-table-column prop="definition" label="中文解释">
        </el-table-column>
      </el-table>
    </div>
<!--  <div style="margin-top: 15px">-->
<!--    <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="currentPage4"-->
<!--        :page-sizes="[10, 20, 30, 40]"-->
<!--        :page-size="100"-->
<!--        layout="total, sizes, prev, pager, next"-->
<!--        :total="total">-->
<!--    </el-pagination>-->
<!--  </div>-->
  </div>
</template>

<script>
import request from '@/utils/request';  // 导入 request 模块

export default {
  data() {
    return {
      params: {
        word: '',
        definition: ''
      },
      total: 200,
      tableData: []
    }
  },
  //页面加载的时候，做一些事情，在Created里面
  created() {
    this.findBySearch();
  },
  //定义一些页面上控件触发的事件调用的方法
  methods:{
    findBySearch(){
      request.get("/kaoyanWord/search", {params: this.params}).then(res => {
        if(res.code === '0') {
          this.tableData = res.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    reset(){
      this.params.word = '';
      this.params.definition = '';
      this.findBySearch();
    }
  }
}
</script>