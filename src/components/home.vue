<template>
    <div id="home">
        <div v-for="(topAnimeGroup, groupIndex) in topAnimes" :key="groupIndex" class="top-anime-section">
            <h2>
                <span v-for="(word, wordIndex) in topAnimeGroup.heading" :key="wordIndex">
                    <span class="text-primary">{{word[0]}}</span>{{word.substring(1, word.length)}}
                </span>:
            </h2>
            <div class="row">
                <div class="top-anime-container col-6 col-sm-4 col-md-3 col-xl-2" v-for="(anime, animeIndex) in topAnimeGroup.animes" :key="animeIndex">
                    <div class="top-anime">
                        <img :src="anime.image_url"/>
                        <div class="mask">  
                            <div class="mask-content">
                                <h5>{{anime.title}}</h5>
                                <a class="badge badge-info text-white" href="javascript:;" @click="showAnimeDetails(anime.mal_id)">Read More...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="showMoreTopAnime(topAnimeGroup.type)">View More...</button>
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
                    animes: [],
                    type: `airing`
                },
                {
                    heading: [`Top`, `Upcoming`, `Animes`],
                    animes: [],
                    type: `upcoming`
                },
                {
                    heading: [`Top`, `Anime`, `Movies`],
                    animes: [],
                    type: `movie`
                },
                {
                    heading: [`Top`, `Animes`, `Of`, `All`, `Time`],
                    animes: [],
                    type: `tv`
                },
                {
                    heading: [`Top`, `Special`, `Animes`],
                    animes: [],
                    type: `special`
                },
                {
                    heading: [`Top`, `OVA`, `Animes`],
                    animes: [],
                    type: `ova`
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
        },
        showAnimeDetails(animeID){
            this.$router.push(`/anime/${animeID}`)
        },
        showMoreTopAnime(type){
            this.$router.push(`/top-anime/${type}`)
        }
    },
    created(){
        this.topAnimes.forEach((topAnimeType, index) => {
            this.getTopLists(topAnimeType.type, index)
        })
    }
}
</script>

<style>
.top-anime-section{
    margin: 20px 0px 20px 0px;
}
.top-anime-container{
    padding: 10px;
}
.top-anime:hover{
    animation: box-shadow-animation 0.4s;
    animation-fill-mode: forwards;
}
.top-anime{
    background: black;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid black;
    float: left;
    overflow: hidden;
    position: relative;
}
.top-anime > img{
    width:100%;
    min-height:100%;
    object-fit: cover;
    border-radius: 5px;
}
.mask{
    opacity: 0;
    overflow:visible;
    box-sizing:border-box;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
}

.mask-content{
    position: absolute;
    bottom: 0;
    margin: 5px;
}

.mask:hover {
    opacity: 1; 
    background-color:rgba(255, 255, 255, 0.75);
    animation: hoverAnime 0.4s;
}

@keyframes hoverAnime {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes box-shadow-animation {
    0% {
        box-shadow: 0px 0px;
        -webkit-box-shadow: 0px 0px;
        -moz-box-shadow: 0px 0px;
    }
    100% {
        box-shadow: 5px 5px 5px grey;
        -webkit-box-shadow: 5px 5px 5px grey;
        -moz-box-shadow: 5px 5px 5px grey;
    }
}
</style>
