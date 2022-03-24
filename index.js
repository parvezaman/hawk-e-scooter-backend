const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvaku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("hawk-e-scooter-database");
    const test = database.collection("test");
    const dashboardCollection = database.collection("dashboardCollection");
    const usersCollection = database.collection("usersCollection");
    const scootersCollection = database.collection("scootersCollection");
    const packagesCollection = database.collection("packagesCollection");

    // Dashboard
    app.get("/dashboard", async (req, res) => {
      const cursor = dashboardCollection.find({});
      const dashboard = await cursor.toArray();
      res.send(dashboard);
    });

    app.post("/dashboard", async (req, res) => {
      const dashboard = req.body;
      const result = await dashboardCollection.insertOne(dashboard);
      res.json(result);
    });

    // users collection

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

    // scooters collection

    app.get("/scooters", async (req, res) => {
      const cursor = scootersCollection.find({});
      const scooters = await cursor.toArray();
      res.send(scooters);
    });

    app.post("/scooters", async (req, res) => {
      const scooter = req.body;
      const result = await scootersCollection.insertOne(scooter);
      res.json(result);
    });

    // Packages collection
    app.get("/packages", async (req, res) => {
      const cursor = packagesCollection.find({});
      const packages = await cursor.toArray();
      res.send(packages);
    });

    app.post("/packages", async (req, res) => {
      const package = req.body;
      const result = await packagesCollection.insertOne(package);
      res.json(result);
    });

    app.delete("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await packagesCollection.deleteOne(query);
      res.json(result);
    });
    // payment
    // report
    // coupon
    // SCL social media logins
    // product category
    // package/special
    // tickets/customer complains
    // customer database
    // messaging
    // customer wallet
    // sell dashboard (how many sells are happening)
    // stock (and also waiting time to get the product)

    // const result = await test.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("wellcome to the HAWK e-scooter server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
