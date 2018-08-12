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
    </div>    
</template>

<script>
export default {
    name: `home`,
    data(){
        return {
            topAiringAnimes: [],
        }
    },
    methods: {
        getHigherResolutionAnimePics(){
            for(let i = 0; i < this.topAiringAnimes.length; i++){
                let anime = this.topAiringAnimes[i]
                fetch(`https://api.jikan.moe/anime/${anime.mal_id}/episodes`, {
                    method: `GET`
                }).then((response) => {
                    return response.json()
                }).then((json) => {
                    anime.image_url = json.image_url
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
            this.getHigherResolutionAnimePics()
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
