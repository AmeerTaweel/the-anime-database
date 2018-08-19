<template>
    <div id="schedule">
        <h1><span class="text-primary">{{day[0].toUpperCase()}}</span>{{day.substr(1)}} <span class="text-primary">A</span>nime <span class="text-primary">S</span>chedule:</h1>
    </div>
</template>

<script>
export default {
    name: `schedule`,
    data(){
        return {
            day: this.$route.params.day,
            days: [`all`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`],
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
            let fetchDay = this.day
            if(fetchDay === 'all'){
                fetchDay = ''
            }
            fetch(`https://api.jikan.moe/schedule/${fetchDay}`, {
                method: `GET`
            }).then((response) => {
                if(response.status === 200){
                    return response.json().then((jsonResponse) => {
                        this.schedule = jsonResponse
                    })
                }else{
                    this.goTo404()
                    return null
                }
            })
        }
    },
    created(){
        if(this.checkDay()){
            this.getSchedule()
        }
    }
}
</script>
