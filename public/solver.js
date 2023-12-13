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
    
    let moves = getMoves();

    const queueForward = [{cube: cube, path: ""}];
    const queueBackward = [{cube: getSolvedCube(), path: ""}]; // Starting from the solved state

    // Initialize visited sets for forward and backward BFS
    const visitedForward = new Set();
    const visitedBackward = new Set();
    const forwardPathMap = [];
    const backwardPathMap = [];

    console.log("Beginning bidirectional search...")
    let max_iterations = 10000
    let currentBackward = null;
    while (queueForward.length > 0 && queueBackward.length > 0 && max_iterations > 0) {

        // Forward BFS
        const currentForward = queueForward.shift();
        
        visitedForward.add(JSON.stringify(currentForward.cube));
        forwardPathMap.push(currentForward);
        
        const neighborsForward = generateNeighbors(currentForward);
        
        for (const neighbor of neighborsForward) {
            if (!visitedForward.has(JSON.stringify(neighbor))) {
                queueForward.push(neighbor);
            }
        }
        
        // Backward BFS
        currentBackward = queueBackward.shift();
        visitedBackward.add(JSON.stringify(currentBackward.cube));
        backwardPathMap.push(currentBackward);
        
        const neighborsBackward = generateNeighborsBackward(currentBackward);
        for (const neighbor of neighborsBackward) {
            if (!visitedBackward.has(JSON.stringify(neighbor))) {
                queueBackward.push(neighbor);
            }
        }

        for (let n1 of forwardPathMap) {
            for (let n2 of backwardPathMap) {
                if (JSON.stringify(n1.cube) == JSON.stringify(n2.cube)) {
                    return n1.path + n2.path.split("").reverse().join("") 
                }
            }
        }
        
        max_iterations--
    }

    return null; // No solution found
  
  }

  const getMoves = () => { return ['u','U','d','D','l','L','r','R','f','F','b','B']; }

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
    // (you may need to adjust based on your specific cube representation)
}

// Helper function to get the solved cube state
function getSolvedCube() {
    // Implement the logic to create a solved cube state
    // (you may need to adjust based on your specific cube representation)
    return {
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
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