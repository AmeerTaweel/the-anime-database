<template>
	<v-container fluid>
		<v-container v-if="!isNotFound && !error" fluid>
			<h1 class="display-3 ma-4">Top {{animeTypes[type].display}}</h1>
			<v-simple-table class="ma-4">
				<thead>
					<tr>
						<th class="headline text-center yellow black--text" style="width: 10%;">Rank</th>
						<th class="headline text-left yellow black--text" style="width: 80%;">Anime</th>
						<th class="headline text-center yellow black--text" style="width: 10%;">Score</th>
					</tr>
				</thead>
				<tbody>
					<tr class="pointer" v-for="(anime, i) in topAnimes" :key="i" @click="moreInfo(anime.mal_id)">
						<td class="text-center headline">#{{anime.rank}}</td>
						<td>
							<v-layout class="ma-2" row>
								<v-flex xs4 md3 lg2>
									<v-layout column fill-height justify-center>
										<lazy-component :id="`img${i}`" class="fill" @show="forceAspectRatio(`img${i}`)">
											<img class="fill" :src="anime.image_url">
										</lazy-component>
									</v-layout>
								</v-flex>
								<v-flex xs8 md9 lg10>
									<v-layout class="mx-4" column>
										<h4 class="display-1 yellow--text">{{anime.title}}</h4>
										<h5 class="headline">{{anime.type}} ({{anime.episodes}} eps)</h5>
										<h5 class="headline">{{anime.airing_start || `?`}} - {{anime.airing_end || `?`}}</h5>
										<h5 class="headline">{{anime.members}} members</h5>
									</v-layout>
								</v-flex>
							</v-layout>
						</td>
						<td class="text-center headline">
							<v-layout column>
								<v-icon class="ma-2" color="yellow">mdi-star</v-icon>
								<span class="ma-2">{{anime.score || `N/A`}}</span>
							</v-layout>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
			<v-layout class="ma-4" row>
					<v-flex class="text-center">
						<v-btn class="mr-2" light color="yellow" rounded :disabled="intPage <= 1" @click="prev">
							<v-icon left>mdi-arrow-left</v-icon>
							Prev
						</v-btn>
						<v-chip light active color="yellow">{{intPage}}</v-chip>
						<v-btn class="ml-2" light color="yellow" rounded :disabled="topAnimes.length < 50" @click="next">
							Next
							<v-icon right>mdi-arrow-right</v-icon>
						</v-btn>
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
		topAnimes: [],
		animeTypes: {
			airing: {
				display: `Airing Anime`,
				type: `airing`
			}, 
			upcoming: {
				display: `Upcoming Anime`,
				type: `upcoming`
			},
			series: {
				display: `Anime Series`,
				type: ``
			},
			movie: {
				display: `Anime Movies`,
				type: `movie`
			},
			tv: {
				display: `Anime TV Series`,
				type: `tv`
			},
			special: {
				display: `Anime Specials`,
				type: `special`
			},
			ova: {
				display: `Anime OVA Series`,
				type: `ova`
			}
		},
		isNotFound: false,
		error: false
	}),
	props: {
		type: String,
		page: [Number, String]
	},
	computed: {
		intPage() {
			return parseInt(this.page)
		}
	},
	watch: {
		$route() {
			this.topAnimes = []
			this.isNotFound = false
			this.error = false
			this.getAnimeData()
		}
	},
	methods: {
		getAnimeData(){
			if(!this.animeTypes[this.type] || this.intPage < 1){
				this.isNotFound = true
			} else {
				fetch(`https://api.jikan.moe/top/anime/${this.intPage}/${this.animeTypes[this.type].type}`, {
					method: `GET`
				}).then((response) => {
					if(response.ok){
						return response.json().then(jsonResponse => {
							this.topAnimes = jsonResponse.top
						})
					} else if(response.status === 404) {
						this.isNotFound = true
					} else {
						this.error = true
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
		prev() {
			this.$router.push({ name: `top`, params: { type: this.type, page: this.intPage - 1 } })
		},
		next(){
			this.$router.push({ name: `top`, params: { type: this.type, page: this.intPage + 1 } })
		},
		home() {
			this.$router.push({ name: `home` })
		},
		moreInfo(id) {
			this.$router.push({ name: `anime`, params: { id: `${id}` } })
		}
	},
	created() {
		this.getAnimeData()
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener(`resize`, () => {
				for(let i = 0; i < this.topAnimes.length; i++){
					this.forceAspectRatio(`img${i}`)
				}
			})
		})
	}
}
</script>