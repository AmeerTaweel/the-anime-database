<template>
	<v-container fluid>
		<v-container v-if="!isNotFound && !error" v-bind="{ [`grid-list-lg`]: true }" fluid>
			<h1 class="display-3 ma-4">{{days[day].name}} Anime Schedule</h1>
			<v-layout class="ma-4" row wrap>
				<v-flex v-for="(anime, i) in animes" :key="i" xs12 sm6 md4>
					<v-card class="mx-auto" raised width="100%" height="100%">
						<h5 class="pa-4 headline clamp-one-line">{{anime.title}}</h5>
						<div class="px-4 py-2 text-center yellow  black--text">
							<span>{{anime.producer[0] ? anime.producer[0].name : `N/A`}}</span>
							| <span>{{anime.episodes || `0`}} eps</span>
							| <span>{{anime.source}}</span>
						</div>
						<div class="text-center px-3 py-1 horizantally-scrollable">
                            <v-chip class="mx-1 my-1" color="yellow" light v-for="(genre, j) in anime.genre" :key="j">{{genre.name}}</v-chip>
                        </div>
						<v-layout row>
							<v-flex xs6>
								<lazy-component :id="`img${i}`" class="fill" @show="forceAspectRatio(i)">
									<img class="fill" :src="anime.image_url">
								</lazy-component>
							</v-flex>
							<v-flex xs6>
								<div :id="`synopsis${i}`" class="vertically-scrollable">{{anime.synopsis}}</div>
							</v-flex>
						</v-layout>
						<v-container fluid>
							<v-layout row>
								<v-flex class="text-center" xs4>
									<v-icon color="yellow">mdi-clock</v-icon><br/>
									<span class="ma-2 yellow--text">{{getShowTime(anime.airing_start)}}</span>
								</v-flex>
								<v-flex class="text-center" xs4>
									<v-icon color="yellow">mdi-star</v-icon><br/>
									<span class="ma-2 yellow--text">{{anime.score || `N/A`}}</span>
								</v-flex>
								<v-flex class="text-center" xs4>
									<v-icon color="yellow">mdi-account</v-icon><br/>
									<span class="ma-2 yellow--text">{{anime.members || `0`}}</span>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-container fluid v-else-if="isNotFound">
			<h1 class="display-3 ma-4 red--text">Error 404: Page Not Found</h1>
			<v-btn class="ma-4" color="red" @click="home">
				Go To Home Page
				<v-icon right>mdi-home</v-icon>
			</v-btn>
		</v-container>
		<v-container fluid v-else>
			<h1 class="display-3 ma-4 red--text">An Unknown Error Occurred</h1>
			<v-btn class="ma-4" color="red" @click="home">
				Go To Home Page
				<v-icon right>mdi-home</v-icon>
			</v-btn>
		</v-container>
	</v-container>
</template>
<script>
export default {
	data: () => ({
		animes: [],
		days: {
			monday: {
				name: `Monday`
			},
			tuesday: {
				name: `Tuesday`
			},
			wednesday: {
				name: `Wednesday`
			},
			thursday: {
				name: `Thursday`
			},
			friday: {
				name: `Friday`
			},
			saturday: {
				name: `Saturday`
			},
			sunday: {
				name: `Sunday`
			},
		},
		isNotFound: false,
		error: false,
		aspectRatioHeight: 318
	}),
	props: {
		day: String
	},
	watch: {
		$route() {
			this.animes = []
			this.isNotFound = false
			this.error = false
			this.getAnimeData()
		}
	},
	methods: {
		getAnimeData(){
			if(!this.days[this.day]){
				this.isNotFound = true
			} else {
				fetch(`https://api.jikan.moe/schedule/${this.day}`, {
					method: `GET`
				}).then((response) => {
					if(response.ok){
						return response.json().then(jsonResponse => {
							this.animes = jsonResponse[this.day]
						})
					} else if(response.status === 404) {
						this.isNotFound = true
					} else {
						this.error = true
					}
				})	
			}
		},
		forceAspectRatio(i){
			const img = document.getElementById(`img${i}`)
			const synopsis = document.getElementById(`synopsis${i}`)
			if(img){
				const h = img.offsetWidth / (225 / 318)
				img.style.height = `${h}px`
				synopsis.style.height = `${h}px`
			}
		},
		home() {
			this.$router.push({ name: `home` })
		},
		moreInfo(id) {
			this.$router.push({ name: `anime`, params: { id: `${id}` } })
		},
		getShowTime(time) {
			const d = new Date(time)
			return `${d.getHours()}:${d.getMinutes() || `00`}`
		}
	},
	created() {
		this.getAnimeData()
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener(`resize`, () => {
				for(let i = 0; i < this.animes.length; i++){
					this.forceAspectRatio(i)
				}
			})
		})
	}
}
</script>

<style lang="sass" scoped>
.clamp-one-line
	text-overflow: ellipsis
	white-space: nowrap
	overflow: hidden
.vertically-scrollable
	overflow-y: scroll
.horizantally-scrollable
	white-space: nowrap
	overflow-x: scroll
</style>