const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is the connected port')
})

const user = process.env.DB_User
const password = process.env.DB_Password


const uri = `mongodb+srv://${user}:${password}@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const TaskCollection = client.db('DailyTask').collections('userTask');

async function run() {
    try {
        const TaskCollection = client.db('DailyTask').collection('userTask')

        app.post('/task', async (req, res) => {
            const query = req.body;
            const allTask = await TaskCollection.insertOne(query);
            res.send(allTask);
        })
        app.get('/userTask', async (req, res) => {
            const email = req.body.email;
            const query = { email }
            const AllTask = await TaskCollection.find(query).toArray();
            res.send(AllTask);
        })
        app.get('/userTask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const singleTask = await TaskCollection.findOne(query);
            res.send(singleTask)
        })
        app.delete('/userTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const DeleteTask = await TaskCollection.deleteOne(filter)
            res.send(DeleteTask);
        })
    }
    finally {

    }
}

run().catch(error => console.log(error))


app.listen(port, () => {
    console.log(`this is port is connected port ${port}`)
})
