const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Mongodb Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvaku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db("hawk-e-scooter-database");
        const test = database.collection("test");
        const dashboardCollection = database.collection("dashboardCollection");


        // Dashboard 
        app.get('/dashboard', async (req, res) => {
            const cursor = dashboardCollection.find({});
            const dashboard = await cursor.toArray();
            res.send(dashboard);
        })

        app.post('/dashboard', async (req, res) => {
            const dashboard = req.body;
            const result = await dashboardCollection.insertOne(dashboard);
            res.json(result);
        })

        // const result = await test.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('wellcome to the HAWK e-scooter server');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});