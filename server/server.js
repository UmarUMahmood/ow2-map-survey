import express from "express"
import cors from "cors"
import { getVotes, addVote } from "./db.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/votes", async (req, res) => {
    try {
        const votes = await getVotes()
        res.status(200).json(votes)
    } catch (err) {
        res.status(500).send("Error retrieving votes")
    }
})

app.post("/vote", async (req, res) => {
    const { map1, map2, voted } = req.body
    try {
        await addVote(map1, map2, voted)
        res.status(201).send("Vote added")
    } catch (err) {
        res.status(500).send("Error adding vote")
    }
})

app.listen(port, () => {
    console.log(`OW2 Map Survey app listening on port ${port}`)
})