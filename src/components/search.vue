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
            query: this.$route.params.search_query
        }
    }
}
</script>
