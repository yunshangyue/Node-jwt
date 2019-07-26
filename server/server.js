const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

app.use(cors())

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
})


const PORT = process.env.PORT || 5000

//user.js
const users = require('./routes/api/users')

// DB config
const db = require('./config/config').mongoURL


// Connect to DB
mongoose.connect(db)
    .then(() => console.log('Connect success'))
    .catch(err => console.log(err))


// 使用bodyParser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())

require('./config/passport')(passport)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/users', users)

app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`)
})
