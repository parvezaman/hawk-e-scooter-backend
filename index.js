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
        const usersCollection = database.collection("usersCollection");
        const scootersCollection = database.collection("scootersCollection");


        // Dashboard 
        app.get('/dashboard', async (req, res) => {
            const cursor = dashboardCollection.find({});
            const dashboard = await cursor.toArray();
            res.send(dashboard);
        });

        app.post('/dashboard', async (req, res) => {
            const dashboard = req.body;
            const result = await dashboardCollection.insertOne(dashboard);
            res.json(result);
        });

        // users collection

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });

        // scooters collection

        app.get('/scooters', async (req, res) => {
            const cursor = scootersCollection.find({});
            const scooters = await cursor.toArray();
            res.send(scooters);
        });

        app.post('/scooters', async (req, res) => {
            const scooter = req.body;
            const result = await scootersCollection.insertOne(scooter);
            res.json(result);
        });

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