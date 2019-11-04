<template>
	<div v-if="user">
		<b-row v-for="(prop,val) in user" :key="val" class="p-2 mb-3 mr-2 detail">
			<b-col cols="3" class="detail-right">{{val}}</b-col>
			<b-col cols="7">{{formatVal(val,prop)}}</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		props: ["user"],
		methods: {
			formatVal(val, prop) {
				if (val === "createdAt" || val === "updatedAt") {
					return new Date(prop).toString();
				}
				return prop;
			}
		}
	};
</script>

<style scoped>
	.detail {
		background: #dae2e6;
		border-radius: 5px;
	}
	.detail-right {
		border-right: 1px solid rgb(69, 75, 80);
	}
</style>
 