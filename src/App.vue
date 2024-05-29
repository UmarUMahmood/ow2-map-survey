<template>
  <div class="background">
    <div class="column1">
      <img class="map1" :src="getImageUrl(maps[0])" alt="Map Image 1" />
    </div>
    <div class="column2">
      <img class="map2" :src="getImageUrl(maps[1])" alt="Map Image 2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 2 maps are passed to help avoid picking the same map twice
const maps = ref(getRandomMaps())

function getRandomMaps() {
  const allMaps = [
    { name: 'Antarctic Peninsula', image: 'antarctic_peninsula.jpg' },
    { name: 'Blizzard World', image: 'blizzard_world.jpg' },
    { name: 'Busan', image: 'busan.jpg' },
    { name: 'Circuit Royal', image: 'circuit_royal.jpg' },
    { name: 'Colosseo', image: 'colosseo.jpg' },
    { name: 'Dorado', image: 'dorado.jpg' },
    { name: 'Eichenwalde', image: 'eichenwalde.jpg' },
    { name: 'Esperanca', image: 'esperanca.jpg' },
    { name: 'Gibraltar', image: 'gibraltar.jpg' },
    { name: 'Havana', image: 'havana.jpg' },
    { name: 'Hollywood', image: 'hollywood.jpg' },
    { name: 'Ilios', image: 'ilios.jpg' },
    { name: 'Junkertown', image: 'junkertown.jpg' },
    { name: 'Kings Row', image: 'kings_row.jpg' },
    { name: 'Lijiang', image: 'lijiang.jpg' },
    { name: 'Midtown', image: 'midtown.jpg' },
    { name: 'Nepal', image: 'nepal.jpg' },
    { name: 'New Junk City', image: 'new_junk_city.jpg' },
    { name: 'New Queen Street', image: 'new_queen_street.jpg' },
    { name: 'Numbani', image: 'numbani.jpg' },
    { name: 'Oasis', image: 'oasis.jpg' },
    { name: 'Paraiso', image: 'paraiso.jpg' },
    { name: 'Rialto', image: 'rialto.jpg' },
    { name: 'Route 66', image: 'route_66.jpg' },
    { name: 'Samoa', image: 'samoa.jpg' },
    { name: 'Shambali', image: 'shambali.jpg' },
    { name: 'Suravasa', image: 'suravasa.jpg' }
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
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

.background {
  width: 100%;
}
.column1 {
  width: 50%;
  height: 100vh;
  float: left;
}
.column2 {
  margin-left: 50%;
  height: 100vh;
}

.map1,
.map2 {
  height: 100vh;
  position: absolute;
  object-fit: cover;
  z-index: -1;
}
</style>
