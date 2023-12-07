onmessage = (e) => {
    startWorker(e);
}

async function startWorker(e) {
    await new Promise(r => setTimeout(r, 500));
    console.log("Received message from main script");
    console.log(e.data);
    postMessage("Cube evaluates to: " + evaluateCube(e.data));
}

function evaluateCube(cube) {
    return evaluateFace(cube.front) 
        + evaluateFace(cube.back) 
        + evaluateFace(cube.top) 
        + evaluateFace(cube.bottom) 
        + evaluateFace(cube.left)
        + evaluateFace(cube.right);
}

function evaluateFace(face) {
    let count = 0;
    let foundTiles = [];
    for (tile of face) {
        face.forEach((v) => (v === tile && count++));
        foundTiles.push(tile);
   }
   return count;
}