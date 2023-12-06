const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4600;
app.use(cors())
app.use(express.json());

app.get('/', async(req, res) => {
    res.send("The circus festivity is running now")
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mursalin.bxh3q56.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();
    // Send a ping to confirm a successful connection

    const circusesCollection = client.db('circus_festivity').collection('circuses');
    const magicsCollection = client.db('circus_festivity').collection('magics');
    const ticketsCollection = client.db('circus_festivity').collection('tickets');
    const purchaseTicketsCollection = client.db('circus_festivity').collection('purchaseTickets');

    app.get('/circuses', async(req, res) => {
        const result = await circusesCollection.find().toArray();
        res.send(result);
    })

    // magics collections
    app.get('/magics', async(req, res) => {
        const result = await magicsCollection.find().toArray();
        res.send(result);
    })

    // tickets collections
    app.get('/tickets', async(req, res) => {
        const result = await ticketsCollection.find().toArray();
        res.send(result);
    })

    app.get('/tickets/:ticketId', async(req, res) => {
      const ticketId = req.params.ticketId;
      const result = await ticketsCollection.findOne({_id: new ObjectId(ticketId)})
      console.log(result);
      res.send(result);
    })

    // puchse tickets
    app.post('/purchase-ticket', async(req, res) => {
      const ticketDtls = req.body;
      const result = await purchaseTicketsCollection.insertOne(ticketDtls);
      res.send(result);
    })

    client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.listen(port, () => {
    console.log(`The current post ${port} is running now!`);
})







