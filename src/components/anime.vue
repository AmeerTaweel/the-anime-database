<template>
    <div id="anime">
        <div class="row">
            <h2 class="text-left col-12">{{anime.title}}</h2>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
                <div class="row">
                    <div class="col-12 my-4">
                        <img class="anime-image" :src="anime.image_url"/>
                    </div>
                    <h5 class="col-12"><span class="text-primary">Type</span>: {{anime.type}}</h5>
                    <h5 class="col-12"><span class="text-primary">Episodes</span>: {{anime.episodes}}</h5>
                    <h5 class="col-12"><span class="text-primary">Status</span>: {{anime.status}}</h5>
                    <h5 class="col-12"><span class="text-primary">Aired</span>: {{anime.aired_string}}</h5>
                    <h5 class="col-12"><span class="text-primary">Premiered</span>: {{anime.premiered}}</h5>
                    <h5 class="col-12"><span class="text-primary">Broadcast</span>: {{anime.broadcast}}</h5>
                    <h5 class="col-12"><span class="text-primary">Producers</span>: <span v-for="(producer, index) in anime.producer" :key="index">{{producer.name}}<span v-if="anime.producer.length > index + 1">, </span></span></h5>
                    <h5 class="col-12"><span class="text-primary">Licensors</span>: <span v-for="(licensor, index) in anime.licensor" :key="index">{{licensor.name}}<span v-if="anime.licensor.length > index + 1">, </span></span></h5>
                    <h5 class="col-12"><span class="text-primary">Studios</span>: <span v-for="(studio, index) in anime.studio" :key="index">{{studio.name}}<span v-if="anime.studio.length > index + 1">, </span></span></h5>
                    <h5 class="col-12"><span class="text-primary">Source</span>: {{anime.source}}</h5>
                </div>
            </div>
            <div class="col-12 col-md-8 col-lg-9 mt-4">
                <div class="row">
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Score</span>: {{anime.score}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Ranked</span>: #{{anime.rank}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Popularity</span>: {{anime.popularity}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Members</span>: {{anime.members}}</h5>
                    <hr class="col-11"/>
                    <h5 class="col-12 font-weight-bold">Synopsis:</h5>
                    <p class="col-12">{{anime.synopsis}}</p>
                    <hr v-if="anime.background" class="col-11"/>
                    <h5 v-if="anime.background" class="col-12 font-weight-bold">Background:</h5>
                    <p v-if="anime.background" class="col-12">{{anime.background}}</p>
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
