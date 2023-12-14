<template>
  <div class="cube-simulator">
  <div style="user-select: none;" class="scene">
  <div style="user-select: none;" ref="cube" class="cube">
    <div class="cube__face cube__face--front">
        <CubeFace2x2 
        @start-swipe="(corner) => startSwipe('front', corner)" 
        @end-swipe="(corner) => endSwipe('front', corner)"
        :face="cube.front"
        />
    </div>
    <div class="cube__face cube__face--back">
        <CubeFace2x2 
        @start-swipe="(corner) => startSwipe('back', corner)"
        @end-swipe="(corner) => endSwipe('back', corner)" 
        :face="cube.back"
        />
    </div>
    <div class="cube__face cube__face--right">
        <CubeFace2x2
        @start-swipe="(corner) => startSwipe('right', corner)" 
        @end-swipe="(corner) => endSwipe('right', corner)"  
        :face="cube.right"/>
    </div>
    <div class="cube__face cube__face--left">
        <CubeFace2x2
        @start-swipe="(corner) => startSwipe('left', corner)" 
        @end-swipe="(corner) => endSwipe('left', corner)"  
        :face="cube.left"
        />
    </div>
    <div class="cube__face cube__face--top">
        <CubeFace2x2 
        @start-swipe="(corner) => startSwipe('top', corner)" 
        @end-swipe="(corner) => endSwipe('top', corner)" 
        :face="cube.top"
        />
    </div>
    <div class="cube__face cube__face--bottom">
        <CubeFace2x2 
        @start-swipe="(corner) => startSwipe('bottom', corner)" 
        @end-swipe="(corner) => endSwipe('bottom', corner)" 
        :face="cube.bottom"
        />
    </div>
  </div>
</div>
<div class="loader-wrapper">
  <div v-if="loading" class="throbber-loader"></div>
</div>
<div class="slider-wrapper">
  <label>x:</label><input class="slider" v-model="x" type="range" min="-360" max="360">   
</div>
<div class="slider-wrapper-vertical">
  <label>y:</label><input class="slider vertical" v-model="y" orient="vertical" type="range" min="-360" max="360">
</div>
<div class="slider-wrapper">
  <label>z:</label><input class="slider" v-model="z" type="range" min="-360" max="360">
</div>
<button class="wide-button" @click="solve">Solve</button>
<div>
  <button class="button" @click="scramble">Scramble</button>
  <button class="button" @click="reset">Reset</button>
</div>
<div>
  <button :disabled="!history.length" class="button" @click="undo">Undo</button>
  <button :disabled="!undoHistory.length" class="button" @click="redo">Redo</button>
</div>
</div>
</template>
  
<script>
import CubeFace2x2 from './CubeFace2x2.vue';

