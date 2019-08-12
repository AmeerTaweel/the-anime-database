<template>
	<v-container fluid>
		<h1 class="display-3 ma-4 red--text">{{msg}}</h1>
		<v-btn class="ma-4" color="red" @click="home">
			Go To Home Page
			<v-icon right>mdi-home</v-icon>
		</v-btn>
	</v-container>
</template>

<script>
export default {
	props: {
		msg: String
	},
	methods: {
		home() {
			this.$router.push({ name: `home` })
		}
	}
}
</script>