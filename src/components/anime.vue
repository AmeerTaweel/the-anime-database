<template>
    <div id="anime">
        <div class="row">
            <div class="anime-image-container col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
                <img class="anime-image rounded mx-auto d-block" :src="anime.image_url"/>
            </div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 mt-4">
                <h3 class="text-left">{{anime.title}}</h3>
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
