<template>
    <div>
        <button @click="click">button</button>
        <div>{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                text: 0
            }
        },
        beforeCreate() {
            console.log(this.$el, 'beforeCreate')
        },
        created() {
            console.log(this.$el, 'created')
        },
        beforeMount() {
            console.log(this.$el, 'beforeMount')
        },
        mounted() {
            console.log(this.$el, 'mounted')
        },
        beforeUpdate() {
            console.log(this, 'beforeUpdate')
        },
        updated() {
            console.log(this, 'updated')
        },
        activated() {
            console.log(this, 'activated')
        },
        deactivated() {
            console.log(this, 'deactivated')
        },
        beforeDestroy() {
            console.log(this, 'beforeDestroy')
        },
        destroyed() {
            console.log(this, 'destroyed')
        },
        methods: {
            click() {
                this.$destroy()
            }
        }

    }
</script>

<style scoped>

</style>