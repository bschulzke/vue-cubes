<template>
<div class="scene">
  <div class="cube">
    <div class="cube__face cube__face--front">
        <CubeFace :topRight="red" :topLeft="red" :bottomLeft="red" :bottomRight="red"/>
    </div>
    <div class="cube__face cube__face--back">
        <CubeFace :topRight="orange" :topLeft="orange" :bottomLeft="orange" :bottomRight="orange"/>
    </div>
    <div class="cube__face cube__face--right">
        <CubeFace :topRight="green" :topLeft="green" :bottomLeft="green" :bottomRight="green"/>
    </div>
    <div class="cube__face cube__face--left">
        <CubeFace :topRight="blue" :topLeft="blue" :bottomLeft="blue" :bottomRight="blue"/>
    </div>
    <div class="cube__face cube__face--top">
        <CubeFace :topRight="yellow" :topLeft="yellow" :bottomLeft="yellow" :bottomRight="yellow"/>
    </div>
    <div class="cube__face cube__face--bottom">
        <CubeFace :topRight="white" :topLeft="white" :bottomLeft="white" :bottomRight="white"/>
    </div>
  </div>
</div>
<p class="radio-group">
  <label>
    <input type="radio" name="rotate-cube-side" value="front" checked /> front
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="right" /> right
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="back" /> back
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="left" /> left
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="top" /> top
  </label>
  <label>
    <input type="radio" name="rotate-cube-side" value="bottom" /> bottom
  </label>
</p>

</template>
  
<script>
import CubeFace from './CubeFace.vue';

export default {
name: 'VueCube',
mounted() {
    var cube = document.querySelector('.cube');
    var radioGroup = document.querySelector('.radio-group');
    var currentClass = '';

    function changeSide() {
    var checkedRadio = radioGroup.querySelector(':checked');
    var showClass = 'show-' + checkedRadio.value;
    if ( currentClass ) {
        cube.classList.remove( currentClass );
    }
    cube.classList.add( showClass );
    currentClass = showClass;
    }
    // set initial side
    changeSide();

    radioGroup.addEventListener( 'change', changeSide );
        console.log(`the component is now mounted.`)
},
components: {
    CubeFace
},
data() {
    return {
        red: 'red',
        blue: 'blue',
        green: 'green',
        orange: 'orange',
        yellow: 'yellow',
        black: 'black',
        white: 'white'
    }
}
}
</script>

<style scoped>

* { box-sizing: border-box; }

body { font-family: sans-serif; }

.scene {
  width: 200px;
  height: 200px;
  border: 1px solid #CCC;
  margin: 80px;
  perspective: 400px;
}

.cube {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  transition: transform 1s;
}

.cube.show-front  { transform: translateZ(-100px) rotateY(   0deg); }
.cube.show-right  { transform: translateZ(-100px) rotateY( -90deg); }
.cube.show-back   { transform: translateZ(-100px) rotateY(-180deg); }
.cube.show-left   { transform: translateZ(-100px) rotateY(  90deg); }
.cube.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
.cube.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }

.cube__face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid black;
  line-height: 200px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.cube__face--front  { transform: rotateY(  0deg) translateZ(100px); }
.cube__face--right  { transform: rotateY( 90deg) translateZ(100px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(100px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }
.cube__face--top    { transform: rotateX( 90deg) translateZ(100px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }

label { margin-right: 10px; }

</style>
  