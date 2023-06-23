<template>
	<div class="table">
		<el-table :data="tableData">
			<el-table-column label="Date" prop="date" sortable />
			<el-table-column label="Name" prop="name" sortable />
			<el-table-column label="Surname" prop="surname" sortable />
			<el-table-column label="Operations" prop="operations">
				<template #default="scope">
					<el-button type="primary" :icon="Edit" @click="showUpdateConfirmation(scope.row.id)" />
					<el-button type="danger" :icon="Delete" @click="showDeleteConfirmation(scope.row.id)" />
				</template>
			</el-table-column>
		</el-table>
		<AddVisitor />
	</div>
	<div>
		<el-dialog v-model="editModalWindowVisible" title="Update visitor" width="30%" center>
			<div>
				<el-input v-model="body.name" class="input" placeholder="Name" />
				<el-input v-model="body.surname" class="input" placeholder="Surname" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editModalWindowVisible = false">Cancel</el-button>
					<el-button type="primary" @click="updateItem">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div>
		<el-dialog v-model="deleteModalWindowVisible" title="Warning" width="30%" center>
			<span class="text">Do you really want to delete a visitor?</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="deleteModalWindowVisible = false">Cancel</el-button>
					<el-button type="primary" @click="deleteItem">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getVisitors, deleteVisitor, updateVisitor } from '@/services/data';
import { Edit, Delete } from '@element-plus/icons-vue';
import AddVisitor from './AddVisitor.vue';

const deleteModalWindowVisible = ref(false);
const editModalWindowVisible = ref(false);
const tableData = ref<any>([]);
const body = ref({
	name: '',
	surname: '',
});
const updateId = ref('');
const deleteId = ref('');

getVisitors(tableData);

const showDeleteConfirmation = (id: string) => {
	deleteModalWindowVisible.value = true;
	deleteId.value = id;
};

const deleteItem = () => {
	deleteVisitor(deleteId.value);
	deleteModalWindowVisible.value = false;
};

const showUpdateConfirmation = (id: string) => {
	editModalWindowVisible.value = true;
	updateId.value = id;
};

const updateItem = () => {
	updateVisitor(updateId.value, body.value.name, body.value.surname);
	editModalWindowVisible.value = false;
};
</script>

<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}
.input {
	margin-bottom: 10px;
}

.text {
	font-size: 16px;
}

.table {
	margin: auto;
	width: 40%;
	padding: 50px;
}

.el-table {
	border-collapse: collapse;
	width: 100%;
	border: 1px solid #ccc;
}
</style>
