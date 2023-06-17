<template>
	<div class="table">
		<el-table :data="filterTableData">
			<el-table-column label="Date" prop="date" sortable />
			<el-table-column label="Name" prop="name" sortable />
			<el-table-column label="Surname" prop="surname" sortable />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" placeholder="Type to search" />
				</template>
				<template #default="scope">
					<el-button type="primary" @click="editModalWindowVisible = true" round>Edit</el-button>
					<el-button type="danger" @click="deleteModalWindowVisible = true" round>Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<div>
		<el-dialog v-model="editModalWindowVisible" title="Warning" width="30%" center>
			<span class="text"> It should be noted that the content will not be aligned in center by default </span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editModalWindowVisible = false">Cancel</el-button>
					<el-button type="primary" @click="editModalWindowVisible = false"> Confirm </el-button>
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
					<el-button type="primary" @click="deleteModalWindowVisible = false"> Confirm </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getVisitors } from '@/services/data';

const deleteModalWindowVisible = ref(false);
const editModalWindowVisible = ref(false);
const tableData = ref([]);
const search = ref('');

getVisitors(tableData);

const filterTableData = computed(() =>
	tableData.value.filter(
		(data: any) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()),
	),
);
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
	width: 70%;
	padding: 50px;
}

.el-table {
	border-collapse: collapse;
	width: 100%;
	border: 1px solid #ccc;
}

.el-table th,
.el-table td {
	border: 1px solid #ccc;
	padding: 8px;
}

.el-table th {
	background-color: #f2f2f2;
}
</style>
