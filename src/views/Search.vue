<template>
	<v-container fluid>
		<v-container v-if="!error" fluid>
			<h1 class="display-3 ma-4">Search Anime</h1>
			<v-text-field class="mx-4" color="yellow" hint="What are you looking for?" :loading="isLoading" clearable :counter="100" append-icon="mdi-magnify" v-model="query" @click:append="pushNewQuery" @keyup.enter="pushNewQuery"/>

			<h3 class="display-1 ma-4 secondary--text">{{resultsFor.length ? `* Search Results For: ${resultsFor}` : ``}}</h3>

			<v-layout class="ma-4" column>
				<v-container>
					<v-flex class="search-item pointer" xs12 v-for="(anime, i) in animes" :key="i" @click="moreInfo(anime.mal_id)">
						<v-layout class="my-4" row>
							<v-flex xs2>
								<lazy-component :id="`img${i}`" class="fill" @show="forceAspectRatio(`img${i}`)">
									<img class="fill" :src="anime.image_url">
								</lazy-component>
							</v-flex>
							<v-flex xs10>
								<v-layout class="mx-4" column>
									<v-flex xs12>
										<h4 class="display-1 yellow--text clamp-one-line search-title">{{anime.title}}</h4>
										<h5 class="headline">{{anime.type}} ({{anime.episodes}} eps)</h5>
										<h5 class="headline">Score: {{anime.score || `N/A`}}</h5>
										<h5 class="headline">{{anime.members}} members</h5>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-container>
			</v-layout>

			<v-snackbar v-model="isSnackbarShown" color="error" :timeout="3000" top>
				Search cannot be longer than 100 characters!
			</v-snackbar>
		</v-container>
		<problem v-else msg="An Unknown Error Occurred"/>
	</v-container>
</template>
<script>
import Problem from '../components/Problem'
export default {
	data: () => ({
		query: ``,
		resultsFor: ``,
		animes: [],
		isLoading :false,
		error: false,
		isSnackbarShown: false
	}),
	props: {
		pQuery: String
	},
	watch: {
		$route() {
			this.init()
		}
	},
	methods: {
		pushNewQuery() {
			this.$router.push({ name: `searchQ`, params: { pQuery: this.query} })
		},
		init() {
			this.query = ``
			this.resultsFor = ``
			this.animes = []
			this.isLoading = false
			this.error = false
			this.isSnackbarShown = false
			if(this.pQuery){
				this.query = this.pQuery
				this.getAnimeData()
			}
		},
		getAnimeData() {
			if(this.query.length > 100){
				this.isSnackbarShown = true
			} else {
				const cQuery = this.query
				this.animes = []
				this.isLoading = true
				this.resultsFor = this.query
				fetch(`https://api.jikan.moe/v3/search/anime?q=${this.query}&page=1`, {
					method: `GET`
				}).then((response) => {
					if(cQuery === this.query){
						this.isLoading = false
						if(response.ok){
							return response.json().then(jsonResponse => {
								this.animes = jsonResponse.results
							})
						} else {
							this.error = true
						}
					}
				})
			}
		},
		forceAspectRatio(id){
			const img = document.getElementById(id)
			if(img){
				img.style.height = `${img.offsetWidth / (225 / 318)}px`
			}
		},
		moreInfo(id) {
			this.$router.push({ name: `anime`, params: { id: `${id}` } })
		}
	},
	created() {
		this.init()
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener(`resize`, () => {
				for(let i = 0; i < this.animes.length; i++){
					this.forceAspectRatio(`img${i}`)
				}
			})
		})
	},
	components: {
		Problem
	}
}
</script>

<style lang="sass" scoped>
.search-item:hover .search-title
	text-decoration: underline
</style>