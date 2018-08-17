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
            if(this.checkType()){
                this.getTopAnime()
            }
        },
        getTopAnime(){
            
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
