import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect('mongodb+srv://user123:testPass123@cluster0.ymw71.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  const collection = db.collection('todos');

  if (req.method === 'POST') {
    const newTodo = { text: req.body.text };
    const result = await collection.insertOne(newTodo);
    client.close();
    res.status(201).json({ message: 'Todo inserted!', todo: result.ops[0] });
  } else if (req.method === 'GET') {
    const todos = await collection.find().toArray();
    client.close();
    res.status(200).json({ todos });
  } else if (req.method === 'DELETE') {
    const id = req.body.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    client.close();
    res.status(200).json({ message: 'Todo deleted!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
