import express from "express"
import cors from "cors"
import { getVotes, getCount, addVote, initialiseDb, closeDb } from "./database.js"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // limit each IP to 200 requests per windowMs
})

app.use(limiter)
app.use(helmet())
app.use(express.json())

const maps = [
  "Antarctic Peninsula",
  "Blizzard World",
  "Busan",
  "Circuit Royal",
  "Colosseo",
  "Dorado",
  "Eichenwalde",
  "Esperanca",
  "Gibraltar",
  "Havana",
  "Hollywood",
  "Ilios",
  "Junkertown",
  "Kings Row",
  "Lijiang",
  "Midtown",
  "Nepal",
  "New Junk City",
  "New Queen Street",
  "Numbani",
  "Oasis",
  "Paraiso",
  "Rialto",
  "Route 66",
  "Samoa",
  "Shambali",
  "Suravasa"
]

const validateMaps = (req, res, next) => {
  const { map1, map2, voted } = req.body
  if (!maps.includes(map1) || !maps.includes(map2) || !maps.includes(voted)) {
    return res.status(400).send("Invalid map name")
  }
  next()
}

app.get("/votes", async (req, res) => {
  const votes = await getVotes()
  res.status(200).json(votes)
})

app.get("/count", async (req, res) => {
  const count = await getCount()
  res.status(200).json(count)
})

app.post("/vote", validateMaps, async (req, res) => {
  const { map1, map2, voted } = req.body
  await addVote(map1, map2, voted)
  res.status(201).send("Vote added")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, async () => {
  try {
    await initialiseDb()
    console.log(`OW2 Map Survey app listening on port ${port}`)
  } catch (err) {
    console.error("Failed to initialize the database:", err)
    process.exit(1)
  }
})

process.on("SIGINT", async () => {
  await closeDb()
  process.exit(0)
})
