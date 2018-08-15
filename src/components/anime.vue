<template>
    <div id="anime">
        <div class="row">
            <div class="anime-image-container col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
                <img class="anime-image rounded mx-auto d-block" :src="anime.image_url"/>
            </div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 mt-4">
                <h2 class="text-left">{{anime.title}}</h2>
                <div class="row">
                    <h3 class="col-12 col-lg-6"><span class="text-primary">Score</span>: {{anime.score}}</h3>
                    <h3 class="col-12 col-lg-6"><span class="text-primary">Ranked</span>: #{{anime.rank}}</h3>
                    <h3 class="col-12 col-lg-6"><span class="text-primary">Popularity</span>: {{anime.popularity}}</h3>
                    <h3 class="col-12 col-lg-6"><span class="text-primary">Members</span>: {{anime.members}}</h3>
                    <hr class="col-11"/>
                    <h5 class="col-12 font-weight-bold">Synopsis:</h5>
                    <p class="col-12">{{anime.synopsis}}</p>
                </div>
            </div>    
        </div>
    </div>    
</template>

<script>
export default {
    name: `anime`,
    data(){
        return {
            id: this.$route.params.id,
            anime: {}
        }
    },
    watch: {
        '$route': 'updateAnimeData'
    },
    methods: {
        updateAnimeData(){
            this.id = this.$route.params.id
            this.getAnimeData()
        },
        getAnimeData(){
            fetch(`https://api.jikan.moe/anime/${this.id}`, {
                method: `GET`
            }).then((response) => {
                return response.json()
            }).then((json) => {
                this.anime = json
            })
        }
    },
    created(){
        this.getAnimeData()
    }
}
</script>

<style>
.anime-image {
    border-radius: 10px;
    border: 1px solid black;
}
</style>
