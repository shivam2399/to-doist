import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://user123:testPass123@cluster0.ymw71.mongodb.net/meetups');
    const db = client.db();

    const todosCollection = db.collection('todos');
    const result = await todosCollection.insertOne({ text: data.text, status: data.status });

    client.close();

    res.status(201).json({ id: result.insertedId.toString(), text: data.text, status: data.status });
  }
}

export default handler;
