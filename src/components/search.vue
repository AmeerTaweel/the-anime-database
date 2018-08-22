<template>
    <div id="search">
        <h1><span class="text-primary">S</span>earch <span class="text-primary">A</span>nime:</h1>
        <h2 class="text-muted"><small>*Search Results for "{{query}}":</small></h2>
        <div class="row m-2">
            <div class="col-12 py-2" v-for="(anime, index) in results" :key="index">
                <div class="row rounded border border-primary py-2">
                    <div class="col-4 col-sm-3 col-lg-2">
                        <img class="rounded border border-dark float-left" :src="anime.image_url"/>
                    </div>
                    <div class="col-8 col-sm-9 col-lg-10">
                        <h4 class="text-primary pointer hover-link" @click="showAnimeDetails(anime.mal_id)">{{anime.title}}</h4>
                        <h4 class="text-muted"><small>{{anime.type}} ({{anime.episodes || 0}} eps)</small></h4>
                        <h4 class="text-muted"><small>Score: {{anime.score || `N/A`}}</small></h4>
                        <h4 class="text-muted"><small>Members: {{anime.members}}</small></h4>
                    </div>  
                </div>
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
        },
        showAnimeDetails(animeID){
            this.$router.push(`/anime/${animeID}`)
        }
    },
    created(){
        if(this.checkQuery()){
            this.search()
        }
    }
}
</script>
