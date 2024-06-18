import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config({ path: "../.env"});

const url = process.env.MONGODB_URL;
const dbName = "votes_db";
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

export async function getVotes() {
    try {
        if (!db) await initialiseDb()
        const collection = db.collection("votes");
        const votes = await collection.find({}).toArray();
        return votes;
    } catch (err) {
        console.error("Error retrieving votes: ", err);
    }
}

export async function addVote(map1, map2, voted) {
    try {
        if (!db) await initialiseDb()
        const collection = db.collection("votes");
        const result = await collection.insertOne({ map1, map2, voted });
        console.log(`New vote inserted with the following id: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding vote: ", err);
    }
}

process.on("SIGINT", async () => {
    if (client) {
        await client.close()
        console.log("MongoDB connected closed")
    }
    process.exit(0);
})