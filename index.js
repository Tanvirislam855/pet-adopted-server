const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config()
const uri = process.env.MONGODB_URI;
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
//  const port = process.env.port
// app.use(cors())

// const port = 8000
const port = process.env.PORT || 8000;
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
    const db = client.db("pet-adopted")
    const destinationCollection = db.collection("destinations")
    app.post('/destination',async (req,res) =>{
       
        const destination = req.body
         console.log(destinationData)
        const result = await destinationCollection.insertOne(destinationData)
        res.json(result)

    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.use(cors())
app.get('/', (req, res) => {
  res.send("Server is running fine!")
})


app.listen(port,()=> {
    console.log(`server runing on port ${port}`)
})
