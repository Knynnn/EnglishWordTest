<template>
    <div v-if="isLoggedIn">
        <user-info />
    </div>
    <div v-else>
        <el-button type="primary" @click="goToLogin">请登录</el-button>
    </div>
</template>

<script>
import UserInfo from './UserInfo.vue';

export default {
    name: 'About',
    components: {
        UserInfo
    },
    data() {
        return {
            isLoggedIn: false
        }
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            const token = localStorage.getItem('token');
            this.isLoggedIn = !!token;
        },
        goToLogin() {
            this.$router.push('/login');
        }
    }
}
</script>
