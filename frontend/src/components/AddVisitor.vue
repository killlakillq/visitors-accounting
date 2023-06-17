<template>
	<div class="addVisitorButton">
		<el-button class="el-button el-button--primary is-round" type="primary" @click="openModalWindow = true" round
			>Add visitor</el-button
		>
	</div>
	<el-dialog v-model="openModalWindow" title="Warning" width="30%" center>
		<span> It should be noted that the content will not be aligned in center by default </span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="openModalWindow = false">Cancel</el-button>
				<el-button type="primary" @click="openModalWindow = false"> Confirm </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const openModalWindow = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
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
