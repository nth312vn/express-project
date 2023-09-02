import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
config()
const uri = process.env.DATABASEURI || ''

console.log('test', uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } catch {
    console.log('connect DB errors')
  }
}