export default {
name: 'VueCube',
mounted() {
    this.showFront();
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
        history: [],
        undoHistory: [],
        start: {
          face: null,
          corner: null
        },
        end: {
          face: null,
          corner: null
        },
        red: 'red',
        blue: 'blue',
        green: 'green',
        orange: 'orange',
        yellow: 'yellow',
        black: 'black',
        white: 'white',
        loading: false,
        x: 0,
        y: 0,
        z: 0
    }
},
watch: {
  x(newX, oldX) {
    if (newX !== oldX) {
      this.rotateCube(newX, this.y, this.z);
    }
  },
  y(newY, oldY) {
    if (newY !== oldY)
      this.rotateCube(this.x, newY, this.z);
  },
  z(newZ, oldZ) {
    if (newZ !== oldZ) {
      this.rotateCube(this.x, this.y, newZ);
    }
  },
},
methods: {
  // TODO: Extract cube methods into separate JS file for modularity and reusability
  rotateCube(newX, newY, newZ) { 
    this.x = newX;
    this.y = newY;
    this.z = newZ;
    let rotateParam = '';
    rotateParam += ' rotate' + 'Y' + '(' + newX + 'deg)';
    rotateParam += ' rotate' + 'X' + '(' + newY + 'deg)';
    rotateParam += ' rotate' + 'Z' + '(' + newZ + 'deg)';
    this.$refs.cube.style.transform = rotateParam;
  },
  startSwipe(face, corner) {
    console.log("starting: " + corner);
    this.start.face = face;
    this.start.corner = corner;
  },
  endSwipe(face, corner) {
    console.log("ending: " + corner);
    this.end.face = face;
    this.end.corner = corner;

    if ( this.start.face !== 'top' && this.start.face !== 'bottom') {
      this.handleUandD();
    }
    
    if (this.start.face === 'front') {
      this.handleFront();
    }
    if (this.start.face === 'back') {
      this.handleBack();
    }
    if (this.start.face === 'left') {
      this.handleLeft();
    }
    if (this.start.face === 'right') {
      this.handleRight();
    }
    if (this.start.face === 'top') {
      this.handleTop();
    }
    if (this.start.face === 'bottom') {
      this.handleBottom();
    }

    this.start.face = 'front';
    this.start.corner = 0;
  },
  handleUandD() {
    if (this.start.corner == 0 && this.end.corner == 1) {
        this.uPrime();
      } else if (this.start.corner === 1 && this.end.corner === 0) {
        this.u();
      } else if (this.start.corner === 3 && this.end.corner === 2) {
        this.d();
      } else if (this.start.corner === 2 && this.end.corner === 3) {
        this.dPrime();
      }
  },
  handleFront() {
    if (this.start.corner === 1 && this.end.corner === 2) {
        this.rPrime();
      } else if (this.start.corner === 2 && this.end.corner === 1) {
        this.r();
      } else if (this.start.corner === 0 && this.end.corner === 3) {
        this.l();
      } else if (this.start.corner === 3 && this.end.corner === 0) {
        this.lPrime();
      }
  },
  handleBack() {
    if (this.start.corner === 1 && this.end.corner === 2) {
      this.lPrime();
    } else if (this.start.corner === 2 && this.end.corner === 1) {
      this.l();
    } else if (this.start.corner === 0 && this.end.corner === 3) {
      this.r();
    } else if (this.start.corner === 3 && this.end.corner === 0) {
      this.rPrime();
    }
  },
  handleLeft() {
    if (this.start.corner === 1 && this.end.corner === 2) {
      this.fPrime();
    } else if (this.start.corner === 2 && this.end.corner === 1) {
      this.f();
    } else if (this.start.corner === 0 && this.end.corner === 3) {
      this.b();
    } else if (this.start.corner === 3 && this.end.corner === 0) {
      this.bPrime();
    }
  },
  handleRight() {
    if (this.start.corner === 1 && this.end.corner === 2) {
      this.bPrime();
    } else if (this.start.corner === 2 && this.end.corner === 1) {
      this.b();
    } else if (this.start.corner === 0 && this.end.corner === 3) {
      this.f();
    } else if (this.start.corner === 3 && this.end.corner === 0) {
      this.fPrime();
    }
  },
  handleTop() {
    if (this.start.corner === 1 && this.end.corner === 2) {
      this.rPrime();
    } else if (this.start.corner === 2 && this.end.corner === 1) {
      this.r();
    } else if (this.start.corner === 0 && this.end.corner === 3) {
      this.l();
    } else if (this.start.corner === 3 && this.end.corner === 0) {
      this.lPrime();
    } else if (this.start.corner === 0 && this.end.corner === 1) {
      this.bPrime();
    } else if (this.start.corner === 1 && this.end.corner === 0) {
      this.b();
    } else if (this.start.corner === 3 && this.end.corner === 2) {
      this.f();
    } else if (this.start.corner === 2 && this.end.corner === 3) {
      this.fPrime();
    }
  },
  handleBottom() {
    if (this.start.corner === 1 && this.end.corner === 2) {
      this.rPrime();
    } else if (this.start.corner === 2 && this.end.corner === 1) {
      this.r();
    } else if (this.start.corner === 0 && this.end.corner === 3) {
      this.l();
    } else if (this.start.corner === 3 && this.end.corner === 0) {
      this.lPrime();
    } else if (this.start.corner === 0 && this.end.corner === 1) {
      this.fPrime();
    } else if (this.start.corner === 1 && this.end.corner === 0) {
      this.f();
    } else if (this.start.corner === 3 && this.end.corner === 2) {
      this.b();
    } else if (this.start.corner === 2 && this.end.corner === 3) {
      this.bPrime();
    }
  },
  showFront() {
    this.rotateCube(-20, -20, 0)
  },
    reset() {
      this.cube = {
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        };
      this.history = []
      this.undoHistory = []
    },
    async solve() {
      let worker = new Worker("solver.js");
      console.log("Starting up the worker...")
      worker.postMessage(this.getCubeCopy());
      this.loading = true;
      worker.onmessage = (e) => {
        console.log("Response from solver worker: " + e.data);
        this.loading = false;
        if (e.data !== null) {
          this.doMoves(e.data);
        } else {
          alert("No solution found!")
        }
        worker.terminate();
      }
    },
    async doMoves(moveString) {
      for (let i = 0; i < moveString.length; i++) {
        await new Promise(r => setTimeout(r, 500));
        this.makeMove(moveString.charAt(i));
      }
    },
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
    save() {
      this.history.push(this.getCubeCopy());
    },
    undo() {
      this.undoHistory.push(this.getCubeCopy());
      this.cube = this.history.pop();
    },
    redo() {
      this.history.push(this.getCubeCopy());
      this.cube = this.undoHistory.pop();
    },
    u() {
        this.save();

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
    uPrime() {
      this.save();
      
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
    r() {
        this.save();

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
      rPrime() {
      this.save();

      let cubeCopy = this.getCubeCopy();

      cubeCopy.front[1] = this.cube.top[1];
      cubeCopy.front[2] = this.cube.top[2];
      cubeCopy.back[0] = this.cube.bottom[2];
      cubeCopy.back[3] = this.cube.bottom[1];
      cubeCopy.bottom[1] = this.cube.front[1];
      cubeCopy.bottom[2] = this.cube.front[2];
      cubeCopy.top[1] = this.cube.back[3];
      cubeCopy.top[2] = this.cube.back[0];

      cubeCopy.right = this.counterclockwise(cubeCopy.right);
      
      this.cube = cubeCopy;
    },
    f() {
      this.save();

      let cubeCopy = this.getCubeCopy();

      cubeCopy.bottom[0] = this.cube.right[3];
      cubeCopy.bottom[1] = this.cube.right[0];
      cubeCopy.top[2] = this.cube.left[1];
      cubeCopy.top[3] = this.cube.left[2];
      cubeCopy.left[1] = this.cube.bottom[0];
      cubeCopy.left[2] = this.cube.bottom[1];
      cubeCopy.right[0] = this.cube.top[3];
      cubeCopy.right[3] = this.cube.top[2];

      cubeCopy.front = this.clockwise(this.cube.front);

      this.cube = cubeCopy;
  },
  fPrime() {
    this.save();

    let cubeCopy = this.getCubeCopy();

    cubeCopy.bottom[0] = this.cube.left[1];
    cubeCopy.bottom[1] = this.cube.left[2];
    cubeCopy.top[2] = this.cube.right[3];
    cubeCopy.top[3] = this.cube.right[0];
    cubeCopy.left[1] = this.cube.top[2];
    cubeCopy.left[2] = this.cube.top[3];
    cubeCopy.right[0] = this.cube.bottom[1];
    cubeCopy.right[3] = this.cube.bottom[0];

    cubeCopy.front = this.counterclockwise(this.cube.front);

    this.cube = cubeCopy;
  },
  l() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.front[0] = this.cube.top[0];
    cubeCopy.front[3] = this.cube.top[3];
    cubeCopy.back[1] = this.cube.bottom[3];
    cubeCopy.back[2] = this.cube.bottom[0];
    cubeCopy.bottom[0] = this.cube.front[0];
    cubeCopy.bottom[3] = this.cube.front[3];
    cubeCopy.top[0] = this.cube.back[2];
    cubeCopy.top[3] = this.cube.back[1];
    
    cubeCopy.left = this.clockwise(this.cube.left);

    this.cube = cubeCopy;
  },
  lPrime() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.front[0] = this.cube.bottom[0];
    cubeCopy.front[3] = this.cube.bottom[3];
    cubeCopy.back[1] = this.cube.top[3];
    cubeCopy.back[2] = this.cube.top[0];
    cubeCopy.bottom[0] = this.cube.back[2];
    cubeCopy.bottom[3] = this.cube.back[1];
    cubeCopy.top[0] = this.cube.front[0];
    cubeCopy.top[3] = this.cube.front[3];

    cubeCopy.left = this.counterclockwise(this.cube.left);

    this.cube = cubeCopy;
  },
  b() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.bottom[2] = this.cube.left[3];
    cubeCopy.bottom[3] = this.cube.left[0];
    cubeCopy.top[0] = this.cube.right[1];
    cubeCopy.top[1] = this.cube.right[2];
    cubeCopy.left[0] = this.cube.top[1];
    cubeCopy.left[3] = this.cube.top[0];
    cubeCopy.right[1] = this.cube.bottom[2];
    cubeCopy.right[2] = this.cube.bottom[3];

    cubeCopy.back = this.clockwise(this.cube.back);

    this.cube = cubeCopy;
  },
  bPrime() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.bottom[2] = this.cube.right[1];
    cubeCopy.bottom[3] = this.cube.right[2];
    cubeCopy.top[0] = this.cube.left[3];
    cubeCopy.top[1] = this.cube.left[0];
    cubeCopy.left[0] = this.cube.bottom[3];
    cubeCopy.left[3] = this.cube.bottom[2];
    cubeCopy.right[1] = this.cube.top[0];
    cubeCopy.right[2] = this.cube.top[1];

    cubeCopy.back = this.counterclockwise(this.cube.back);

    this.cube = cubeCopy;
  },
  d() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.front[2] = this.cube.left[2];
    cubeCopy.front[3] = this.cube.left[3];
    cubeCopy.back[2] = this.cube.right[2];
    cubeCopy.back[3] = this.cube.right[3];
    cubeCopy.left[2] = this.cube.back[2];
    cubeCopy.left[3] = this.cube.back[3];
    cubeCopy.right[2] = this.cube.front[2];
    cubeCopy.right[3] = this.cube.front[3];

    cubeCopy.bottom = this.clockwise(this.cube.bottom);

    this.cube = cubeCopy;
  },
  dPrime() {
    this.save();
    let cubeCopy = this.getCubeCopy();

    cubeCopy.front[2] = this.cube.right[2];
    cubeCopy.front[3] = this.cube.right[3];
    cubeCopy.back[2] = this.cube.left[2];
    cubeCopy.back[3] = this.cube.left[3];
    cubeCopy.left[2] = this.cube.front[2];
    cubeCopy.left[3] = this.cube.front[3];
    cubeCopy.right[2] = this.cube.back[2];
    cubeCopy.right[3] = this.cube.back[3];

    cubeCopy.bottom = this.counterclockwise(this.cube.bottom);

    this.cube = cubeCopy;
  },
  makeMove(symbol) {
    switch (symbol) {
      case 'u':
        return this.u();
      case 'U':
       return this.uPrime();
      case 'd':
        return this.d();
      case 'D':
        return this.dPrime();
      case 'l':
        return this.l();
      case 'L':
        return this.lPrime();
      case 'r':
        return this.r();
      case 'R':
        return this.rPrime();
      case 'f':
       return this.f();
      case 'F':
       return this.fPrime();
      case 'b':
       return this.b();
      case 'B':
      return this.bPrime();
    }
  },
  scramble() {
    let symbols = ['u','U','d','D','l','L','r','R','f','F','b','B'];
    let previousMove = ""
    let max = Math.floor(Math.random() * 2) + 2
    for (let i = 0; i < max; i++) {
      let currentMove = symbols[Math.floor(Math.random() * symbols.length)]
      if (currentMove !== this.oppositeMove(previousMove)) {
        this.makeMove(currentMove);
      }
      previousMove = currentMove;
    }
  },
  oppositeMove(move) {
    switch (move) {
        case 'u':
            return 'U'
        case 'U':
            return 'u'
        case 'd':
            return 'D'
        case 'D':
            return 'd'
        case 'l':
            return 'L'
        case 'L':
            return 'l'
        case 'r':
            return 'R'
        case 'R':
            return 'r'
        case 'f':
            return 'F'
        case 'F':
            return 'f'
        case 'b':
            return 'B'
        case 'B':
            return 'b'
    }
  }
}
}
</script>

