<template>
    <el-form :model="form" ref="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import jwt_decode from 'jwt-decode'
    import {mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                form: {
                    email: '',
                    pass: ''
                },
                rules: {
                    email: [{
                        required: true,
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    pass: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            ...mapActions(['setAuthenticated', 'setUser']),
            submitForm() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.$axios.post('http://localhost:3000/api/user/login', this.form)
                            .then(res => {
                                // code为0 流程出错 获取提示语并显示给用户
                                if (!res.data.code) {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                } else {
                                    console.log(this)
                                    // code不为0 流程未出错
                                    const {token} = res.data
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    })

                                    // 存储到本地
                                    localStorage.setItem('token', token)
                                    const decoded = jwt_decode(token)

                                    // 存储到vuex
                                    // this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
                                    // this.$store.dispatch('setUser', decoded)
                                    this.setAuthenticated(!this.isEmpty(decoded))
                                    this.setUser(decoded)

                                    // 路由跳转
                                    this.$router.push('/home')
                                }
                            })
                            .catch(e => console.log(e))
                    }
                })
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value == 'object' && Object.keys(value).length === 0) ||
                    (typeof value === 'string' && value.trim().length === 0)
                )
            }
        }

    }

</script>

<style scoped>

</style>