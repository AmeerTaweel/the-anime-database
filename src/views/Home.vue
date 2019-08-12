<template>
	<div>
		<div v-for="(animeType, i) in animeTypes" :key="i">
			<h1 class="display-3 ma-4">Top {{animeType.display}}</h1>
			<v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
				<v-layout wrap>
					<v-flex v-for="(anime, j) in animeType.animes" :key="j" xs6 sm4 md3 lg2>
						<v-hover v-slot:default="{ hover }">
							<v-card :id="`${i}/${j}`" :elevation="hover ? 12 : 2" class="mx-auto" height="100%" width="100%">
								<lazy-component class="fill" @show="forceAspectRatio(`${i}/${j}`)">
									<img class="fill" :src="anime.image_url">
								</lazy-component>
								<v-fade-transition>
									<v-overlay class="text-center" v-if="hover" absolute :opacity="0.75" color="white" light>
										<v-card-title class="black--text">{{anime.title}}</v-card-title>
										<v-btn @click="viewMoreAnimeInfo(anime.mal_id)">More Info</v-btn>
									</v-overlay>
								</v-fade-transition>
							</v-card>
						</v-hover>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>
export default {
	name: `App`,
	data: () => ({
		animeTypes: {
			airing: {
				animes: [],
				display: `Airing Anime`,
				type: `airing`
			}, 
			upcoming: {
				animes: [],
				display: `Upcoming Anime`,
				type: `upcoming`
			},
			series: {
				animes: [],
				display: `Anime Series`,
				type: ``
			},
			movie: {
				animes: [],
				display: `Anime Movies`,
				type: `movie`
			},
			tv: {
				animes: [],
				display: `Anime TV Series`,
				type: `tv`
			},
			special: {
				animes: [],
				display: `Anime Specials`,
				type: `special`
			},
			ova: {
				animes: [],
				display: `Anime OVA Series`,
				type: `ova`
			}
		}
	}),
	methods: {
		fetchTopAnimesByType(key, animeType) {
			// Just get the first page
			fetch(`https://api.jikan.moe/top/anime/1/${animeType}`, {
                method: `GET`
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
				this.animeTypes[key].animes = jsonResponse.top.slice(0, 12)
			})
		},
		forceAspectRatio(id){
			const card = document.getElementById(id)
			if(card){
				card.style.height = `${card.offsetWidth / (225 / 318)}px`
			}
		},
		viewMoreAnimeInfo(id) {
			this.$router.push({ name: `anime`, params: { id: `${id}` } })
		}
	},
	created() {
		Object.keys(this.animeTypes).forEach(key => {
			this.fetchTopAnimesByType(key, this.animeTypes[key].type)
		})
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener(`resize`, () => {
				Object.keys(this.animeTypes).forEach((key) => {
					this.animeTypes[key].animes.forEach((anime, j) => {
						this.forceAspectRatio(`${key}/${j}`)
					})
				})
			})
		})
	}
}
</script>

<style lang="sass" scoped>
.fill
	width: 100%
	height: 100%
</style>