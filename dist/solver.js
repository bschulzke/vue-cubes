// TODO: Extract cube functions into separate JavaScript file for reusability and modularity.

onmessage = (e) => {
    startWorker(e);
}

async function startWorker(e) {
    await new Promise(r => setTimeout(r, 500));
    console.log("Received message from main script");
    let cube = e.data;

    let solutionPath = solveCube(cube);

    postMessage(solutionPath);
}
  
  function solveCube(cube) {
    const isSolved = (cube) => { 
        let solved = true;
        solved = faceIsSolved(cube.front) 
        && faceIsSolved(cube.back) 
        && faceIsSolved(cube.left) 
        && faceIsSolved(cube.right) 
        && faceIsSolved(cube.top) 
        && faceIsSolved(cube.bottom);
        return solved;
    }
    const faceIsSolved = (face) => {
        let solved = true;
        let lastEdge = face[0];
        for (edge of face) {
            if (lastEdge !== edge) {
                solved = false;
            }
        }
        return solved;
    }
    const evaluate = (cube) => { 
        return evaluateFace(cube.front) 
        + evaluateFace(cube.back) 
        + evaluateFace(cube.top) 
        + evaluateFace(cube.bottom) 
        + evaluateFace(cube.left)
        + evaluateFace(cube.right);
    }

    const evaluateFace = (face) => {
        let count = 0;
        let foundTiles = [];
        for (tile of face) {
            face.forEach((v) => (v === tile && count++));
            foundTiles.push(tile);
       }
       return count;
    }

    const shiftBest = (queue) => {
        // let bestNode = queue.at(queue.length - 1)
        // let bestValue = evaluate(bestNode.cube)
        // let index = queue.length - 1
        // for (let i = 0; i < queue.length; i++) {
        //     let currVal = evaluate(queue.at(i).cube)
        //     if (currVal > bestValue) {
        //         bestNode = queue.at(i)
        //         bestValue = evaluate(bestNode.cube)
        //         index = i
        //     }
        // }
        // queue.splice(index, 1)
        // return bestNode
        return queue.shift()
    }
    
    const queueForward = [{cube: cube, path: ""}];
    const queueBackward = getBackwardStarts(); // Starting from the solved state

    // Initialize visited sets for forward and backward BFS
    const visitedForward = new Set();
    const visitedBackward = new Set();
    const forwardPathMap = [];
    const backwardPathMap = [];

    console.log("Beginning bidirectional search...")
    let max_iterations = 250
    let currentBackward = null;
    while (queueForward.length > 0 && queueBackward.length > 0 && max_iterations > 0) {

        // Forward BFS
        const currentForward = shiftBest(queueForward);
        
        visitedForward.add(JSON.stringify(currentForward.cube));
        forwardPathMap.push(currentForward);
        
        const neighborsForward = generateNeighbors(currentForward);

        for (list of queueBackward) {
            for (backNode of list) {
                for (forwardNode of queueForward) {
                    if (JSON.stringify(backNode.cube) == JSON.stringify(forwardNode.cube)) {
                        return forwardNode.path + backNode.path.split("").reverse().join("") 
                    }
                }
            }
        }
        
        for (const neighbor of neighborsForward) {
            if (!visitedForward.has(JSON.stringify(neighbor))) {
                queueForward.push(neighbor);
            }
        }
        
        // Backward BFS
        for (let i = 0; i < queueBackward.length; i++) {
            currentBackward = shiftBest(queueBackward.at(i));
            visitedBackward.add(JSON.stringify(currentBackward.cube));
            backwardPathMap.push(currentBackward);
        
            const neighborsBackward = generateNeighborsBackward(currentBackward);
            for (const neighbor of neighborsBackward) {
                if (!visitedBackward.has(JSON.stringify(neighbor))) {
                    queueBackward.at(i).push(neighbor);
                }
            }

            for (let n1 of forwardPathMap) {
                for (let n2 of backwardPathMap) {
                    if (JSON.stringify(n1.cube) == JSON.stringify(n2.cube)) {
                        return n1.path + n2.path.split("").reverse().join("") 
                    }
                }
            }
        }
        
        max_iterations--
    }

    return null; // No solution found
  
  }

  const getMoves = () => { return ['u','r','l']; }

  // Helper function to generate neighbors for forward BFS
