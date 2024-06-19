<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="input" style="width: 200px" placeholder="请输入内容"></el-input>
      <el-button type="primary" style="margin-left: 10px">查询</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="word" label="单词" width="180">
        </el-table-column>
        <el-table-column prop="chinese" label="中文解释">
        </el-table-column>
      </el-table>
    </div>
  <div style="margin-top: 15px">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      total: 200,
      tableData: [{
        word: 'touch',
        chinese: 'n. 接触；触觉；格调；少许 vt. 接触；触动；使轻度受害 vi. 触摸；涉及；接近；提到'
      }, {
        word: 'accompany',
        chinese: 'vt. 陪伴，伴随；伴奏 vi. 伴奏，伴唱'
      }, {
        word: 'fellow',
        chinese: 'n. 家伙；朋友；同事；会员 adj. 同伴的，同事的；同道的 vt. 使…与另一个对等；使…与另一个匹敌'
      }, {
        word: 'behaviour',
        chinese: 'n. 行为；习性；运行状况（=behavior）'
      }]
    }
  }
}
</script>