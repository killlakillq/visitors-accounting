import AWS from 'aws-sdk';
import { AWS_REGION, DYNAMODB_TABLE } from './shared/constants';
import { Visitor } from './shared/interfaces/visitor.interface';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const client = new AWS.DynamoDB.DocumentClient({ region: AWS_REGION });

const app = express();

app.use(express.json());
app.use(cors());

app.post('/visitor/create', async (req: Request, res: Response) => {
	const { name, surname }: Visitor = req.body;

	const currentTime = Date.now();
	const date = new Date(currentTime);

	const params = {
		TableName: DYNAMODB_TABLE,
		Item: {
			id: uuidv4(),
			name: name,
			surname: surname,
			date: `${date.toISOString()}`,
		},
	};

	try {
		await client.put(params).promise();
		res.status(201).json({ name, surname });
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to create visitor' }),
		};
	}
});

app.get('/visitors', async (req: Request, res: Response) => {
	const params = {
		TableName: DYNAMODB_TABLE,
	};

	try {
		const result = await client.scan(params).promise();
		const visitors = result.Items;

		res.status(200).json(visitors);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch visitors' });
	}
});

app.get('/visitor/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	const params = {
		TableName: DYNAMODB_TABLE,
		Key: { id },
	};

	try {
		const result = await client.get(params).promise();

		if (result.Item) {
			res.status(404).json({ message: 'Visitor not found' });
		}
		res.status(200).json(result.Item);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch visitor' });
	}
});

app.put('/visitor/update/:id', async (req: Request, res: Response) => {
	const { name, surname }: Visitor = req.body;
	const { id } = req.params;

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
		res.status(200).json(result.Attributes);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update visitor' });
	}
});

app.delete('/visitor/delete/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	const params = {
		TableName: DYNAMODB_TABLE,
		Key: { id },
	};

	try {
		await client.delete(params).promise();
		res.status(200).json({ message: 'Visitor deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete visitor' });
	}
});

module.exports.handler = serverless(app);
