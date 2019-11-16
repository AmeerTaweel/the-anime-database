<template>
	<v-container v-if="!isNotFound && !error" v-bind="{ [`grid-list-lg`]: true }" fluid>	
		<h1 class="display-3 ma-4">{{anime.title}}</h1>
		<v-layout class="ma-4 text-justify" wrap>
			<v-flex xs12 md4>
				<v-layout column>
					<v-flex xs12>
						<lazy-component class="fill">
							<img class="fill" :src="anime.image_url">
						</lazy-component>
						<h4 class="display-1 my-5">Alternative Titles:</h4>
						<h5 class="headline my-2" v-if="anime.title_japanese">
							<strong>Japanese</strong>: {{anime.title_japanese}}
						</h5>
						<h5 class="headline my-2" v-if="anime.title_english">
							<strong>English</strong>: {{anime.title_english}}
						</h5>
						<h5 class="headline my-2" v-if="anime.title_synonyms">
							<strong>Synonyms</strong>: {{anime.title_synonyms}}
						</h5>
						<h4 class="display-1 my-5">Information:</h4>
						<h5 class="headline my-2">	
							<strong>Type</strong>: {{anime.type || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Episodes</strong>: {{anime.episodes || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Status</strong>: {{anime.status || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Aired</strong>: {{anime.aired_string || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Premiered</strong>: {{anime.premiered || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Broadcast</strong>: {{anime.broadcast || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Producers</strong>:
							<span v-if="!anime.producer || !anime.producer.length">{{na}}</span>
							<div v-else>
								<span v-for="(producer, index) in anime.producer" :key="index">{{producer.name}}<span v-if="anime.producer.length > index + 1">, </span></span>
							</div>
						</h5>
						<h5 class="headline my-2">
							<strong>Licensors</strong>:
							<span v-if="!anime.licensor || !anime.licensor.length">{{na}}</span>
							<div v-else>
								<span v-for="(licensor, index) in anime.licensor" :key="index">{{licensor.name}}<span v-if="anime.licensor.length > index + 1">, </span></span>
							</div>
						</h5>
						<h5 class="headline my-2">
							<strong>Studios</strong>:
							<span v-if="!anime.studio || !anime.studio.length">{{na}}</span>
							<div v-else>
								<span v-for="(studio, index) in anime.studio" :key="index">{{studio.name}}<span v-if="anime.studio.length > index + 1">, </span></span>
							</div>
						</h5>
						<h5 class="headline my-2">
							<strong>Source</strong>: {{anime.source || na}}
						</h5>
						<h5 class="headline my-2">
							<strong>Genres</strong>:
							<span v-if="!anime.genre || !anime.genre.length">{{na}}</span>
							<div v-else>
								<span v-for="(genre, index) in anime.genre" :key="index">{{genre.name}}<span v-if="anime.genre.length > index + 1">, </span></span>
							</div>
						</h5>
						<h5 class="headline my-2">
							<strong>Duration</strong>: {{anime.duration || na}}
						</h5>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs12 md8>
				<v-layout column>
					<v-flex xs12>
						<h4 class="display-1 my-5">Statistics:</h4>
						<v-layout row wrap>
							<v-flex xs6>
								<h5 class="headline my-2"><strong>Score</strong>: {{anime.score || na}}</h5>
							</v-flex>
							<v-flex xs6>
								<h5 class="headline my-2"><strong>Ranked</strong>: #{{anime.rank || na}}</h5>
							</v-flex>
							<v-flex xs6>
								<h5 class="headline my-2"><strong>Popularity</strong>: {{anime.popularity || na}}</h5>
							</v-flex>
							<v-flex xs6>
								<h5 class="headline my-2"><strong>Members</strong>: {{anime.members || na}}</h5>
							</v-flex>
						</v-layout>
						<h4 class="display-1 my-5">Synopsis:</h4>
						<p class="headline my-2">{{anime.synopsis}}</p>
						<div v-if="anime.background">
							<h4 class="display-1 my-5">Background:</h4>
							<p class="headline my-2">{{anime.background}}</p>
						</div>
						<div v-if="anime.related">
							<h4 class="display-1 my-5">Related:</h4>
							<h5 class="headline my-2" v-if="anime.related.Adaptation && anime.related.Adaptation.length">
								<strong>Adaptation</strong>: <span v-for="(adaptation, index) in anime.related.Adaptation" :key="index">{{adaptation.title}}<span v-if="anime.related.Adaptation.length > index + 1">, </span></span>
							</h5>
							<h5 class="headline my-2" v-if="anime.related[`Side story`] && anime.related[`Side story`].length">
								<strong>Side Story</strong>: <span v-for="(sideStory, index) in anime.related[`Side story`]" :key="index">{{sideStory.title}}<span v-if="anime.related[`Side story`].length > index + 1">, </span></span>
							</h5>
							<h5 class="headline my-2" v-if="anime.related.Summary && anime.related.Summary.length">
								<strong>Summary</strong>: <span v-for="(summary, index) in anime.related.Summary" :key="index">{{summary.title}}<span v-if="anime.related.Summary.length > index + 1">, </span></span>
							</h5>
							<h5 class="headline my-2" v-if="anime.related[`Parent story`] && anime.related[`Parent story`].length">
								<strong>Parent Story</strong>: <span v-for="(parentStory, index) in anime.related[`Parent story`]" :key="index">{{parentStory.title}}<span v-if="anime.related[`Parent story`].length > index + 1">, </span></span>
							</h5>
						</div>
						<div v-if="anime.opening_theme && anime.opening_theme.length">
							<h4 class="display-1 my-5">Opening Themes:</h4>
							<h5 class="headline my-2" v-for="(theme, index) in anime.opening_theme" :key="index">{{theme}}</h5>
						</div>
						<div v-if="anime.ending_theme && anime.ending_theme.length">
							<h4 class="display-1 my-5">Ending Themes:</h4>
							<h5 class="headline my-2" v-for="(theme, index) in anime.ending_theme" :key="index">{{theme}}</h5>
						</div>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
	<problem v-else-if="isNotFound" msg="Error 404: Anime Not Found"/>
	<problem v-else msg="An Unknown Error Occurred"/>
</template>
<script>
import Problem from '../components/Problem'
export default {
	data: () => ({
		anime: {},
		isNotFound: false,
		error: false,
		na: `N/A`
	}),
	props: {
		id: String
	},
	methods: {
		getAnimeData(){
			fetch(`https://api.jikan.moe/v3/anime/${this.id}`, {
				method: `GET`
			}).then((response) => {
				if(response.ok){
					return response.json().then(jsonResponse => {
						this.anime = jsonResponse
					})
				} else if(response.status === 404) {
					this.isNotFound = true
				} else {
					this.error = true
				}
			})
		}
	},
	created() {
		this.getAnimeData()
	},
	components: {
		Problem
	}
}
</script>