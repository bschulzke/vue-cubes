<template>
<div class="scene">
  <div class="cube">
    <div class="cube__face cube__face--front">
        <CubeFace2x2 :face="cube.front"/>
    </div>
    <div class="cube__face cube__face--back">
        <CubeFace2x2 :face="cube.back"/>
    </div>
    <div class="cube__face cube__face--right">
        <CubeFace2x2 :face="cube.right"/>
    </div>
    <div class="cube__face cube__face--left">
        <CubeFace2x2 :face="cube.left"/>
    </div>
    <div class="cube__face cube__face--top">
        <CubeFace2x2 :face="cube.top"/>
    </div>
    <div class="cube__face cube__face--bottom">
        <CubeFace2x2 :face="cube.bottom"/>
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
<div>
    <button @click="u">U</button>
    <button @click="r">R</button>
</div>
<div>
    <button @click="uPrime">U'</button>
    <button @click="rPrime">R'</button>
</div>
</template>
  
<script>
import CubeFace2x2 from './CubeFace2x2.vue';

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
    CubeFace2x2
},
data() {
    return {
        cube: {
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        },
        red: 'red',
        blue: 'blue',
        green: 'green',
        orange: 'orange',
        yellow: 'yellow',
        black: 'black',
        white: 'white'
    }
},
methods: {
    getCubeCopy() {
        return JSON.parse(JSON.stringify(this.cube));
    },
    clockwise(face) {
        let faceCopy = JSON.parse(JSON.stringify(face));
        faceCopy[0] = face[3];
        faceCopy[1] = face[0];
        faceCopy[2] = face[1];
        faceCopy[3] = face[2];
        return faceCopy;
    },
    counterclockwise(face) {
        let faceCopy = JSON.parse(JSON.stringify(face));
        faceCopy[0] = face[1];
        faceCopy[1] = face[2];
        faceCopy[2] = face[3];
        faceCopy[3] = face[0];
        return faceCopy;
    },
    u() {
        let cubeCopy = this.getCubeCopy();

        cubeCopy.front[0] = this.cube.right[0];
        cubeCopy.front[1] = this.cube.right[1];
        cubeCopy.back[0] = this.cube.left[0];
        cubeCopy.back[1] = this.cube.left[1];
        cubeCopy.left[0] = this.cube.front[0];
        cubeCopy.left[1] = this.cube.front[1];
        cubeCopy.right[0] = this.cube.back[0];
        cubeCopy.right[1] = this.cube.back[1];

        cubeCopy.top = this.clockwise(cubeCopy.top);

        this.cube = cubeCopy;
    },
    r() {
        let cubeCopy = this.getCubeCopy();

        cubeCopy.front[1] = this.cube.bottom[1];
        cubeCopy.front[2] = this.cube.bottom[2];
        cubeCopy.back[0] = this.cube.top[2];
        cubeCopy.back[3] = this.cube.top[1];
        cubeCopy.top[1] = this.cube.front[1];
        cubeCopy.top[2] = this.cube.front[2];
        cubeCopy.bottom[1] = this.cube.back[3];
        cubeCopy.bottom[2] = this.cube.back[0];

        cubeCopy.right = this.clockwise(cubeCopy.right);

        this.cube = cubeCopy;
    },
    uPrime() {
        let cubeCopy = this.getCubeCopy();

        cubeCopy.front[0] = this.cube.left[0];
        cubeCopy.front[1] = this.cube.left[1];
        cubeCopy.back[0] = this.cube.right[0];
        cubeCopy.back[1] = this.cube.right[1];
        cubeCopy.left[0] = this.cube.back[0];
        cubeCopy.left[1] = this.cube.back[1];
        cubeCopy.right[0] = this.cube.front[0];
        cubeCopy.right[1] = this.cube.front[1];

        cubeCopy.top = this.counterclockwise(cubeCopy.top);

        this.cube = cubeCopy;
    },
    rPrime() {
      let cubeCopy = this.getCubeCopy();

      cubeCopy.front[1] = this.cube.top[1];
      cubeCopy.front[2] = this.cube.top[2];
      cubeCopy.back[0] = this.cube.bottom[2];
      cubeCopy.back[3] = this.cube.bottom[1];
      cubeCopy.top[1] = this.cube.back[3];
      cubeCopy.top[2] = this.cube.back[0];
      cubeCopy.bottom[1] = this.cube.front[1];
      cubeCopy.bottom[2] = this.cube.front[2];

      cubeCopy.right = this.counterclockwise(cubeCopy.right);
      
      this.cube = cubeCopy;
    }
}
}
</script>

<style scoped>

button {
    min-width: 3rem;
}

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
  