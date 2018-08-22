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
            query: this.$route.params.query,
            results: []
        }
    },
    watch:{
        '$route': `update`
    },
    methods: {
        update(){
            this.query = this.$route.params.query
            if(this.checkQuery()){
                this.search()
            }
        },
        search(){
            fetch(`https://api.jikan.moe/search/anime?q=${this.query}&page=1`, {
                method: `GET`
            }).then((response) => {
                if(response.status === 200){
                    return response.json().then((jsonResponse) => {
                        this.results = jsonResponse.result
                    })
                }else{
                    this.goTo404()
                }
            })
        },
        goTo404(){
            this.$router.push('/404/page-not-found')
        },
        checkQuery(){
            return true
        }
    },
    created(){
        if(this.checkQuery()){
            this.search()
        }
    }
}
</script>
