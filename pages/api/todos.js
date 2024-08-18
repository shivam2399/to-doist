import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect('mongodb+srv://user123:testPass123@cluster0.ymw71.mongodb.net/meetups');
  const db = client.db();
  const todosCollection = db.collection('todos');

  if (req.method === 'POST') {
    const data = req.body;
    const result = await todosCollection.insertOne({ text: data.text, status: data.status });
    client.close();
    res.status(201).json({ id: result.insertedId.toString(), text: data.text, status: data.status });
  }

  if (req.method === 'DELETE') {
    const todoId = req.body.id;
    await todosCollection.deleteOne({ _id: new ObjectId(todoId) });
    client.close();
    res.status(200).json({ message: 'Todo deleted successfully' });
  }

  if (req.method === 'PATCH') {
    const { id, newText, status } = req.body;
    const updateData = newText ? { text: newText } : { status };
    await todosCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    client.close();
    res.status(200).json({ message: 'Todo updated successfully' });
  }
}

export default handler;
