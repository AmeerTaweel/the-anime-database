<template>
	<v-app>
		<v-app-bar class="noselect" app>
			<v-toolbar-title class="pointer" @click="home">The Anime Database</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-toolbar-items>
				<v-btn text @click="home">
					Home
					<v-icon right>mdi-home</v-icon>
				</v-btn>
				<v-menu v-model="topAnimeMenuState" open-on-hover close-on-click close-on-content-click offset-y light>
					<template v-slot:activator="{ on }">
						<v-btn text v-on="on">
							Top Anime
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(item, index) in topAnime" :key="index" @click="top(item.type)">
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
				<v-menu v-model="scheduleMenuState" open-on-hover close-on-click close-on-content-click offset-y light>
					<template v-slot:activator="{ on }">
						<v-btn text v-on="on">
							Schedule
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(item, index) in schedule" :key="index" @click="sched(item.key)">
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
				<v-btn text @click="search">
					Search
					<v-icon right>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-content>
			<router-view/>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: `App`,
	data: () => ({
		topAnime: [
			{ title: `Top Anime Series`, type: `series` },
			{ title: `Top Airing`, type: `airing` },
			{ title: `Top Upcoming`, type: `upcoming` },
			{ title: `Top Movies`, type: `movie` },
			{ title: `Top TV`, type: `tv` },
			{ title: `Top Specials`, type: `special` },
			{ title: `Top OVAs`, type: `ova` }
		],
		topAnimeMenuState: false,
		schedule: [
			{ title: `Monday`, key: `monday` },
			{ title: `Tuesday`, key: `tuesday` },
			{ title: `Wednesday`, key: `wednesday` },
			{ title: `Thursday`, key: `thursday` },
			{ title: `Friday`, key: `friday` },
			{ title: `Saturday`, key: `saturday` },
			{ title: `Sunday`, key: `sunday` }
		],
		scheduleMenuState: false
	}),
	methods: {
		home() {
			if(this.$router.currentRoute.name !== `home`){
				this.$router.push({ name: `home` })
			}
		},
		top(animeType) {
			const to = `/top/${animeType}/1`
			if(this.$router.currentRoute.path !== to){
				this.$router.push(to)
			}
		},
		sched(day) {
			const to = `/schedule/${day}`
			if(this.$router.currentRoute.path !== to){
				this.$router.push(to)
			}
		},
		search() {
			if(this.$router.currentRoute.name !== `search`){
				this.$router.push({ name: `search` })
			}
		}
	}
}
</script>

<style lang="sass">
.noselect
	-webkit-touch-callout: none
	-webkit-user-select: none
	-khtml-user-select: none
	-moz-user-select: none
	-ms-user-select: none
	user-select: none

.pointer
	cursor: pointer

.fill
	width: 100%
	height: 100%

.clamp-one-line
	text-overflow: ellipsis
	white-space: nowrap
	overflow: hidden
</style>