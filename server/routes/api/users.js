const express = require('express')
const jsw = require('jsonwebtoken')
const router = express.Router()
const key = require('../../config/config')
const User = require('../../models/User')
const passport = require('passport')

// 注册接口
router.post('/register', (req, res) => {
    // 查询邮箱是否已注册
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "该邮箱已经注册"})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    identity: req.body.identity
                })

                newUser.save()
                    .then(user => res.json(user))
                    .catch(e => console.log(e))
            }
        })
})

// 登录接口
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json('用户不存在')
            }

            if (user.password === password) {
                const rule = {id: user.id, name: user.name, identity: user.identity}
                jsw.sign(rule, key.secret, {expiresIn: 30}, (e, token) => {
                    if (e) throw e
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json('密码错误')

            }
        })
})

// 验证token
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})


// 测试接口
router.get('/test', (req, res) => {
    res.json('sceesss')
})

module.exports = router