import types from './types'

export default {
    setAuthenticated({commit}, isAuthenticated) {
        commit(types.SET_AUTHENTICATED, isAuthenticated)
    },
    setUser({commit}, user) {
        commit(types.SET_USER, user)
    }
}