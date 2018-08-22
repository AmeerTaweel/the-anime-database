<template>
    <div id="search">
        <h1><span class="text-primary">S</span>earch <span class="text-primary">A</span>nime:</h1>
        <h2 class="text-muted"><small>*Search Results for "{{query}}":</small></h2>
        <div class="row my-2">
            <div class="col-12" v-for="(anime, index) in results" :key="index">
                {{anime.title}}
            </div>
        </div>
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
