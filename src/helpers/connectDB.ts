import { config } from 'dotenv'
import mongoose from 'mongoose'
config()
const uri = process.env.DATABASEURI || ''

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export async function connectDB() {
  try {
    await mongoose.connect(uri)
  } catch {
    console.log('connect DB errors')
  }
}
