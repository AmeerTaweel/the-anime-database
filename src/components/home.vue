<template>
    <div id="home">
        <div v-for="(topAnimeGroup, groupIndex) in topAnimes" :key="groupIndex">
            <h2>
                <span v-for="(word, wordIndex) in topAnimeGroup.heading" :key="wordIndex">
                    <span class="text-primary">{{word[0]}}</span>{{word.substring(1, word.length)}}
                </span>:
            </h2>
            <div class="row">
                <div class="top-anime-container col-6 col-sm-4 col-md-3 col-xl-2" v-for="(anime, animeIndex) in topAnimeGroup.animes" :key="animeIndex">
                    <div class="top-anime">
                        <img :src="anime.image_url"/>
                    </div>
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
            topAnimes: [
                {
                    heading: [`Top`, `Airing`, `Animes`],
                    animes: []
                },
                {
                    heading: [`Top`, `Upcoming`, `Animes`],
                    animes: []
                },
                {
                    heading: [`Top`, `Anime`, `Movies`],
                    animes: []
                },
                {
                    heading: [`Top`, `Animes`, `Of`, `All`, `Time`],
                    animes: []
                }
            ]
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
        },
        getTopLists(genere, index){
            fetch(`https://api.jikan.moe/top/anime/1/${genere}`, {
                method: `GET`
            }).then((response) => {
                return response.json()
            }).then((jsonResponse) => {
                this.topAnimes[index].animes = jsonResponse.top.slice(0, 12)
                this.getHigherResolutionAnimePics(this.topAnimes[index].animes)
            }) 
        }
    },
    created(){
        this.getTopLists(`airing`, 0)
        this.getTopLists(`upcoming`, 1)
        this.getTopLists(`movie`, 2)
        this.getTopLists(`tv`, 3)
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
