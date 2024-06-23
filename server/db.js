import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import fs from "fs"
import path from "path"

dotenv.config()

const url = process.env.MONGODB_URL
const dbName = "votes_db"
let client
let db

export async function initialiseDb() {
  if (!client) {
    client = new MongoClient(url)

    try {
      await client.connect()
      db = client.db(dbName)
      console.log("Connected successfully to MongoDB")
    } catch (err) {
      console.error("Error connecting to MongoDB: ", err)
      throw err
    }
  }
}

// convert votes to a json file to save in ./data
function saveToJsonFile(votes) {
  const json = JSON.stringify(votes)
  fs.writeFileSync(path.join("./data", "votes.json"), json)
}

export async function getVotes() {
  try {
    if (!db) await initialiseDb()
    const collection = db.collection("votes")
    const votes = await collection.find({}).toArray()
    saveToJsonFile(votes)
    return votes
  } catch (err) {
    console.error("Error retrieving votes: ", err)
  }
}

export async function getCount() {
  try {
    if (!db) await initialiseDb()
    const collection = db.collection("votes")
    const countVotes = await collection.count()
    return countVotes
  } catch (err) {
    console.error("Error getting count: ", err)
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
  }
}

export async function closeDb() {
  if (client) {
    try {
      await client.close()
      console.log("MongoDB connection closed")
    } catch (err) {
      console.error("Error closing MongoDB connection:", err)
    }
  }
}
