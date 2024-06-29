<template>
    <div style="width: 600px; height: 350px; margin: 150px auto; border-radius: 10px">
        <el-descriptions title="个人信息" :column="3" size="medium">
            <template slot="extra">
                <el-button type="primary" size="small" @click="editUser">修改信息</el-button>
                <el-button type="primary" size="small" @click="logout">退出登录</el-button>
            </template>
            <el-descriptions-item label="用户名">{{ user.name }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ user.id }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ user.sex }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ user.age }}</el-descriptions-item>
            <el-descriptions-item label="四级成绩">{{ user.cet4 }}</el-descriptions-item>
            <el-descriptions-item label="六级成绩">{{ user.cet6 }}</el-descriptions-item>
            <el-descriptions-item label="测试词汇量">{{ user.wordsize }}</el-descriptions-item>
        </el-descriptions>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" :label-width="formLabelWidth">
                <el-form-item label="用户名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="四级成绩">
                    <el-input v-model="form.cet4" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="六级成绩">
                    <el-input v-model="form.cet6" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from "@/utils/request"; // 确保导入路径正确

export default {
    name: 'UserInfo',
    data() {
        return {
            user: {
                name: '',
                id: '',
                sex: '',
                age: '',
                cet4: '',
                cet6: '',
                wordsize:''
            },
            dialogFormVisible: false,
            form: {
                name: '',
                sex: '',
                age: '',
                cet4: '',
                cet6: ''
            },
            formLabelWidth: '120px'
        };
    },
    async created() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        try {
            const res = await request.get(`/user/info/${userId}`);
            if (res.code === '0') {
                this.user = res.data;
                this.form = { ...res.data };
            } else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error(error);
            this.$message({
                message: '用户信息获取失败，请重试',
                type: 'error'
            });
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
        editUser() {
            this.dialogFormVisible = true;
        },
        async submitForm() {
            try {
                const res = await request.post('/user/update', this.form);
                if (res.code === '0') {
                    this.user = { ...this.form };
                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '信息已更新',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error(error);
                this.$message({
                    message: '更新失败，请重试',
                    type: 'error'
                });
            }
        }
    }
};
</script>