<template>
    <router-view/>
</template>
<script>
    import jwt_decode from 'jwt-decode'
    import { mapActions } from 'vuex'

    export default {
        created() {
          if (localStorage.token) {
              let token = localStorage.getItem('token')
              const decoded = jwt_decode(token)

              this.setAuthenticated(!this.isEmpty(decoded))
              this.setUser(decoded)
          }
        },
        methods: {
            ...mapActions(['setAuthenticated','setUser']),
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

<style>

</style>
