<template>
  <div id="app" class="container">
    <h1 class="text-center m-4 pointer" @click="goHome" title="Return To Homepage"><span class="text-primary">T</span>he <span class="text-primary">A</span>nime <span class="text-primary">D</span>atabase</h1>
    <h1 class="text-center"><small class="text-muted">All Your Anime Need At One Place!</small></h1>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/home">T.A.D.B.</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item active dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarAnimeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Anime
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarAnimeDropdown">
              <router-link v-for="(top, index) in topAnime" :key="index" class="dropdown-item" :to="`/top-anime/1/${top}`">Top {{top[0].toUpperCase()}}{{top.substr(1)}}</router-link>
              <!-- TODO: Uncomment and use this devider when adding new sections -->
              <!-- <div class="dropdown-divider"></div> -->
            </div>
          </li>
          <li class="nav-item active dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScheduleDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Schedule
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarScheduleDropdown">
              <router-link v-for="(day, index) in schedule" :key="index" class="dropdown-item" :to="`/schedule/${day}`">{{day[0].toUpperCase()}}{{day.substr(1)}} Schedule</router-link>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      topAnime: [`airing`, `upcoming`, `movie`, `tv`, `special`, `ova`],
      schedule: [`all`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`]
    }
  },
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
.pointer {
  cursor: pointer;
}
.s-36px{
  width: 36px;
  height: 36px;
}
</style>
