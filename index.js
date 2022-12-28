const { MongoClient, ServerApiVersion } = require('mongodb');
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
    }
    finally {

    }
}

run().catch(error => console.log(error))


app.listen(port, () => {
    console.log(`this is port is connected port ${port}`)
})
