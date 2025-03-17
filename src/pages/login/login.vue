<!-- description: login -->
<!-- fileName: login.vue -->
<!-- author: iwen(1044803551@qq.com) -->

<script setup>
    import axios from '@/api/axios'

    const model = reactive({
        username: 'wzz',
        password: '12345',
    })
    const form = ref()
    /** 提交 */
    const handleSubmit = () => {
        // 校验表单
        form.value
            .validate()
            .then(({ valid, errors }) => {
                if (valid) {
                    handleLogin()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    /** 登录 */
    const handleLogin = () => {
        axios.post('/api/common/authentication', model).then(res => {
            console.log(res, 'res')
            // uni.setStorageSync(token, res.token)
        }).catch(err => {
            console.log(err, 'err')
        })
    }

</script>

<template>
    <view class="page">
        <view class="content">
            <wd-form ref="form" :model="model">
                <wd-cell-group border>
                    <wd-input label="用户名" label-width="100px" prop="username" clearable v-model="model.username"
                        placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
                    <wd-input label="密码" label-width="100px" prop="password" show-password clearable
                        v-model="model.password" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
                </wd-cell-group>
                <view class="footer">
                    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
                </view>
            </wd-form>
        </view>
    </view>
</template>

<style lang='scss' scoped></style>