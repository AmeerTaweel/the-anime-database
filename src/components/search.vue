<template>
    <div id="search">
        {{query}}
    </div>
</template>

<script>
export default {
    name: `search`,
    data(){
        return {
            query: this.$route.params.query
        }
    },
    watch:{
        '$route': `update`
    },
    methods: {
        update(){
            this.query = this.$route.params.query
        }
    }
}
</script>
