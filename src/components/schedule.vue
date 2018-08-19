<template>
    <div id="schedule">
        <h1><span class="text-primary">{{day[0].toUpperCase()}}</span>{{day.substr(1)}} <span class="text-primary">A</span>nime <span class="text-primary">S</span>chedule:</h1>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 p-2" v-for="(anime, index) in getFormattedSchedule" :key="index">
                <div class="card border-primary h-100">
                    <div class="card-header text-primary">{{anime.title}}</div>
                    <div class="row">
                        <p class="card-text col-12 text-center p-1 m-0">
                            <small>
                                <span v-if="anime.producer[0]" class="text-primary">{{anime.producer[0].name}}</span>
                                 | <span class="text-primary">{{anime.episodes}} eps</span>
                                 | <span class="text-primary">{{anime.source}}</span>
                            </small>
                        </p>
                        <div class="col-12">
                            <div class="p-1 bg-primary text-center">
                                <span class="badge badge-pill badge-light m-1" v-for="(genre, gIndex) in anime.genre" :key="gIndex">{{genre.name}}</span>
                            </div>
                        </div>    
                        <div class="col-6">
                            <img class="w-100 rounded-left" :src="anime.image_url"/>
                        </div>
                        <div class="col-6">
                            <p>{{anime.synopsis}}</p>
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
        }
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
    }
}
</script>