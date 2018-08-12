<template>
  <div id="app" class="m-20">
    <h1 class="text-center"><span class="text-primary">T</span>he <span class="text-primary">A</span>nime <span class="text-primary">D</span>atabase</h1>
    <home></home>
  </div>
</template>

<script>
import Home from "./components/home"
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Home
  }
}
</script>

<style>
.m-20 {
  margin: 20px;
}
</style>
