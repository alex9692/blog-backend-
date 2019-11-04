<template>
	<div>
		<b-row class="mb-4 mt-3" v-for="(index,i) in 3" :key="i">
			<b-col class="mr-4" cols="1" offset-md="1">
				<b-card no-body class="user-icon__container mt-3">
					<b-card-text>
						<v-icon class="user-icon" name="user"></v-icon>
					</b-card-text>
				</b-card>
			</b-col>
			<b-col cols="9">
				<b-card class="pt-4 pb-0 px-3 card-custom">
					<b-card-title>Test</b-card-title>
					<b-card-text>Test review</b-card-text>
					<div class="d-flex w-100 justify-content-between mt-4">
						<b-card-text>Ratings: 3</b-card-text>
						<b-card-text>Created At: {{new Date().toLocaleDateString()}}</b-card-text>
					</div>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<style scoped>
	.user-icon__container {
		background-color: #7c8892;
		border-radius: 20px;
	}

	.user-icon {
		color: #434547;
	}

	.card-custom {
		cursor: pointer;
		color: #343a40;
		transition: all 300ms;
		box-shadow: 1px 2px 3px rgba(0.5, 0.5, 0.5, 0.5);
	}
	.card-custom:hover {
		background: #7b8794;
		color: #fff;
	}
	.card-custom:active {
		transform: translateY(2px);
	}
	.card-custom:hover .star-icon {
		color: #fff;
	}
</style>