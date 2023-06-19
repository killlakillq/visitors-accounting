<template>
	<div class="table">
		<el-table :data="tableData">
			<el-table-column label="Date" prop="Date" sortable />
			<el-table-column label="Name" prop="Name" sortable />
			<el-table-column label="Surname" prop="Surname" sortable />
			<el-table-column label="Operations" prop="operations">
				<template #default="scope">
					<el-button type="primary" @click="editModalWindowVisible = true">Edit</el-button>
					<el-button type="danger" @click="showDeleteConfirmation(scope.row.id)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
		<AddVisitor />
	</div>
	<div>
		<el-dialog v-model="editModalWindowVisible" title="Warning" width="30%" center>
			<span class="text">It should be noted that the content will not be aligned in center by default</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editModalWindowVisible = false">Cancel</el-button>
					<el-button type="primary" @click="editModalWindowVisible = false">Confirm</el-button>
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
import { getVisitors, deleteVisitor } from '@/services/data';
import AddVisitor from './AddVisitor.vue';

const deleteModalWindowVisible = ref(false);
const editModalWindowVisible = ref(false);
const tableData = ref<any>([]);
const deleteId = ref('');

getVisitors(tableData);

const showDeleteConfirmation = (id: string) => {
	deleteModalWindowVisible.value = true;
	deleteId.value = id;
};

const deleteItem = () => {
	deleteVisitor(deleteId.value);
	deleteModalWindowVisible.value = false;
	setTimeout(() => {
		window.location.reload();
	}, 500);
};
</script>

<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
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