function generateNeighbors(node) {
    const neighbors = [];
    for (const move of getMoves()) {
        const newCube = makeMove(node.cube, move);
        neighbors.push({cube: newCube, path: node.path + move});
    }
    return neighbors;
}

function cubesAreEquivalent(a, b) {
    return JSON.stringify(a.front) === JSON.stringify(b.front)
        && JSON.stringify(a.back) === JSON.stringify(b.back)
        && JSON.stringify(a.left) === JSON.stringify(b.left)
        && JSON.stringify(a.right) === JSON.stringify(a.right)
}

// Helper function to generate neighbors for backward BFS
function generateNeighborsBackward(node) {
    const neighbors = [];
    for (const move of getMoves()) {
        const newCube = makeMoveBackward(node.cube, move);
        neighbors.push({cube: newCube, path: node.path + move});
    }
    return neighbors;
}

// Helper function to make a move in backward direction
function makeMoveBackward(cube, move) {
    // Implement the reverse of each move logic here
    // Example: For 'u', use 'U' logic in reverse
    switch (move) {
        case 'u':
            return makeMove(cube, 'U')
        case 'U':
            return makeMove(cube, 'u')
        case 'd':
            return makeMove(cube, 'D')
        case 'D':
            return makeMove(cube, 'd')
        case 'l':
            return makeMove(cube, 'L')
        case 'L':
            return makeMove(cube, 'l')
        case 'r':
            return makeMove(cube, 'R')
        case 'R':
            return makeMove(cube, 'r')
        case 'f':
            return makeMove(cube, 'F')
        case 'F':
            return makeMove(cube, 'f')
        case 'b':
            return makeMove(cube, 'B')
        case 'B':
            return makeMove(cube, 'b')
        
    }
}

function getBackwardStarts() {
    return [
        [{cube: redYellow(), path: ""}],
        [{cube: redWhite(), path: ""}],
        [{cube: redGreen(), path: ""}],
        [{cube: redBlue(), path: ""}],

        [{cube: orangeYellow(), path: ""}],
        [{cube: orangeWhite(), path: ""}],
        [{cube: orangeBlue(), path: ""}],
        [{cube: orangeGreen(), path: ""}],

        [{cube: whiteRed(), path: ""}],
        [{cube: whiteOrange(), path: ""}],
        [{cube: whiteGreen(), path: ""}],
        [{cube: whiteBlue(), path: ""}],

        [{cube: blueYellow(), path: ""}],
        [{cube: blueWhite(), path: ""}],
        [{cube: blueRed(), path: ""}],
        [{cube: blueOrange(), path: ""}],

        [{cube: greenYellow(), path: ""}],
        [{cube: greenWhite(), path: ""}],
        [{cube: greenRed(), path: ""}],
        [{cube: greenOrange(), path: ""}],

        [{cube: yellowRed(), path: ""}],
        [{cube: yellowOrange(), path: ""}],
        [{cube: yellowGreen(), path: ""}],
        [{cube: yellowBlue(), path: ""}],
    ]
}

function redWhite() {
    return {
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['blue', 'blue', 'blue', 'blue'],
        left: ['green', 'green', 'green', 'green'],
        top: ['white', 'white', 'white', 'white'],
        bottom: ['yellow', 'yellow', 'yellow', 'yellow']
    }
}

function redYellow() {
    return {
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    }
}

function redGreen() {
    return {
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['white', 'white', 'white', 'white'],
        left: ['yellow', 'yellow', 'yellow', 'yellow'],
        top: ['green', 'green', 'green', 'green'],
        bottom: ['blue', 'blue', 'blue', 'blue']
    }
}

function redBlue() {
    return {
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['yellow', 'yellow', 'yellow', 'yellow'],
        left: ['white', 'white', 'white', 'white'],
        top: ['blue', 'blue', 'blue', 'blue'],
        bottom: ['green', 'green', 'green', 'green']
    }
}

