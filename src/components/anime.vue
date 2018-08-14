<template>
    <div id="anime">
        <h1>{{id}}</h1>
    </div>    
</template>

<script>
export default {
    name: `anime`,
    data(){
        return {
            id: this.$route.params.id
        }
    }
}
</script>
