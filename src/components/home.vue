<template>
    <div id="home">
        <h2><span class="text-primary">T</span>op <span class="text-primary">A</span>iring <span class="text-primary">A</span>nimes:</h2>
        <div class="row">
            <div class="top-anime-container col-6 col-sm-4 col-md-3 col-xl-2" v-for="(topAnime, index) in topAiringAnimes" :key="index">
                <div class="top-anime">
                    <img :src="topAnime.image_url"/>
                </div>
            </div>
        </div>
        <h2><span class="text-primary">T</span>op <span class="text-primary">U</span>coming <span class="text-primary">A</span>nimes:</h2>
        <div class="row">
            <div class="top-anime-container col-6 col-sm-4 col-md-3 col-xl-2" v-for="(topAnime, index) in topUpcoming" :key="index">
                <div class="top-anime">
                    <img :src="topAnime.image_url"/>
                </div>
            </div>
        </div>   
    </div>    
</template>

<script>
export default {
    name: `home`,
    data(){
        return {
            topAiringAnimes: [],
            topUpcoming: []
        }
    },
    methods: {
        getHigherResolutionAnimePics(animes){
            for(let i = 0; i < animes.length; i++){
                let anime = animes[i]
                fetch(`https://api.jikan.moe/anime/${anime.mal_id}`, {
                    method: `GET`
                }).then((response) => {
                    return response.json()
                }).then((json) => {
                    if(json.image_url !== null && typeof json.image_url !== `undefined`){
                         anime.image_url = json.image_url
                    }
                })
            }
        }
    },
    created(){
        fetch(`https://api.jikan.moe/top/anime/1/airing`, {
            method: `GET`
        }).then((response) => {
            return response.json()
        }).then((jsonResponse) => {
            this.topAiringAnimes = jsonResponse.top.slice(0, 12)
            this.getHigherResolutionAnimePics(this.topAiringAnimes)
        })
        fetch(`https://api.jikan.moe/top/anime/1/upcoming`, {
            method: `GET`
        }).then((response) => {
            return response.json()
        }).then((jsonResponse) => {
            this.topUpcoming = jsonResponse.top.slice(0, 12)
            this.getHigherResolutionAnimePics(this.topUpcoming)
        })
    }
}
</script>

<style>
.top-anime-container{
    padding: 10px;
}
.top-anime{
    background: black;
    width: 100%;
    height: 100%;
}
.top-anime > img{
    width:100%;
    min-height:100%;
    object-fit: cover;
}
</style>
