<template>
    <div id="home" class="m-20">
        <h2>Top Airing Animes</h2>
        <Carousel
        :autoplay="carouselSettings.autoplay"
        :autoplay-speed="carouselSettings.autoplaySpeed"
        :dots="carouselSettings.dots"
        :radius-dot="carouselSettings.radiusDot"
        :trigger="carouselSettings.trigger"
        :arrow="carouselSettings.arrow">
            <CarouselItem v-for="(group, gIndex) in getCarouselItems" :key="gIndex">
                    <img v-for="(topAnime, tIndex) in group" :key="tIndex" :src="topAnime.image_url">
            </CarouselItem>
        </Carousel>
    </div>    
</template>

<script>
export default {
    name: `home`,
    data(){
        return {
            topAiringAnimes: [],
            carouselSettings: {
                autoplay: true,
                autoplaySpeed: 5000,
                dots: 'none',
                radiusDot: false,
                trigger: 'click',
                arrow: 'hover'
            },
            carouselItemsNum: 5
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
    computed: {
        // Devide top airing animes to groups to display in carousel.
        getCarouselItems(){
            let animeGroups = []
            for(let i = 0, g = 0; i < this.topAiringAnimes.length; i++){
                let group = animeGroups[g]
                if(group === null || typeof group === `undefined`){
                    animeGroups.push([])
                    group = animeGroups[g]
                }
                group.push(this.topAiringAnimes[i])
                if(group.length >= this.carouselItemsNum){
                    g++
                }
            }
            return animeGroups
        }
    },
    created(){
        fetch(`https://api.jikan.moe/top/anime/1/airing`, {
            method: `GET`
        }).then((response) => {
            return response.json()
        }).then((jsonResponse) => {
            this.topAiringAnimes = jsonResponse.top
            this.getHigherResolutionAnimePics()
        })
    }
}
</script>