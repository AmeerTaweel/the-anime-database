<template>
    <div id="top-anime">
        <h2>
            <span v-for="(word, index) in displayType" :key="index">
                <span class="text-primary">{{word[0]}}</span>{{word.substring(1, word.length)}}
            </span>:
        </h2>
        <div class="row">
            <div class="col-12 my-2">
                <table class="table table-bordered table-hover">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th class="text-center">Rank</th>
                            <th>Title</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(anime, index) in topAnimes" :key="index">
                            <td class="align-middle text-center text-muted"><h2>#{{index + 1}}</h2></td>
                            <td class="pointer" @click="showAnimeDetails(anime.mal_id)">
                                <div class="row">
                                    <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2">
                                        <img class="border border-dark rounded mx-auto d-block" :src="anime.image_url"/>
                                    </div>
                                    <div class="col-6 col-sm-7 col-md-8 col-lg-9 col-xl-10">
                                        <h4 class="align-top">{{anime.title}}</h4>
                                        <h5 class="align-top text-muted">{{anime.type}} ({{anime.episodes}} eps)</h5>
                                        <h5 class="align-top text-muted">{{anime.airing_start || `?`}} - {{anime.airing_end || `?`}}</h5>
                                        <h5 class="align-top text-muted">{{anime.members}} members</h5>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center">
                                <svg class="s-36px rounded mx-auto d-block m-1" viewBox="0 0 24 24">
                                    <path fill="#FDD835" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                </svg>
                                <h5 class="d-block m-1">{{anime.score || `N/A`}}</h5>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: `top-anime`,
    data(){
        return {
            type: this.$route.params.type,
            topAnimes: [],
            page: 1
        }
    },
    watch: {
        '$route': 'updateType'
    },methods: {
        updateType(){
            this.type = this.$route.params.type
            if(this.checkType()){
                this.getTopAnime()
            }
        },
        getTopAnime(){
            fetch(`https://api.jikan.moe/top/anime/${this.page}/${this.type}`, {
                method: `GET`
            }).then((response) => {
                if(response.status === 200){
                    return response.json().then((jsonResponse) => {
                        this.topAnimes = jsonResponse.top
                    })
                }else{
                    this.goTo404()
                    return null
                }
            })
        },
        goTo404(){
            this.$router.push('/404/page-not-found')
        },
        checkType(){
            const validTypes = [`airing`, `upcoming`, `movie`, `tv`, `special`, `ova`]
            if(!validTypes.includes(this.type)){
                this.goTo404()
                return false
            }
            return true
        },
        showAnimeDetails(animeID){
            this.$router.push(`/anime/${animeID}`)
        }
    },
    created(){
        if(this.checkType()){
            this.getTopAnime()
        }
    },
    computed: {
        displayType(){
            switch(this.type){
                case `airing`:
                    return [`Top`, `Airing`, `Animes`]
                    break
                case `upcoming`:
                    return [`Top`, `Upcoming`, `Animes`]
                    break
                case `movie`:
                    return [`Top`, `Anime`, `Movies`]
                    break
                case `tv`:
                    return [`Top`, `Animes`, `Of`, `All`, `Time`]
                    break
                case `special`:
                    return [`Top`, `Special`, `Animes`]
                    break
                case `ova`:
                    return [`Top`, `OVA`, `Animes`]
                    break
            }
        }
    }
}
</script>
