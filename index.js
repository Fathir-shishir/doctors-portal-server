const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require ('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8gpwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

async function run() {
    try {
        await client.connect();
        console.log('connected')
        const database = client.db("doctors_portal").collection("services");

        app.get('/service',async (req,res)=>{
            const query = { };
            const cursor = database.find(query)
            const services= await cursor.toArray()
            res.send(services)
        })
      
      } finally {
        // await client.close();
      }
}
run().catch(console.dir);
