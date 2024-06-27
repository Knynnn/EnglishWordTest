<template>
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
        <el-alert
            v-if="result !== null"
            title="估算的词汇量"
            type="success"
            :description="`你的词汇量估算为：${result.data}`"
            show-icon
        ></el-alert>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                knownWords: [] // 确保初始化为数组
            },
            randomWords: [],
            result: null
        };
    },
    methods: {
        async fetchRandomWords() {
            try {
                const response = await axios.get('http://localhost:8080/kaoyanWord/randomWords', {
                    params: { sampleSize: 100 }
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
            } catch (error) {
                console.error('Error estimating vocabulary size:', error);
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