<style scoped>

.cube-simulator {
  width: 100vw;
  height: 100vh;
}

.button {
  width: 7rem;
}

.wide-button {
  width: 14rem;
}

label {
  font-size: 0.75rem;
}

.slider-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-wrapper {
  height: 2rem;
}

.slider-wrapper-vertical {
  position: absolute;
  right: 1rem;
  top: 2rem;
}

.slider {
  width: 90vw;
  height: 3rem;
}

.vertical {
  appearance: slider-vertical;
  width: 1rem;
  height: 50vh;
  display: flex;
}

* { box-sizing: border-box; }

body { font-family: sans-serif; }

.scene {
  width: 100vw;
  height: 60vh;
  perspective: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube {
  width: 15rem;
  height: 15rem;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  transition: transform 1s;
  padding-left: 1.5rem;
}
.cube:hover {
  cursor: pointer;
}
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
  background-color: black;
  user-select: none;
}

.cube__face--front  { transform: rotateY(  0deg) translateZ(100px); }
.cube__face--right  { transform: rotateY( 90deg) translateZ(100px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(100px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }
.cube__face--top    { transform: rotateX( 90deg) translateZ(100px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }

label { margin-right: 10px; }

.loader-wrapper {
  height: 2rem;
}

@media only screen 
and (min-width : 1224px) {
  .slider {
    width: 50vw;
  }
  .vertical {
    width: 1rem;
  }
}

/* Copyright (c) 2013 John W. Long and Julia Elman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
@-moz-keyframes throbber-loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  @-webkit-keyframes throbber-loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  @keyframes throbber-loader {
    0% {
      background: #dde2e7;
    }
    10% {
      background: #6b9dc8;
    }
    40% {
      background: #dde2e7;
    }
  }
  /* :not(:required) hides these rules from IE9 and below */
  .throbber-loader:not(:required) {
    -moz-animation: throbber-loader 2000ms 300ms infinite ease-out;
    -webkit-animation: throbber-loader 2000ms 300ms infinite ease-out;
    animation: throbber-loader 2000ms 300ms infinite ease-out;
    background: #dde2e7;
    display: inline-block;
    position: relative;
    text-indent: -9999px;
    width: 0.9em;
    height: 1.5em;
    margin: 0 1.6em;
  }
  .throbber-loader:not(:required):before, .throbber-loader:not(:required):after {
    background: #dde2e7;
    content: '\x200B';
    display: inline-block;
    width: 0.9em;
    height: 1.5em;
    position: absolute;
    top: 0;
  }
  .throbber-loader:not(:required):before {
    -moz-animation: throbber-loader 2000ms 150ms infinite ease-out;
    -webkit-animation: throbber-loader 2000ms 150ms infinite ease-out;
    animation: throbber-loader 2000ms 150ms infinite ease-out;
    left: -1.6em;
  }
  .throbber-loader:not(:required):after {
    -moz-animation: throbber-loader 2000ms 450ms infinite ease-out;
    -webkit-animation: throbber-loader 2000ms 450ms infinite ease-out;
    animation: throbber-loader 2000ms 450ms infinite ease-out;
    right: -1.6em;
  }

</style>
  