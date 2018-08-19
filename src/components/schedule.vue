<template>
    <div id="schedule">
        YattaZo
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
            fetch(`https://api.jikan.moe/schedule/${fetchDay}`, {
                method: `GET`
            }).then((response) => {
                return response.json()
            }).then((jsonResponse) => {

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
