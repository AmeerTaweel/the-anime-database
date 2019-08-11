<template>
	<div>
		
	</div>
</template>

<script>
export default {
	name: `App`,
	data: () => ({
		animeTypes: {
			airing: {
				anime: [],
				display: `Airing`,
				type: `airing`
			}, 
			upcoming: {
				anime: [],
				display: `Upcoming`,
				type: `upcoming`
			}
		}
	}),
	methods: {
		fetchTopAnimesByType(animeType) {
			// Just get the first page
			fetch(`https://api.jikan.moe/top/anime/1/${animeType}`, {
                method: `GET`
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
				this.animeTypes[animeType] = jsonResponse.top.slice(0, 24)
			})
		}
	},
	created() {
		Object.keys(this.animeTypes).forEach(animeType => {
			this.fetchTopAnimesByType(animeType)
		})
	}
};
</script>
