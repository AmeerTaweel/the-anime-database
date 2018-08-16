<template>
  <div id="app" class="container">
    <h1 class="text-center m-4 home" @click="goHome" title="Return To Homepage"><span class="text-primary">T</span>he <span class="text-primary">A</span>nime <span class="text-primary">D</span>atabase</h1>
    <h1 class="text-center"><small class="text-muted">All Your Anime Need At One Place!</small></h1>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goHome(){
      this.$router.push('/home')
    }
  },
  created(){
    this.goHome()
  }
}
</script>

<style>
hr {
  border-top: 1px solid #8c8b8b;
}
.home {
  cursor: pointer;
}
</style>
