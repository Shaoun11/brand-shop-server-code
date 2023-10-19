const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000;


//Phone-data
//fO7AwBO2ZNwUWNDG




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uzun1bo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("Phone-data").collection("phones")
 
    app.post("/phones", async (req, res) => {
      const phones = req.body;
      const result = await database.insertOne(phones);
      console.log(result);
      res.send(result);
    });
    app.get("/phones", async (req, res) => {
      const result = await database.find().toArray();
      res.send(result);
    });


    

    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });  