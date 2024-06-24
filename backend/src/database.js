import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import fs from "fs"
import path from "path"

dotenv.config()

const url = process.env.MONGO_URI
const dbName = "votes_db"
let client
let db

const voteSchema = {
  bsonType: "object",
  required: ["map1", "map2", "voted"],
  properties: {
    map1: {
      bsonType: "string",
      description: "must be a string and is required"
    },
    map2: {
      bsonType: "string",
      description: "must be a string and is required"
    },
    voted: {
      bsonType: "string",
      description: "must be a string and is required"
    }
  }
}

async function createCollectionWithSchema(db, collectionName, schema) {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray()
  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: schema }
    })
    console.log(`Collection ${collectionName} created with schema`)
  } else {
    console.log(`Collection ${collectionName} already exists`)
  }
}

export async function initialiseDb() {
  if (!client) {
    client = new MongoClient(url)
    try {
      await client.connect()
      db = client.db(dbName)
      console.log("Connected successfully to MongoDB")

      // Ensure collection is created with the appropriate schema
      await createCollectionWithSchema(db, "votes", voteSchema)
    } catch (err) {
      console.error("Error connecting to MongoDB: ", err)
      throw err
    }
  }
}

export async function getVotes() {
  try {
    if (!db) await initialiseDb()
    const collection = db.collection("votes")
    const votes = await collection.find({}).toArray()
    return votes
  } catch (err) {
    console.error("Error retrieving votes: ", err)
    throw err
  }
}

export async function getCount() {
  try {
    if (!db) await initialiseDb()
    const collection = db.collection("votes")
    const countVotes = await collection.countDocuments()
    return countVotes
  } catch (err) {
    console.error("Error getting count: ", err)
    throw err
  }
}

export async function addVote(map1, map2, voted) {
  try {
    if (!db) await initialiseDb()
    const collection = db.collection("votes")
    const result = await collection.insertOne({ map1, map2, voted })
    console.log(`New vote inserted with the following id: ${result.insertedId}`)
  } catch (err) {
    console.error("Error adding vote: ", err)
    throw err
  }
}

export async function closeDb() {
  if (client) {
    try {
      await client.close()
      console.log("MongoDB connection closed")
    } catch (err) {
      console.error("Error closing MongoDB connection:", err)
      throw err
    }
  }
}
