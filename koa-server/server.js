const Koa = require('koa')
const UserRouter = require('./router/api/users')
const Router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const app = new Koa()
const passport = require('passport')


const db = require('./config/config').mongoURL

mongoose.connect(db)
    .then(() => console.log('Connect success'))
    .catch(err => console.log(err))

app.use(cors({
    origin: '*'
}))

app.use(bodyParser())
app.use(passport.initialize())

require('./config/passport')(passport)


Router.use('/api/user', UserRouter.routes(), UserRouter.allowedMethods())

app.use(Router.routes())

app.listen(3000, () => console.log('server run on 3000'))