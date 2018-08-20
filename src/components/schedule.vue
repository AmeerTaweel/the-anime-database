<template>
    <div id="schedule">
        <h1><span class="text-primary">{{day[0].toUpperCase()}}</span>{{day.substr(1)}} <span class="text-primary">A</span>nime <span class="text-primary">S</span>chedule:</h1>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 p-2" v-for="(anime, index) in getFormattedSchedule" :key="index">
                <div class="card border-primary h-100">
                    <div class="card-header text-primary pointer" @click="showAnimeDetails(anime.mal_id)">{{anime.title}}</div>
                    <div class="row">
                        <p class="card-text col-12 text-center p-1 m-0">
                            <small>
                                <span v-if="anime.producer[0]" class="text-primary">{{anime.producer[0].name}}</span>
                                <span v-else class="text-primary">N/A</span>
                                 | <span class="text-primary">{{anime.episodes || `0`}} eps</span>
                                 | <span class="text-primary">{{anime.source}}</span>
                            </small>
                        </p>
                        <div class="col-12">
                            <div class="p-1 bg-primary text-center">
                                <span class="badge badge-pill badge-light m-1" v-for="(genre, gIndex) in anime.genre" :key="gIndex">{{genre.name}}</span>
                            </div>
                        </div>    
                        <div class="col-6">
                            <img :id="`${anime.mal_id}-image`" class="w-100 rounded-left" :src="anime.image_url"/>
                        </div>
                        <div class="col-6">
                            <div :id="`${anime.mal_id}-synopsis`" class="scrollable">
                                <p>{{anime.synopsis}}</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row card-footer text-center m-0 p-1">
                                <span class="col-4">
                                    <svg class="s-24px rounded mx-auto d-block m-1" viewBox="0 0 24 24">
                                        <path fill="#000000" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                                    </svg>
                                    {{anime.show_time}}
                                </span>
                                <span class="col-4">
                                    <svg class="s-24px rounded mx-auto d-block m-1" viewBox="0 0 24 24">
                                        <path fill="#FDD835" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                    </svg>
                                    {{anime.score || `N/A`}}
                                </span>
                                <span class="col-4">
                                    <svg class="s-24px rounded mx-auto d-block m-1" viewBox="0 0 24 24">
                                        <path fill="#000000" d="M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9A2.1,2.1 0 0,1 14.1,8A2.1,2.1 0 0,1 12,10.1A2.1,2.1 0 0,1 9.9,8A2.1,2.1 0 0,1 12,5.9Z" />
                                    </svg>
                                    {{anime.members || `0`}}
                                </span>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `schedule`,
    data(){
        return {
            day: this.$route.params.day,
            days: [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`],
            schedule: []
        }
    },
    watch: {
        '$route' : 'update'
    },
    methods: {
        checkDay(){
            if(!this.days.includes(this.day)){
                this.goTo404()
                return false
            }
            return true
        },
        goTo404(){
            this.$router.push('/404/page-not-found')
        },
        update(){
            this.day = this.$route.params.day
            if(this.checkDay()){
                this.getSchedule()
            }
        },
        getSchedule(){
            fetch(`https://api.jikan.moe/schedule/${this.day}`, {
                method: `GET`
            }).then((response) => {
                if(response.status === 200){
                    return response.json().then((jsonResponse) => {
                        this.schedule = jsonResponse[this.day]
                    })
                }else{
                    this.goTo404()
                    return null
                }
            })
        },
        showAnimeDetails(animeID){
            this.$router.push(`/anime/${animeID}`)
        },
        setParagraphHeight(){
            this.schedule.forEach((anime) => {
                let image = document.getElementById(`${anime.mal_id}-image`)
                const preventParagraphOverflow = () => {
                    let imageHeight = image.clientHeight
                    document.getElementById(`${anime.mal_id}-synopsis`).style.height = `${imageHeight}px`
                }
                image.addEventListener('load', preventParagraphOverflow)
                window.addEventListener(`resize`, preventParagraphOverflow)
            })
        },
    },
    computed: {
        getFormattedSchedule(){
            const timeRegularExp = /.*(?=([0-1][0-9]|2[0-3]):[0-5][0-9] \(JST\)$)/g
            this.schedule.forEach((anime) => {
                anime.show_time = anime.airing_start.replace(timeRegularExp, '')
            })
            return this.schedule
        }
    },
    created(){
        if(this.checkDay()){
            this.getSchedule()
        }
    },
    updated(){
        this.setParagraphHeight()
    }
}
</script>

<style>
.scrollable{
    height: 100px;
    overflow-y: scroll;
}
</style>
