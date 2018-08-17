<template>
    <div id="top-anime">
        <h1>Top Anime</h1>
        {{type}}
    </div>
</template>

<script>
export default {
    name: `top-anime`,
    data(){
        return {
            type: this.$route.params.type
        }
    },
    watch: {
        '$route': 'updateType'
    },methods: {
        updateType(){
            this.type = this.$route.params.type
            this.checkType()
        },
        goTo404(){
            this.$router.push('/404/page-not-found')
        },
        checkType(){
            const validTypes = [`airing`, `upcoming`, `movie`, `tv`]
            if(!validTypes.includes(this.type)){
                this.goTo404()
            }
        }
    },
    created(){
        this.checkType()
    }
}
</script>
