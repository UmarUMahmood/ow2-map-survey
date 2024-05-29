<script></script>

<template>
  <div class="column1">
    <img class="map1" src="./assets/maps/samoa.jpg" alt="Map Image 1" />
  </div>
  <div class="column2">
    <img class="map2" src="./assets/maps/ilios.jpg" alt="Map Image 1" />
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

.map1,
.map2 {
  height: 100vh;
  width: 50%;
  position: absolute;
  object-fit: cover;
}

.map1 {
  left: 0;
}

.map2 {
  right: 0%;
}
</style>
