<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: #4c535a">
        <img src="@/assets/logo.png" style="width: 40px; position: relative; top: 10px" alt="">
        <span style="font-size: 20px; margin-left: 15px; color: white">英语词汇测试</span>
      </el-header>

    </el-container>

    <el-container>
      <el-aside style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 250px">
        <el-menu
            default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">词汇测试</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>词库</span>
            </template>
              <el-menu-item index="/Kaoyan_Vocabulary">考研词库</el-menu-item>
              <el-menu-item index="/Cet-4_Vocabulary">四级词库</el-menu-item>
              <el-menu-item index="/Cet-6_Vocabulary">六级词库</el-menu-item>
          </el-submenu>
          <el-menu-item index="/My_Vocabulary">
            <i class="el-icon-collection"></i>
            <span slot="title">我的词库</span>
          </el-menu-item>
          <el-menu-item index="/mine">
            <i class="el-icon-setting"></i>
            <span slot="title">我的</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>

        <router-view/>
      </el-main>
    </el-container>

  </div>
</template>
<script setup lang="ts">
</script>

<style>
.el-menu{
  border-right: none !important;
}
</style>