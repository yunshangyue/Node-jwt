const Router = require('koa-router')
const key = require('../../config/config')
const User = require('../../models/User')
const passport = require('passport')
const jsw = require('jsonwebtoken')
const router = new Router()


// 登录
router.post('/login', async (ctx, next) => {
        let {pass, email} = ctx.request.body
        let user = await User.findOne({email})
        if (!user) {
            ctx.response.body = {msg: '用户不存在', code: 0}
            return
        }
        if (user.password === pass) {
            let rule = {id: user.id, name: user.name, identity: user.identity}
            let token = jsw.sign(rule, key.secret, {expiresIn: 30})
            ctx.response.body = {token: 'Bearer ' + token, msg: '登录成功', code: 1}
        } else {
            ctx.response.body = {msg: '密码错误', code: 0}
        }
    }
)


// 注册
router.post('/register', async (ctx, next) => {
    let params = ctx.request.body
    let user = await User.findOne({email: params.email})
    if (user) {
        ctx.response.body = await {code: 0, msg: '该邮箱已被注册'}
    } else {
        let newUser = new User({
            name: params.name,
            email: params.email,
            password: params.pass,
            identity: params.identity
        })
        try {
            let user = await newUser.save()
            if (user) {
                ctx.response.body = await {code: 1, msg: '注册成功'}
            } else {
                ctx.response.body = await {code: 0, msg: '后端出错了，请重试'}
            }
        } catch (e) {
            console.log(e)
        }
    }

})

router.get('/current', passport.authenticate('jwt', {session: false}), async (ctx, next) => {
    ctx.response.body = await {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    }
})


module.exports = router