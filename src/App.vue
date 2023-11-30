<template>
  <div class="app">
    <VueCube/>
  </div>
</template>

<script>
import VueCube from './components/VueCube.vue'

export default {
  name: 'App',
  components: {
    VueCube
  }
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
html {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
.app {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
