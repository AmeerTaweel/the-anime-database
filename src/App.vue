<template>
  <div id="app" class="container">
    <h1 class="text-center m-20"><span class="text-primary">T</span>he <span class="text-primary">A</span>nime <span class="text-primary">D</span>atabase</h1>
    <h1 class="text-center"><small class="text-muted">All Your Anime Need At One Place!</small></h1>
    <home></home>
    <anime></anime>
  </div>
</template>

<script>
import Home from "./components/home"
import Anime from "./components/anime"
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Home,
    Anime
  }
}
</script>

<style>
.m-20 {
  margin: 20px;
}
</style>
