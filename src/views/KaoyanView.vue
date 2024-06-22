<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.word" style="width: 200px" placeholder="请输入单词"></el-input>
            <el-input v-model="params.definition" style="width: 200px; margin-left: 5px"
                      placeholder="请输入中文"></el-input>
            <el-button type="primary" style="margin-left: 10px" @click="findBySearch()">查询</el-button>
            <el-button type="warning" style="margin-left: 10px" @click="reset()">清空</el-button>
            <el-button type="success" style="margin-left: 10px" @click="add()">新增</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="word" label="单词" width="180">
                </el-table-column>
                <el-table-column prop="definition" label="中文解释" width="600px">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                        <template>
                            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
                                <el-button slot="reference" type="warning" style = "margin-left: 5px">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top: 15px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="收录单词" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form">
                    <el-form-item label="单词" label-width="20%">
                        <el-input v-model="form.word" autocomplete="off" style="width: 75%"></el-input>
                    </el-form-item>
                    <el-form-item label="中文" label-width="20%">
                        <el-input v-model="form.definition" autocomplete="off" style="width: 75%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';  // 导入 request 模块

export default {
    data() {
        return {
            params: {
                word: '',
                definition: '',
                pageNum: 1,
                pageSize: 5
            },
            total: 0,
            tableData: [],
            dialogFormVisible: false,
            form: {}
        }
    },
    //页面加载的时候，做一些事情，在Created里面
    created() {
        this.findBySearch();
    },
    //定义一些页面上控件触发的事件调用的方法
    methods: {
        findBySearch() {
            request.get("/kaoyanWord/search", {params: this.params}).then(res => {
                if (res.code === '0') {
                    this.tableData = res.data.list;
                    this.total =res.data.total;

                }
            }).catch((error) => {
                console.log(error);
            });
        },
        reset() {
            this.params.word = '';
            this.params.definition = '';
            this.params.pageNum = 1;
            this.params.pageSize = 5;
            this.findBySearch();
        },
        handleSizeChange(pageSize) {
            this.params.pageSize = pageSize;
            this.findBySearch();
        },
        handleCurrentChange(pageNum) {
            this.params.pageNum = pageNum;
            this.findBySearch();
        },
        add() {
            this.form = {};
            this.dialogFormVisible = true;
        },
        submit() {
            request.post("/kaoyanWord", this.form).then(res => {
                if (res.code === '0') {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.findBySearch();
                } else{
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        edit(obj) {
            this.form = obj;
            this.dialogFormVisible = true;
        },
        del(id) {
            request.delete("/kaoyanWord/" + id).then(res => {
                if (res.code === '0') {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.findBySearch();
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        }
    }
}
</script>