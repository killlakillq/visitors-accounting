import axios from 'axios';
import { type Ref } from 'vue';

export const getVisitors = async (tableData: Ref<never[]>) => {
	try {
		const response = await axios.get('https://jgigyym431.execute-api.us-east-1.amazonaws.com/visitors');
		return (tableData.value = response.data);
	} catch (error) {
		console.error(error);
	}
};
