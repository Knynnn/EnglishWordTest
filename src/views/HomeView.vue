<template>
    <div>
    <div class="vocab-test">
        <el-button type="primary" @click="fetchRandomWords" class="fetch-button">获取随机单词</el-button>
        <el-form @submit.native.prevent="onSubmit">
            <el-row :gutter="20">
                <el-col :span="4" v-for="(word, index) in randomWords" :key="index">
                    <el-checkbox v-model="form.knownWords" :label="word.word">{{ word.word }}</el-checkbox>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="submit-button">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div>
        <el-dialog
            title="测试结果"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>你的词汇量为：{{result.data}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                knownWords: []
            },
            randomWords: [],
            result:''
        };
    },
    methods: {
        async fetchRandomWords() {
            try {
                const response = await axios.get('http://localhost:8080/kaoyanWord/randomWords', {
                    params: { sampleSize: 80 }
                });
                this.randomWords = response.data.data;
            } catch (error) {
                console.error('Error fetching random words:', error);
            }
        },
        async onSubmit() {
            const knownWords = this.form.knownWords;
            const unknownWords = this.randomWords.map(word => word.word).filter(word => !knownWords.includes(word));
            try {
                const response = await axios.post('http://localhost:8080/kaoyanWord/testVocabulary', {
                    knownWords,
                    unknownWords
                });
                this.result = response.data;
                this.dialogVisible = true;
                // 更新用户的词汇量
                await this.updateUserWordSize(this.result.data);
            } catch (error) {
                console.error('Error estimating vocabulary size:', error);
            }
        },
        async updateUserWordSize(wordsize) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.wordsize = wordsize;
            try {
                const response = await axios.post('http://localhost:8080/user/updateWordSize', user);
                if (response.code === '0') {
                    localStorage.setItem('user', JSON.stringify(user));

                } else {

                }
            } catch (error) {
                console.error('Error updating word size:', error);
                this.$message({
                    message: '词汇量更新失败，请重试',
                    type: 'error'
                });
            }
        }
    }
};
</script>

<style scoped>
.vocab-test {
    max-width: 800px;
    margin: 50px auto;
}

.fetch-button, .submit-button {
    display: block;
    margin: 20px auto;
}

.el-checkbox {
    margin: 10px 0;
}
</style>