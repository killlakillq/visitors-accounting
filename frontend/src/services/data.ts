import axios from 'axios';
import { type Ref } from 'vue';

export const getVisitors = async (tableData: Ref<Object[]>) => {
	try {
		const response = await axios.get('https://jgigyym431.execute-api.us-east-1.amazonaws.com/visitors');
		tableData.value = response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createVisitor = async (visitor: Ref<{ name: string; surname: string }>) => {
	try {
		const response = await axios.post('https://jgigyym431.execute-api.us-east-1.amazonaws.com/visitor/create');
		visitor = response.data;
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const deleteVisitor = async (id: Ref<string>) => {
	try {
		const response = await axios.delete(`https://jgigyym431.execute-api.us-east-1.amazonaws.com/visitor/delete/${id}`);
		id = response.data;
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
