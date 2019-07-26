<template>
    <el-form :model="form" ref="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="form.pass" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="form.checkPass" placeholder="请再输入一次密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="atype">
            <el-select v-model="form.identity" placeholder="请选择身份">
                <el-option label="员工" value="empolye"></el-option>
                <el-option label="管理" value="boss"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "register",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                form: {
                    name: '',
                    email: '',
                    pass: '',
                    checkPass: '',
                    identity: ''
                },

                rules: {
                    name: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 30,
                        message: '长度在2到30个字符之间',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],

                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        // this.$axios.get('https://cnodejs.org/api/v1/topics')
                        //     .then(res => console.log(res))
                        //     .catch(e => console.log(e))
                        // console.log(this.form)
                        this.$axios.post('http://localhost:3000/api/user/register', this.form)
                            .then(res => {
                                this.$message({
                                    message: res.data.msg,
                                    type: res.data.code ? 'success' : 'error'
                                })
                                if (res.data.code) {
                                    this.$router.push('/login')
                                }
                            })
                            .catch(e => this.$message({
                                message: '网络出错，请检查网络设置',
                                type: 'error'
                            }))
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>