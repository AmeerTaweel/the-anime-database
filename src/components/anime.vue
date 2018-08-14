<template>
    <div id="anime">
        <h1>{{anime.title}}</h1>
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
