const express = require('express');
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//coffee
//MA57VivpFWvdEjZi


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://coffee:MA57VivpFWvdEjZi@cluster0.ni8nft9.mongodb.net/?retryWrites=true&w=majority";

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

    const secondDatabase = client.db("SecondDB").collection('data');

    //Create
    app.post('/data',async(req,res)=>{
        const data = req.body;
        const result = await secondDatabase.insertOne(data);
        res.send(result);
    })
    //Read
    app.get('/',async(req,res)=>{
        const result = await secondDatabase.find().toArray();
        res.send(result);
    })
    //Update
    app.put('/data/:id',async(req,res)=>{
        const id = req.params.id;
        const data = req.body;
        console.log(id,data);
        const filter = { _id: new ObjectId(id)};
        const options = {upsert:true};
        const updatedData = {
            $set: {
                name: data.name,
                email: data.email
            }
        }
        const result = await secondDatabase.updateOne(filter,updatedData,options);
        res.send(result);
    })
    //getSingleData to update
    app.get('/data/:id',async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id)};
        const result = await secondDatabase.findOne(query);
        res.send(result);
    })
    //Delete
    app.delete('/data/:id',async(req,res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id)};
        const result = await secondDatabase.deleteOne(query);
        res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// const person = [
//     {id:1,name:'riad',email:'riad@gmail.com'},
//     {id:2,name:'mitu',email:'mitu@gmail.com'},
//     {id:3,name:'baby',email:'baby@gmail.com'},
//     {id:4,name:'abbu',email:'abbu@gmail.com'},
// ]

// app.get('/',(req,res)=>{
//     res.send(person);
// })

app.listen(port, ()=>{
    console.log(`Server is running on: ${port}`);
})