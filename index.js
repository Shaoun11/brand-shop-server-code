const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000;





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
   
 //post data phones
    app.post("/phones", async (req, res) => {
      const phones = req.body;
      const result = await database.insertOne(phones);
      console.log(result);
      res.send(result);
    });
    //post data cart
    app.post("/mycart", async (req, res) => {
      const mycart = req.body;
      const result = await database.insertOne(mycart);
      console.log(result);
      res.send(result);
    });

    //get cart data
    app.get("/mycart", async (req, res) => {
      const result = await database.find().toArray();
      res.send(result);
    });

    //get phones data
    app.get("/phones", async (req, res) => {
      const result = await database.find().toArray();
      res.send(result);
    });

    //get id
    app.get("/phones/:id",async(req,res)=>{
      const id =req.params.id;
      const query={_id:new ObjectId(id)};
      const result=await database.findOne(query);
      res.send(result);
  })
  //delete data
  app.delete("/phones/:id", async (req, res) => {
    const id = req.params.id;
    console.log("delete", id);
    const query = {
      _id: new ObjectId(id),
    };
    const result = await database.deleteOne(query);
    console.log(result);
    res.send(result);
  });

  //update data

app.put("/phones/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log("id", id, data);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedata = {
        $set: {
          name: data.name,
          img:data.img,
          BrandName:data.BrandName,
          rating:data.rating,
          Price:data.Price,
          type:data.type,
          description:data.description
        },
      };
      const result = await database.updateOne(filter,updatedata,options);
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