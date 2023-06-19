<template>
	<div class="addVisitorButton">
		<el-button class="mt-4" style="width: 100%" @click="addModalWindowVisible = true">Add visitor</el-button>
	</div>
	<div>
		<el-dialog v-model="addModalWindowVisible" title="New visitor" width="30%" center>
			<div>
				<el-input v-model="name" class="input" placeholder="Name" />
				<el-input v-model="surname" class="input" placeholder="Surname" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addModalWindowVisible = false">Cancel</el-button>
					<el-button type="primary" @click="handleSubmit">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { createVisitor } from '@/services/data';
import { ref } from 'vue';
const addModalWindowVisible = ref(false);
const name = ref('');
const surname = ref('');
const requestBody = ref({
	id: '',
	name: '',
	surname: '',
});

const handleSubmit = () => {
	createVisitor(requestBody.value.id, requestBody.value.name, requestBody.value.surname);
	addModalWindowVisible.value = false;
};
</script>

<style scoped>
.input {
	margin-bottom: 10px;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}

.el-button {
	margin-top: 10px;
}
</style>
