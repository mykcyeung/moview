import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { id } = query;  // Get ID from URL query (if available)

  const params = {
    TableName: 'moviews',
  };

  try {
    switch (method) {
      case 'GET':
        // Fetch all reviews or a single review if ID is provided
        if (id) {
          params.Key = { id }; // Fetch a specific review by ID
          const data = await dynamoDb.get(params).promise(); // Use get to fetch single item
          if (!data.Item) {
            return res.status(404).json({ message: 'Review not found' });
          }
          return res.status(200).json(data.Item);
        }
        const data = await dynamoDb.scan(params).promise(); // Scan for all reviews
        return res.status(200).json(data.Items);

      case 'POST':
        // Create a new review
        const newItem = {
          ...body,  // Assuming body contains { movie, rating, review }
          id: body.id || new Date().toISOString(), // Use the id from the body if it's there, otherwise generate one
        };

        const postParams = {
          TableName: 'moviews',
          Item: newItem,
        };

        try {
          await dynamoDb.put(postParams).promise();
          return res.status(201).json(newItem);
        } catch (error) {
          console.error('Error saving review:', error);
          return res.status(500).json({ message: 'Error creating review' });
        }

      case 'PUT':
        // Update an existing review
        if (!id) {
          return res.status(400).json({ message: 'ID is required for update' });
        }
        const updateParams = {
          TableName: 'moviews',
          Key: { id },
          UpdateExpression: 'set movie = :m, rating = :r, review = :rev',
          ExpressionAttributeValues: {
            ':m': body.movie,
            ':r': body.rating,
            ':rev': body.review,
          },
          ReturnValues: 'ALL_NEW', // Return the updated item
        };
        const updatedItem = await dynamoDb.update(updateParams).promise();
        return res.status(200).json(updatedItem.Attributes);

      case 'DELETE':
        // Delete a review by ID
        if (!id) {
          return res.status(400).json({ message: 'ID is required for deletion' });
        }
        const deleteParams = {
          TableName: 'moviews',
          Key: { id },
        };
        await dynamoDb.delete(deleteParams).promise();
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error with DynamoDB operation:', error);
    return res.status(500).json({ message: 'Error processing request' });
  }
}
