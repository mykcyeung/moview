import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-2' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = {
      TableName: 'moviews',
    };

    try {
      const data = await dynamoDb.scan(params).promise();
      return res.status(200).json(data.Items);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ message: 'Error fetching reviews' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
