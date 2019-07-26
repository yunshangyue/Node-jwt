import types from './types'

export default {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated
        else stae.isAuthenticated = false
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user
        else state.user = {}
    }
}