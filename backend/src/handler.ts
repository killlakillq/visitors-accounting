import AWS from 'aws-sdk';
import { AWS_REGION, DYNAMODB_TABLE } from './shared/constants';
import { Visitor } from './shared/interfaces/visitor.interface';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new AWS.DynamoDB.DocumentClient({ region: AWS_REGION });

export const createVisitor = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const { id, name, surname }: Visitor = JSON.parse(event.body!);

	const params = {
		TableName: DYNAMODB_TABLE,
		Item: { id, name, surname },
	};

	try {
		await client.put(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Visitor created successfully' }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to create visitor' }),
		};
	}
};

export const updateVisitor = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const { id, name, surname }: Visitor = JSON.parse(event.body!);

	const params = {
		TableName: DYNAMODB_TABLE,
		Key: { id },
		UpdateExpression: 'set #name = :name, #surname = :surname',
		ExpressionAttributeNames: { '#name': 'name', '#surname': 'surname' },
		ExpressionAttributeValues: { ':name': name, ':surname': surname },
		ReturnValues: 'ALL_NEW',
	};

	try {
		const result = await client.update(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(result.Attributes),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to update visitor' }),
		};
	}
};

export const deleteVisitor = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const { id } = event.pathParameters!;

	const params = {
		TableName: DYNAMODB_TABLE,
		Key: { id },
	};

	try {
		await client.delete(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Visitor deleted successfully' }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to delete visitor' }),
		};
	}
};

export const getAllVisitors = async () => {
	const params = {
		TableName: DYNAMODB_TABLE,
	};

	try {
		const result = await client.scan(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(result.Items),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch visitors' }),
		};
	}
};

export const getVisitorById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const { id } = event.pathParameters!;

	const params = {
		TableName: DYNAMODB_TABLE,
		Key: { id },
	};

	try {
		const result = await client.get(params).promise();

		if (result.Item) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: 'Visitor not found' }),
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify(result.Item),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to fetch visitor' }),
		};
	}
};
