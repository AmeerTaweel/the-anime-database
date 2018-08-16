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
                    <h4 class="col-12 font-weight-bold">Alternative Titles:</h4>
                    <br/>
                    <br/>
                    <h5 class="col-12" v-if="anime.title_japanese"><span class="text-primary">Japanese</span>: {{anime.title_japanese}}</h5>
                    <h5 class="col-12" v-if="anime.title_english"><span class="text-primary">English</span>: {{anime.title_english}}</h5>
                    <h5 class="col-12" v-if="anime.title_synonyms"><span class="text-primary">Synonyms</span>: {{anime.title_synonyms}}</h5>
                    <br/>
                    <br/>
                    <h4 class="col-12 font-weight-bold">Information:</h4>
                    <br/>
                    <br/>
                    <h5 class="col-12"><span class="text-primary">Type</span>: {{anime.type || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Episodes</span>: {{anime.episodes || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Status</span>: {{anime.status || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Aired</span>: {{anime.aired_string || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Premiered</span>: {{anime.premiered || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Broadcast</span>: {{anime.broadcast || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Producers</span>: <span v-for="(producer, index) in anime.producer" :key="index">{{producer.name}}<span v-if="anime.producer.length > index + 1">, </span></span><span v-if="anime.producer.length < 1">{{na}}</span></h5>
                    <h5 class="col-12"><span class="text-primary">Licensors</span>: <span v-for="(licensor, index) in anime.licensor" :key="index">{{licensor.name}}<span v-if="anime.licensor.length > index + 1">, </span></span><span v-if="anime.licensor.length < 1">{{na}}</span></h5>
                    <h5 class="col-12"><span class="text-primary">Studios</span>: <span v-for="(studio, index) in anime.studio" :key="index">{{studio.name}}<span v-if="anime.studio.length > index + 1">, </span></span><span v-if="anime.studio.length < 1">{{na}}</span></h5>
                    <h5 class="col-12"><span class="text-primary">Source</span>: {{anime.source || na}}</h5>
                    <h5 class="col-12"><span class="text-primary">Genres</span>: <span v-for="(genre, index) in anime.genre" :key="index">{{genre.name}}<span v-if="anime.genre.length > index + 1">, </span></span><span v-if="anime.genre.length < 1">{{na}}</span></h5>
                    <h5 class="col-12"><span class="text-primary">Duration</span>: {{anime.duration || na}}</h5>
                </div>
            </div>
            <div class="col-12 col-md-8 col-lg-9 mt-4">
                <div class="row">
                    <h4 class="col-12 font-weight-bold">Statistics:</h4>
                    <br/>
                    <br/>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Score</span>: {{anime.score || na}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Ranked</span>: #{{anime.rank || na}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Popularity</span>: {{anime.popularity || na}}</h5>
                    <h5 class="col-12 col-lg-6"><span class="text-primary">Members</span>: {{anime.members || na}}</h5>
                    <br/>
                    <br/>
                    <h4 class="col-12 font-weight-bold">Synopsis:</h4>
                    <br/>
                    <br/>
                    <p class="col-12">{{anime.synopsis}}</p>
                    <br/>
                    <br/>
                    <h4 v-if="anime.background" class="col-12 font-weight-bold">Background:</h4>
                    <br/>
                    <br/>
                    <p v-if="anime.background" class="col-12">{{anime.background}}</p>
                    <br/>
                    <br/>
                    <h4 class="col-12 font-weight-bold">Related Anime:</h4>
                    <br/>
                    <br/>
                    <h5 class="col-12" v-if="anime.related.Adaptation"><span class="text-primary">Adaptation</span>: <span v-for="(adaptation, index) in anime.related.Adaptation" :key="index">{{adaptation.title}}<span v-if="anime.related.Adaptation.length > index + 1">, </span></span></h5>
                    <h5 class="col-12" v-if="anime.related['Side story']"><span class="text-primary">Side Story</span>: <span v-for="(sideStory, index) in anime.related['Side story']" :key="index">{{sideStory.title}}<span v-if="anime.related['Side story'].length > index + 1">, </span></span></h5>
                    <h5 class="col-12" v-if="anime.related.Summary"><span class="text-primary">Summary</span>: <span v-for="(summary, index) in anime.related.Summary" :key="index">{{summary.title}}<span v-if="anime.related.Summary.length > index + 1">, </span></span></h5>
                    <h5 class="col-12" v-if="anime.related['Parent story']"><span class="text-primary">Parent Story</span>: <span v-for="(parentStory, index) in anime.related['Parent story']" :key="index">{{parentStory.title}}<span v-if="anime.related['Parent story'].length > index + 1">, </span></span></h5>
                    <br/>
                    <br/>
                    <h4 class="col-12 font-weight-bold" v-if="anime.opening_theme">Opening Theme:</h4>
                    <h5 class="col-12" v-if="anime.opening_theme" v-for="(theme, index) in anime.opening_theme" :key="index">{{theme}}</h5>
                    <br/>
                    <br/>
                    <h4 class="col-12 font-weight-bold" v-if="anime.ending_theme">Ending Theme:</h4>
                    <h5 class="col-12" v-if="anime.ending_theme" v-for="(theme, index) in anime.ending_theme" :key="index">{{theme}}</h5>
                    <br/>
                    <br/>    
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
            anime: {},
            na: 'N/A'
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
