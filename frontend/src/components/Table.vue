<template>
	<div class="table">
		<el-table :data="filterTableData">
			<el-table-column label="Date" prop="date" sortable />
			<el-table-column label="Name" prop="name" sortable />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" placeholder="Type to search" />
				</template>
				<template #default="scope">
					<el-button type="primary" @click="handleEdit(scope.$index, scope.row)" round>Edit</el-button>
					<el-button type="danger" @click="deleteModalWindowVisible = true" round>Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<div>
		<el-dialog v-model="deleteModalWindowVisible" title="Warning" width="30%" center>
			<span> It should be noted that the content will not be aligned in center by default </span>
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

const deleteModalWindowVisible = ref(false);

interface User {
	date: string;
	name: string;
	address: string;
}

const search = ref('');
const filterTableData = computed(() =>
	tableData.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())),
);
const handleEdit = (index: number, row: User) => {
	console.log(index, row);
};

const tableData: User[] = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'John',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Morgan',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Jessy',
		address: 'No. 189, Grove St, Los Angeles',
	},
];
</script>

<style scoped>
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
