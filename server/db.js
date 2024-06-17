import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config({ path: "../.env"});

const url = process.env.MONGODB_URL;
const dbName = "votes_db";
const client = new MongoClient(url);

export async function getVotes() {
    try {
        const db = client.db(dbName);
        const collection = db.collection("votes");
        const votes = await collection.find({}).toArray();
        return votes;
    } catch (err) {
        console.error("Error retrieving votes: ", err);
    }
}

export async function addVote(map1, map2, voted) {
    try {
        const db = client.db(dbName);
        const collection = db.collection("votes");
        const result = await collection.insertOne({ map1, map2, voted });
        console.log(`New vote inserted with the following id: ${result.insertedId}`);
    } catch (err) {
        console.error("Error adding vote: ", err);
    }
}
