const jsw = require('jsonwebtoken')

let getToken = function (rule, key, option) {
       return jsw.sign(rule, key, option, (e, token) => {
            if (e) {
                console.log('出错了')
                throw e
            }
            return token
        })
}

module.exports = getToken