function orangeWhite() {
    return {
        front: ['orange', 'orange', 'orange', 'orange'],
        back: ['red', 'red', 'red', 'red'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['white', 'white', 'white', 'white'],
        bottom: ['yellow', 'yellow', 'yellow', 'yellow']
    }
}

function orangeYellow() {
    return {
        front: ['orange', 'orange', 'orange', 'orange'],
        back: ['red', 'red', 'red', 'red'],
        right: ['blue', 'blue', 'blue', 'blue'],
        left: ['green', 'green', 'green', 'green'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    }
}

function orangeBlue() {
    return {
        front: ['orange', 'orange', 'orange', 'orange'],
        back: ['red', 'red', 'red', 'red'],
        right: ['white', 'white', 'white', 'white'],
        left: ['yellow', 'yellow', 'yellow', 'yellow'],
        top: ['blue', 'blue', 'blue', 'blue'],
        bottom: ['green', 'green', 'green', 'green']
    }
}

function orangeGreen() {
    return {
        front: ['orange', 'orange', 'orange', 'orange'],
        back: ['red', 'red', 'red', 'red'],
        right: ['yellow', 'yellow', 'yellow', 'yellow'],
        left: ['white', 'white', 'white', 'white'],
        top: ['green', 'green', 'green', 'green'],
        bottom: ['blue', 'blue', 'blue', 'blue']
    }
}

function greenYellow() {
    return {
        front: ['green', 'green', 'green', 'green'],
        back: ['blue', 'blue', 'blue', 'blue'],
        right: ['orange', 'orange', 'orange', 'orange'],
        left: ['red', 'red', 'red', 'red'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    }
}

function greenWhite() {
    return {
        front: ['green', 'green', 'green', 'green'],
        back: ['blue', 'blue', 'blue', 'blue'],
        right: ['red', 'red', 'red', 'red'],
        left: ['orange', 'orange', 'orange', 'orange'],
        top: ['white', 'white', 'white', 'white'],
        bottom: ['yellow', 'yellow', 'yellow', 'yellow']
    }
}

function greenRed() {
    return {
        front: ['green', 'green', 'green', 'green'],
        back: ['blue', 'blue', 'blue', 'blue'],
        right: ['yellow', 'yellow', 'yellow', 'yellow'],
        left: ['white', 'white', 'white', 'white'],
        top: ['red', 'red', 'red', 'red'],
        bottom: ['orange', 'orange', 'orange', 'orange']
    }
}

function greenOrange() {
    return {
        front: ['green', 'green', 'green', 'green'],
        back: ['blue', 'blue', 'blue', 'blue'],
        right: ['white', 'white', 'white', 'white'],
        left: ['yellow', 'yellow', 'yellow', 'yellow'],
        top: ['orange', 'orange', 'orange', 'orange'],
        bottom: ['red', 'red', 'red', 'red']
    }
}

function whiteRed() {
    return {
        front: ['white', 'white', 'white', 'white'],
        back: ['yellow', 'yellow', 'yellow', 'yellow'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['red', 'red', 'red', 'red'],
        bottom: ['orange', 'orange', 'orange', 'orange']
    }
}

function whiteOrange() {
    return {
        front: ['white', 'white', 'white', 'white'],
        back: ['yellow', 'yellow', 'yellow', 'yellow'],
        right: ['blue', 'blue', 'blue', 'blue'],
        left: ['green', 'green', 'green', 'green'],
        top: ['orange', 'orange', 'orange', 'orange'],
        bottom: ['red', 'red', 'red', 'red']
    }
}

function whiteGreen() {
    return {
        front: ['white', 'white', 'white', 'white'],
        back: ['yellow', 'yellow', 'yellow', 'yellow'],
        right: ['orange', 'orange', 'orange', 'orange'],
        left: ['red', 'red', 'red', 'red'],
        top: ['green', 'green', 'green', 'green'],
        bottom: ['blue', 'blue', 'blue', 'blue']
    }
}


function whiteBlue() {
    return {
        front: ['white', 'white', 'white', 'white'],
        back: ['yellow', 'yellow', 'yellow', 'yellow'],
        right: ['red', 'red', 'red', 'red'],
        left: ['orange', 'orange', 'orange', 'orange'],
        top: ['blue', 'blue', 'blue', 'blue'],
        bottom: ['green', 'green', 'green', 'green']
    }
}

function blueYellow() {
    return {
        front: ['blue', 'blue', 'blue', 'blue'],
        back: ['green', 'green', 'green', 'green'],
        right: ['red', 'red', 'red', 'red'],
        left: ['orange', 'orange', 'orange', 'orange'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    }
}

function blueWhite() {
    return {
        front: ['blue', 'blue', 'blue', 'blue'],
        back: ['green', 'green', 'green', 'green'],
        right: ['orange', 'orange', 'orange', 'orange'],
        left: ['red', 'red', 'red', 'red'],
        top: ['white', 'white', 'white', 'white'],
        bottom: ['yellow', 'yellow', 'yellow', 'yellow']
    }
}

function blueRed() {
    return {
        front: ['blue', 'blue', 'blue', 'blue'],
        back: ['green', 'green', 'green', 'green'],
        right: ['white', 'white', 'white', 'white'],
        left: ['yellow', 'yellow', 'yellow', 'yellow'],
        top: ['red', 'red', 'red', 'red'],
        bottom: ['orange', 'orange', 'orange', 'orange']
    }
}

function blueOrange() {
    return {
        front: ['blue', 'blue', 'blue', 'blue'],
        back: ['green', 'green', 'green', 'green'],
        right: ['yellow', 'yellow', 'yellow', 'yellow'],
        left: ['white', 'white', 'white', 'white'],
        top: ['orange', 'orange', 'orange', 'orange'],
        bottom: ['red', 'red', 'red', 'red']
    }
}

function yellowBlue() {
    return {
        front: ['yellow', 'yellow', 'yellow', 'yellow'],
        back: ['white', 'white', 'white', 'white'],
        right: ['orange', 'orange', 'orange', 'orange'],
        left: ['red', 'red', 'red', 'red'],
        top: ['blue', 'blue', 'blue', 'blue'],
        bottom: ['green', 'green', 'green', 'green']
    }
}

function yellowGreen() {
    return {
        front: ['yellow', 'yellow', 'yellow', 'yellow'],
        back: ['white', 'white', 'white', 'white'],
        right: ['red', 'red', 'red', 'red'],
        left: ['orange', 'orange', 'orange', 'orange'],
        top: ['green', 'green', 'green', 'green'],
        bottom: ['blue', 'blue', 'blue', 'blue']
    }
}

function yellowOrange() {
    return {
        front: ['yellow', 'yellow', 'yellow', 'yellow'],
        back: ['white', 'white', 'white', 'white'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['orange', 'orange', 'orange', 'orange'],
        bottom: ['red', 'red', 'red', 'red']
    }
}

function yellowRed() {
    return {
        front: ['yellow', 'yellow', 'yellow', 'yellow'],
        back: ['white', 'white', 'white', 'white'],
        right: ['blue', 'blue', 'blue', 'blue'],
        left: ['green', 'green', 'green', 'green'],
        top: ['red', 'red', 'red', 'red'],
        bottom: ['orange', 'orange', 'orange', 'orange']
    }
}


  function makeMove(cube, move) {
    // 'b','B'
    switch (move) {
        case 'u':
            return u(cube);
        case 'U':
            return uPrime(cube);
        case 'd':
            return d(cube);
        case 'D':
            return dPrime(cube);
        case 'l':
            return l(cube);
        case 'L':
            return lPrime(cube);
        case 'r':
            return r(cube);
        case 'R':
            return rPrime(cube);
        case 'f':
            return f(cube);
        case 'F':
            return fPrime(cube);
        case 'b':
            return b(cube);
        case 'B':
            return bPrime(cube);
    }

  }

  // TODO: Refactor cube into a JavaScript class which can be defined once and imported by both VueCube and by solver.js

  function u(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[0] = cube.right[0];
    cubeCopy.front[1] = cube.right[1];
    cubeCopy.back[0] = cube.left[0];
    cubeCopy.back[1] = cube.left[1];
    cubeCopy.left[0] = cube.front[0];
    cubeCopy.left[1] = cube.front[1];
    cubeCopy.right[0] = cube.back[0];
    cubeCopy.right[1] = cube.back[1];

    cubeCopy.top = clockwise(cubeCopy.top);

    return cubeCopy;
}
function uPrime(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[0] = cube.left[0];
    cubeCopy.front[1] = cube.left[1];
    cubeCopy.back[0] = cube.right[0];
    cubeCopy.back[1] = cube.right[1];
    cubeCopy.left[0] = cube.back[0];
    cubeCopy.left[1] = cube.back[1];
    cubeCopy.right[0] = cube.front[0];
    cubeCopy.right[1] = cube.front[1];

    cubeCopy.top = counterclockwise(cubeCopy.top);

    return cubeCopy;
}
function r(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[1] = cube.bottom[1];
    cubeCopy.front[2] = cube.bottom[2];

    cubeCopy.back[0] = cube.top[2];
    cubeCopy.back[3] = cube.top[1];

    cubeCopy.top[1] = cube.front[1];
    cubeCopy.top[2] = cube.front[2];
    
    cubeCopy.bottom[1] = cube.back[3];
    cubeCopy.bottom[2] = cube.back[0];

    cubeCopy.right = clockwise(cubeCopy.right);

    return cubeCopy;
}
function rPrime(cube) {

  let cubeCopy = getCubeCopy(cube);

  cubeCopy.front[1] = cube.top[1];
  cubeCopy.front[2] = cube.top[2];
  cubeCopy.back[0] = cube.bottom[2];
  cubeCopy.back[3] = cube.bottom[1];
  cubeCopy.bottom[1] = cube.front[1];
  cubeCopy.bottom[2] = cube.front[2];
  cubeCopy.top[1] = cube.back[3];
  cubeCopy.top[2] = cube.back[0];

  cubeCopy.right = counterclockwise(cubeCopy.right);
  
  return cubeCopy;
}
function f(cube) {

  let cubeCopy = getCubeCopy(cube);

  cubeCopy.bottom[0] = cube.right[3];
  cubeCopy.bottom[1] = cube.right[0];
  cubeCopy.top[2] = cube.left[1];
  cubeCopy.top[3] = cube.left[2];
  cubeCopy.left[1] = cube.bottom[0];
  cubeCopy.left[2] = cube.bottom[1];
  cubeCopy.right[0] = cube.top[3];
  cubeCopy.right[3] = cube.top[2];

  cubeCopy.front = clockwise(cubeCopy.front);

  cube = cubeCopy;
}
function fPrime(cube) {

let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[0] = cube.left[1];
cubeCopy.bottom[1] = cube.left[2];
cubeCopy.top[2] = cube.right[3];
cubeCopy.top[3] = cube.right[0];
cubeCopy.left[1] = cube.top[2];
cubeCopy.left[2] = cube.top[3];
cubeCopy.right[0] = cube.bottom[1];
cubeCopy.right[3] = cube.bottom[0];

cubeCopy.front = counterclockwise(cubeCopy.front);

return cubeCopy;
}
function l(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[0] = cube.top[0];
cubeCopy.front[3] = cube.top[3];
cubeCopy.back[1] = cube.bottom[3];
cubeCopy.back[2] = cube.bottom[0];
cubeCopy.bottom[0] = cube.front[0];
cubeCopy.bottom[3] = cube.front[3];
cubeCopy.top[0] = cube.back[2];
cubeCopy.top[3] = cube.back[1];

cubeCopy.left = clockwise(cubeCopy.left);

return cubeCopy;
}
function lPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[0] = cube.bottom[0];
cubeCopy.front[3] = cube.bottom[3];
cubeCopy.back[1] = cube.top[3];
cubeCopy.back[2] = cube.top[0];
cubeCopy.bottom[0] = cube.back[2];
cubeCopy.bottom[3] = cube.back[1];
cubeCopy.top[0] = cube.front[0];
cubeCopy.top[3] = cube.front[3];

cubeCopy.left = counterclockwise(cube.left);

return cubeCopy;
}
function b(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[2] = cube.left[3];
cubeCopy.bottom[3] = cube.left[0];
cubeCopy.top[0] = cube.right[1];
cubeCopy.top[1] = cube.right[2];
cubeCopy.left[0] = cube.top[1];
cubeCopy.left[3] = cube.top[0];
cubeCopy.right[1] = cube.bottom[2];
cubeCopy.right[2] = cube.bottom[3];

cubeCopy.back = clockwise(cube.back);

return cubeCopy;
}
function bPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[2] = cube.right[1];
cubeCopy.bottom[3] = cube.right[2];
cubeCopy.top[0] = cube.left[3];
cubeCopy.top[1] = cube.left[0];
cubeCopy.left[0] = cube.bottom[3];
cubeCopy.left[3] = cube.bottom[2];
cubeCopy.right[1] = cube.top[0];
cubeCopy.right[2] = cube.top[1];

cubeCopy.back = counterclockwise(cube.back);

return cubeCopy;
}
function d(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[2] = cube.left[2];
cubeCopy.front[3] = cube.left[3];
cubeCopy.back[2] = cube.right[2];
cubeCopy.back[3] = cube.right[3];
cubeCopy.left[2] = cube.back[2];
cubeCopy.left[3] = cube.back[3];
cubeCopy.right[2] = cube.front[2];
cubeCopy.right[3] = cube.front[3];

cubeCopy.bottom = clockwise(cube.bottom);

return cubeCopy;
}
function dPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[2] = cube.right[2];
cubeCopy.front[3] = cube.right[3];
cubeCopy.back[2] = cube.left[2];
cubeCopy.back[3] = cube.left[3];
cubeCopy.left[2] = cube.front[2];
cubeCopy.left[3] = cube.front[3];
cubeCopy.right[2] = cube.back[2];
cubeCopy.right[3] = cube.back[3];

cubeCopy.bottom = counterclockwise(cube.bottom);

return cubeCopy;
}
function u(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[0] = cube.right[0];
    cubeCopy.front[1] = cube.right[1];
    cubeCopy.back[0] = cube.left[0];
    cubeCopy.back[1] = cube.left[1];
    cubeCopy.left[0] = cube.front[0];
    cubeCopy.left[1] = cube.front[1];
    cubeCopy.right[0] = cube.back[0];
    cubeCopy.right[1] = cube.back[1];

    cubeCopy.top = clockwise(cubeCopy.top);

    return cubeCopy;
}
function uPrime(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[0] = cube.left[0];
    cubeCopy.front[1] = cube.left[1];
    cubeCopy.back[0] = cube.right[0];
    cubeCopy.back[1] = cube.right[1];
    cubeCopy.left[0] = cube.back[0];
    cubeCopy.left[1] = cube.back[1];
    cubeCopy.right[0] = cube.front[0];
    cubeCopy.right[1] = cube.front[1];

    cubeCopy.top = counterclockwise(cubeCopy.top);

    return cubeCopy;
}
function r(cube) {

    let cubeCopy = getCubeCopy(cube);

    cubeCopy.front[1] = cube.bottom[1];
    cubeCopy.front[2] = cube.bottom[2];

    cubeCopy.back[0] = cube.top[2];
    cubeCopy.back[3] = cube.top[1];

    cubeCopy.top[1] = cube.front[1];
    cubeCopy.top[2] = cube.front[2];
    
    cubeCopy.bottom[1] = cube.back[3];
    cubeCopy.bottom[2] = cube.back[0];

    cubeCopy.right = clockwise(cubeCopy.right);

    return cubeCopy;
}
function rPrime(cube) {

  let cubeCopy = getCubeCopy(cube);

  cubeCopy.front[1] = cube.top[1];
  cubeCopy.front[2] = cube.top[2];
  cubeCopy.back[0] = cube.bottom[2];
  cubeCopy.back[3] = cube.bottom[1];
  cubeCopy.bottom[1] = cube.front[1];
  cubeCopy.bottom[2] = cube.front[2];
  cubeCopy.top[1] = cube.back[3];
  cubeCopy.top[2] = cube.back[0];

  cubeCopy.right = counterclockwise(cubeCopy.right);
  
  return cubeCopy;
}
function f(cube) {

  let cubeCopy = getCubeCopy(cube);

  cubeCopy.bottom[0] = cube.right[3];
  cubeCopy.bottom[1] = cube.right[0];
  cubeCopy.top[2] = cube.left[1];
  cubeCopy.top[3] = cube.left[2];
  cubeCopy.left[1] = cube.bottom[0];
  cubeCopy.left[2] = cube.bottom[1];
  cubeCopy.right[0] = cube.top[3];
  cubeCopy.right[3] = cube.top[2];

  cubeCopy.front = clockwise(cube.front);

  return cubeCopy;
}
function fPrime(cube) {

let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[0] = cube.left[1];
cubeCopy.bottom[1] = cube.left[2];
cubeCopy.top[2] = cube.right[3];
cubeCopy.top[3] = cube.right[0];
cubeCopy.left[1] = cube.top[2];
cubeCopy.left[2] = cube.top[3];
cubeCopy.right[0] = cube.bottom[1];
cubeCopy.right[3] = cube.bottom[0];

cubeCopy.front = counterclockwise(cube.front);

return cubeCopy;
}
function l(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[0] = cube.top[0];
cubeCopy.front[3] = cube.top[3];
cubeCopy.back[1] = cube.bottom[3];
cubeCopy.back[2] = cube.bottom[0];
cubeCopy.bottom[0] = cube.front[0];
cubeCopy.bottom[3] = cube.front[3];
cubeCopy.top[0] = cube.back[2];
cubeCopy.top[3] = cube.back[1];

cubeCopy.left = clockwise(cube.left);

return cubeCopy;
}
function lPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[0] = cube.bottom[0];
cubeCopy.front[3] = cube.bottom[3];
cubeCopy.back[1] = cube.top[3];
cubeCopy.back[2] = cube.top[0];
cubeCopy.bottom[0] = cube.back[2];
cubeCopy.bottom[3] = cube.back[1];
cubeCopy.top[0] = cube.front[0];
cubeCopy.top[3] = cube.front[3];

cubeCopy.left = counterclockwise(cube.left);

return cubeCopy;
}
function b(cube) {

let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[2] = cube.left[3];
cubeCopy.bottom[3] = cube.left[0];
cubeCopy.top[0] = cube.right[1];
cubeCopy.top[1] = cube.right[2];
cubeCopy.left[0] = cube.top[1];
cubeCopy.left[3] = cube.top[0];
cubeCopy.right[1] = cube.bottom[2];
cubeCopy.right[2] = cube.bottom[3];

cubeCopy.back = clockwise(cube.back);

return cubeCopy;
}
function bPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.bottom[2] = cube.right[1];
cubeCopy.bottom[3] = cube.right[2];
cubeCopy.top[0] = cube.left[3];
cubeCopy.top[1] = cube.left[0];
cubeCopy.left[0] = cube.bottom[3];
cubeCopy.left[3] = cube.bottom[2];
cubeCopy.right[1] = cube.top[0];
cubeCopy.right[2] = cube.top[1];

cubeCopy.back = counterclockwise(cube.back);

return cubeCopy;
}
function d(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[2] = cube.left[2];
cubeCopy.front[3] = cube.left[3];
cubeCopy.back[2] = cube.right[2];
cubeCopy.back[3] = cube.right[3];
cubeCopy.left[2] = cube.back[2];
cubeCopy.left[3] = cube.back[3];
cubeCopy.right[2] = cube.front[2];
cubeCopy.right[3] = cube.front[3];

cubeCopy.bottom = clockwise(cube.bottom);

return cubeCopy;
}
function dPrime(cube) {
let cubeCopy = getCubeCopy(cube);

cubeCopy.front[2] = cube.right[2];
cubeCopy.front[3] = cube.right[3];
cubeCopy.back[2] = cube.left[2];
cubeCopy.back[3] = cube.left[3];
cubeCopy.left[2] = cube.front[2];
cubeCopy.left[3] = cube.front[3];
cubeCopy.right[2] = cube.back[2];
cubeCopy.right[3] = cube.back[3];

cubeCopy.bottom = counterclockwise(cube.bottom);

return cubeCopy;
}

function getCubeCopy(cube) {
    return JSON.parse(JSON.stringify(cube));
}

function clockwise(face) {
    let faceCopy = JSON.parse(JSON.stringify(face));
    faceCopy[0] = face[3];
    faceCopy[1] = face[0];
    faceCopy[2] = face[1];
    faceCopy[3] = face[2];
    return faceCopy;
}
function counterclockwise(face) {
    let faceCopy = JSON.parse(JSON.stringify(face));
    faceCopy[0] = face[1];
    faceCopy[1] = face[2];
    faceCopy[2] = face[3];
    faceCopy[3] = face[0];
    return faceCopy;
}