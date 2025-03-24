// pages/api/saveReview.js
import AWS from 'aws-sdk';

AWS.config.update({region: "eu-west-2"})

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { movie, rating, review } = req.body;
    const params = {
      TableName: 'moviews', // Replace with your DynamoDB table name
      Item: {
        id,
        movie,
        rating,
        review,
      },
    };

    try {
      await dynamoDb.put(params).promise();
      return res.status(200).json({ message: 'Review saved successfully!' });
    } catch (error) {
      console.error('Error saving review:', error);
      return res.status(500).json({ message: 'Error saving review' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
