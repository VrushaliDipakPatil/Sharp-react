import { MongoClient } from "mongodb";

// /api/new-todo

async function handler(req, res){
if(req.method === 'POST'){
    const data = req.body;


    const client = await MongoClient.connect('mongodb+srv://vrushalip91097:vrushrani@cluster0.olkd5ds.mongodb.net/todos?retryWrites=true&w=majority')
    const db = client.db();

    const todosCollection = db.collection('todos')
    const result = await todosCollection.insertOne(data)
    console.log(result);
    client.close()

    res.status(201).json({message: 'to-do inserted'});
}
}

export default handler;