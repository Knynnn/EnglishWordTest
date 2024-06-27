<template>
  <div>
    <div style="width: 400px; height: 350px; margin: 150px auto; background-color: rgba(107,149,224,0.5); border-radius: 10px">
        <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: #4a5ed0">欢迎登录</div>
        <div style="margin-top: 25px; text-align: center; height: 320px">
           <el-form :model="user">
                <el-form-item>
                    <el-input v-model="user.name" prefix-icon="el-icon-user" style="width: 80%" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.password" prefix-icon="el-icon-lock" style="width: 80%" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 80%; margin-top: 10px;" type="primary" @click="login">登陆</el-button>
                </el-form-item>
           </el-form>
        </div>
    </div>
  </div>
</template>

<script>

import request from "@/utils/request";

export default {
  name: 'Login',
    data() {
    return {
      user:{
        id: '',
        password: ''
      }
    }
  },
    methods: {
        login() {
            request.post("/user/login", this.user).then(res => {
                if (res.code === '0') {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    this.$router.push('/')
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })}
    }
}
</script>
