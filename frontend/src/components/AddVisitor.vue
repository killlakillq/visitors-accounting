<template>
	<div class="addVisitorButton">
		<el-button
			class="el-button el-button--primary is-round"
			type="primary"
			@click="addModalWindowVisible = true"
			round
			>Add visitor</el-button
		>
	</div>
	<el-dialog v-model="addModalWindowVisible" title="Add new visitor" width="30%" center>
		<div>
			<el-input v-model="name" class="input" placeholder="Name" />
			<el-input v-model="surname" class="input" placeholder="Surname" />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addModalWindowVisible = false">Cancel</el-button>
				<el-button type="primary" @click="addModalWindowVisible = false">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const addModalWindowVisible = ref(false);
const name = ref('');
const surname = ref('');
</script>

<style scoped>
.input {
	margin-bottom: 10px;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}

.text {
	font-size: 16px;
}

.addVisitorButton {
	display: flex;
	justify-content: center;
}

.el-button {
	margin: 0 auto;
	width: 20%;
}
</style>
