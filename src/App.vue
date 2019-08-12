<template>
	<v-app>
		<v-app-bar class="noselect" app>
			<v-toolbar-title class="pointer" @click="navigate(`home`)">The Anime Database</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-items>
				<v-menu v-model="topAnimeMenuState" open-on-hover close-on-click close-on-content-click offset-y light>
					<template v-slot:activator="{ on }">
						<v-btn text v-on="on">
							Top Anime
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(item, index) in topAnime" :key="index" @click="navigate(`home`)">
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
						<v-list-item v-for="(item, index) in schedule" :key="index" @click="navigate(`home`)">
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
				<v-btn text>
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
			{ title: `Top Anime Series` },
			{ title: `Top Airing` },
			{ title: `Top Upcoming` },
			{ title: `Top Movies` },
			{ title: `Top TV` },
			{ title: `Top Specials` },
			{ title: `Top OVAs` }
		],
		topAnimeMenuState: false,
		schedule: [
			{ title: `Monday` },
			{ title: `Tuesday` },
			{ title: `Wednesday` },
			{ title: `Top TV` },
			{ title: `Top Special` },
			{ title: `Top OVA` }
		],
		scheduleMenuState: false
	}),
	methods: {
		navigate(routeName) {
			if(this.$router.currentRoute.name !== routeName){
				this.$router.push({ name: routeName })
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
</style>