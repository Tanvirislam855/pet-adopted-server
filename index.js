const express = require('express')
const dontenv = require('dotenv')
const cors = require("cors")

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
dontenv.config()
const uri = process.env.MONGODB_URI;

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
   
    await client.connect();
    const db = client.db("pet-adopted")
    const petCollection = db.collection("pets")
    // booking
    const bookCollection = db.collection("booking")
    app.get('/all-pets', async (req,res) => {
    const result = await petCollection.find().toArray();
    res.json(result);
    }) ;

    
    app.post('/add-pet',async (req,res) =>{
       
        const petData = req.body
         console.log(petData)
        const result = await petCollection.insertOne(petData)
        res.json(result)
    })
    app.get("/all-pets/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    
    const query = { _id: new ObjectId(id) };
    const result = await petCollection.findOne(query);
    
    res.json(result);
  } catch (error) {
    
    console.error("Error fetching pet details:", error);
    res.status(400).json({ error: "Invalid ID format or pet not found" });
  }
});

app.get("/book/:userID", async(req,res) =>{
  const { userID } = req.params;
  const result = await bookCollection.find({ userID: userID }).toArray();
  res.json(result)

});

 

app.post("/book", async (req, res) => {
      const bookData = req.body;
      const result = await bookCollection.insertOne(bookData);

      res.json(result);
    });



    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
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
