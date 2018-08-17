<template>
    <div id="top-anime">
        <h2>
            <span v-for="(word, index) in displayType" :key="index">
                <span class="text-primary">{{word[0]}}</span>{{word.substring(1, word.length)}}
            </span>:
        </h2>
    </div>
</template>

<script>
export default {
    name: `top-anime`,
    data(){
        return {
            type: this.$route.params.type
        }
    },
    watch: {
        '$route': 'updateType'
    },methods: {
        updateType(){
            this.type = this.$route.params.type
            this.checkType()
        },
        goTo404(){
            this.$router.push('/404/page-not-found')
        },
        checkType(){
            const validTypes = [`airing`, `upcoming`, `movie`, `tv`]
            if(!validTypes.includes(this.type)){
                this.goTo404()
            }
        }
    },
    created(){
        this.checkType()
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
            }
        }
    }
}
</script>
