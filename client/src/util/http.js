import axios from 'axios'
import {Loading,Message} from 'element-ui'
import router from '../router'

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    startLoading()

    // 如果有token 设置所有请求的头部携带token
    if (localStorage.token) {
     config.headers.Authorization = localStorage.token
    }

    return config
}, error => {
    return Promise.reject(error)
})


// 响应拦截
axios.interceptors.response.use(res => {
    endLoading()
    return res
},error => {
    endLoading()
    const { status }  = error.response
    if (status == 401) {
        Message.error('登录信息过期 请重新登录!')
        localStorage.removeItem('token')
        router.push('/login')
    }

    return Promise.reject(error)
})


export default axios