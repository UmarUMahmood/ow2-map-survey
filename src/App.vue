<template>
  <div class="background">
    <div class="column column1">
      <img
        class="map"
        :src="getImageUrl(maps[0])"
        @click="vote(maps[0].name, maps[1].name, maps[0].name)"
        alt="Map Image 1"
      />
      <p class="mapName">{{ maps[0].name }}</p>
    </div>
    <div class="column column2">
      <img
        class="map"
        :src="getImageUrl(maps[1])"
        @click="vote(maps[0].name, maps[1].name, maps[1].name)"
        alt="Map Image 2"
      />
      <p class="mapName">{{ maps[1].name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { sendVote } from "./utils/voteHandler.js"

async function vote(map1, map2, voted) {
  console.log(`You were presented with ${map1} and ${map2}. You voted for ${voted}`)
  await sendVote(map1, map2, voted)
  updateMaps()
}

// 2 maps are passed to help avoid picking the same map twice
const maps = ref(getRandomMaps())

function getRandomMaps() {
  const allMaps = [
    { name: "Antarctic Peninsula", image: "antarctic_peninsula.jpg" },
    { name: "Blizzard World", image: "blizzard_world.jpg" },
    { name: "Busan", image: "busan.jpg" },
    { name: "Circuit Royal", image: "circuit_royal.jpg" },
    { name: "Colosseo", image: "colosseo.jpg" },
    { name: "Dorado", image: "dorado.jpg" },
    { name: "Eichenwalde", image: "eichenwalde.jpg" },
    { name: "Esperanca", image: "esperanca.jpg" },
    { name: "Gibraltar", image: "gibraltar.jpg" },
    { name: "Havana", image: "havana.jpg" },
    { name: "Hollywood", image: "hollywood.jpg" },
    { name: "Ilios", image: "ilios.jpg" },
    { name: "Junkertown", image: "junkertown.jpg" },
    { name: "Kings Row", image: "kings_row.jpg" },
    { name: "Lijiang", image: "lijiang.jpg" },
    { name: "Midtown", image: "midtown.jpg" },
    { name: "Nepal", image: "nepal.jpg" },
    { name: "New Junk City", image: "new_junk_city.jpg" },
    { name: "New Queen Street", image: "new_queen_street.jpg" },
    { name: "Numbani", image: "numbani.jpg" },
    { name: "Oasis", image: "oasis.jpg" },
    { name: "Paraiso", image: "paraiso.jpg" },
    { name: "Rialto", image: "rialto.jpg" },
    { name: "Route 66", image: "route_66.jpg" },
    { name: "Samoa", image: "samoa.jpg" },
    { name: "Shambali", image: "shambali.jpg" },
    { name: "Suravasa", image: "suravasa.jpg" }
  ]

  const maps = shuffle(allMaps).slice(0, 2)
  return maps
}

function getImageUrl(array) {
  return new URL(`./assets/maps/${array.image}`, import.meta.url)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function updateMaps() {
  maps.value = getRandomMaps()
}
</script>

<style>
@font-face {
  font-family: "BigNoodleTooOblique";
  src: url("./assets/big-noodle-too-oblique.ttf");
}

body,
html,
p {
  margin: 0;
  padding: 0;
}

.background {
  display: flex;
  height: 100vh;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.map {
  height: 100vh;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.map:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.mapName {
  font-family: "BigNoodleTooOblique";
  color: white;
  font-size: 7vw;
  text-align: center;
  text-shadow: black 1px 0 10px;
  z-index: 1;
  pointer-events: none;
}

.mapName::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
