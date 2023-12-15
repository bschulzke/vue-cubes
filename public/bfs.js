onmessage = (e) => {
    startWorker(e);
}

async function startWorker(e) {
    await new Promise(r => setTimeout(r, 500));
    console.log("Received message from main script");
    let cube = e.data;

    let solutionPath = bidirectionalBfsSolver(cube);

    postMessage(solutionPath);
}

const u = 'u';
const r = 'r';
const f = 'f';
const U = 'U';
const R = 'R';
const F = 'F';

function bidirectionalBfsSolver(cube) {
    const startTime = Date.now();

    console.log("Starting...");

    const maxItr = 10000;
    let curItr = 0;

    const searchQueue = [""];
    const solutionQueue = [""];
    const searchVisited = new Map();
    const solutionVisited = new Map();

    const startCube = new Cube(cube);

    const targetCube = new Cube({
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    });

    while (curItr++ < maxItr) {
        // console.log(`Iteration: ${curItr} / ${maxItr}`);

        // Search node
        const currentSearchSteps = searchQueue.shift();
        const currentSearchCubeState = startCube.calculateCubeState(currentSearchSteps);
        
        if (!searchVisited.has(JSON.stringify(currentSearchCubeState))) {
            const previouslyVisitedSolutionSteps = solutionVisited.get(JSON.stringify(currentSearchCubeState));

            console.log("Current search after doing " + currentSearchSteps + ": " + JSON.stringify(currentSearchCubeState))
            if (previouslyVisitedSolutionSteps !== undefined) {
                let solution = previouslyVisitedSolutionSteps + currentSearchSteps
                console.log(`Solved! (From search queue): ${solution}`);
                return solution
            }

            searchVisited.set(JSON.stringify(currentSearchCubeState), currentSearchSteps);
            console.log(searchVisited.get(JSON.stringify(currentSearchCubeState)))

            searchQueue.push(currentSearchSteps.concat(u));
            searchQueue.push(currentSearchSteps.concat(r));
            searchQueue.push(currentSearchSteps.concat(f));
            searchQueue.push(currentSearchSteps.concat(U));
            searchQueue.push(currentSearchSteps.concat(R));
            searchQueue.push(currentSearchSteps.concat(F));
        }

        // Solution node
        const curTargetSteps = solutionQueue.shift();
        const cubeStateT = targetCube.calculateCubeState(curTargetSteps);

        if (!solutionVisited.has(JSON.stringify(cubeStateT))) {
            const previouslyVisitedSearchSteps = searchVisited.get(JSON.stringify(cubeStateT));

            if (previouslyVisitedSearchSteps !== undefined) {
                let solution = previouslyVisitedSearchSteps + reverseSteps(curTargetSteps)
                console.log(`Solved! (From solution queue): ${solution}`);
                return solution
            }

            solutionVisited.set(JSON.stringify(cubeStateT), curTargetSteps);

            solutionQueue.push(curTargetSteps.concat(u));
            solutionQueue.push(curTargetSteps.concat(r));
            solutionQueue.push(curTargetSteps.concat(f));
            solutionQueue.push(curTargetSteps.concat(U));
            solutionQueue.push(curTargetSteps.concat(R));
            solutionQueue.push(curTargetSteps.concat(F));
        }
    }

    if (curItr >= maxItr) {
        console.log("Reached max allowed steps");
        return null;
    }
    
    const endTime = Date.now();
    console.log(`Search took ${endTime - startTime} milliseconds`);
}

function reverseSteps(steps) {
    let reverseSteps = ""
    for (let i = steps.length - 1; i >= 0; i--) {
        reverseSteps += oppositeMove(steps.at(i))
    }
    return reverseSteps
}

function oppositeMove(move) {
    console.log("Getting move opposite of: " + move)
    switch (move) {
        case 'u':
            return 'U'
        case 'U':
            return 'u'
        case 'r':
            return 'R'
        case 'R':
            return 'r'
        case 'f':
            return 'F'
        case 'F':
            return 'f'
    }
}

class Cube {
    constructor(cubeState) {
        this.state = cubeState;
    }

    calculateCubeState(steps) {

        let copyCube = new Cube(this.copyState())

        if (steps && steps.length > 0) {
            for (let i = 0; i < steps.length; i++) {
                copyCube.makeMove(steps.at(i))
            }
        }

        return copyCube;
    }

    makeMove(move) {
        switch (move) {
            case 'u':
                return this.u()
            case 'U':
                return this.uPrime()
            case 'r':
                return this.r()
            case 'R':
                return this.rPrime()
            case 'f':
                return this.f()
        }
    }

    copyState() {
        return JSON.parse(JSON.stringify(this.state));
    }

    clockwise(face) {
        let faceCopy = JSON.parse(JSON.stringify(face));
        faceCopy[0] = face[3];
        faceCopy[1] = face[0];
        faceCopy[2] = face[1];
        faceCopy[3] = face[2];
        return faceCopy;
    }
    counterclockwise(face) {
        let faceCopy = JSON.parse(JSON.stringify(face));
        faceCopy[0] = face[1];
        faceCopy[1] = face[2];
        faceCopy[2] = face[3];
        faceCopy[3] = face[0];
        return faceCopy;
    }

    u() {

        let stateCopy = this.copyState();

        stateCopy.front[0] = this.state.right[0];
        stateCopy.front[1] = this.state.right[1];
        stateCopy.back[0] = this.state.left[0];
        stateCopy.back[1] = this.state.left[1];
        stateCopy.left[0] = this.state.front[0];
        stateCopy.left[1] = this.state.front[1];
        stateCopy.right[0] = this.state.back[0];
        stateCopy.right[1] = this.state.back[1];

        stateCopy.top = this.clockwise(stateCopy.top);

        this.state = stateCopy;
    }
    r() {

        let cubeCopy = this.copyState();
        
        cubeCopy.front[1] = this.state.bottom[1];
        cubeCopy.front[2] = this.state.bottom[2];

        cubeCopy.back[0] = this.state.top[2];
        cubeCopy.back[3] = this.state.top[1];

        cubeCopy.top[1] = this.state.front[1];
        cubeCopy.top[2] = this.state.front[2];
        
        cubeCopy.bottom[1] = this.state.back[3];
        cubeCopy.bottom[2] = this.state.back[0];
        
        cubeCopy.right = this.clockwise(cubeCopy.right);
        
        this.state = cubeCopy;
      }
      f() {
  
        let cubeCopy = this.copyState();
  
        cubeCopy.bottom[0] = this.state.right[3];
        cubeCopy.bottom[1] = this.state.right[0];
        cubeCopy.top[2] = this.state.left[1];
        cubeCopy.top[3] = this.state.left[2];
        cubeCopy.left[1] = this.state.bottom[0];
        cubeCopy.left[2] = this.state.bottom[1];
        cubeCopy.right[0] = this.state.top[3];
        cubeCopy.right[3] = this.state.top[2];
  
        cubeCopy.front = this.clockwise(cubeCopy.right);
  
        this.state = cubeCopy;
    }
    uPrime() {
        
          let cubeCopy = this.copyState();
  
          cubeCopy.front[0] = this.state.left[0];
          cubeCopy.front[1] = this.state.left[1];
          cubeCopy.back[0] = this.state.right[0];
          cubeCopy.back[1] = this.state.right[1];
          cubeCopy.left[0] = this.state.back[0];
          cubeCopy.left[1] = this.state.back[1];
          cubeCopy.right[0] = this.state.front[0];
          cubeCopy.right[1] = this.state.front[1];
  
          cubeCopy.top = this.counterclockwise(cubeCopy.top);
          
          this.state = cubeCopy;
      }
      rPrime() {
  
        let cubeCopy = this.copyState();
  
        cubeCopy.front[1] = this.state.top[1];
        cubeCopy.front[2] = this.state.top[2];
        cubeCopy.back[0] = this.state.bottom[2];
        cubeCopy.back[3] = this.state.bottom[1];
        cubeCopy.bottom[1] = this.state.front[1];
        cubeCopy.bottom[2] = this.state.front[2];
        cubeCopy.top[1] = this.state.back[3];
        cubeCopy.top[2] = this.state.back[0];
  
        cubeCopy.right = this.counterclockwise(cubeCopy.right);
        
        this.state = cubeCopy;
      }
      fPrime() {
        this.save();
    
        let cubeCopy = this.copyState();
    
        cubeCopy.bottom[0] = this.state.left[1];
        cubeCopy.bottom[1] = this.state.left[2];
        cubeCopy.top[2] = this.state.right[3];
        cubeCopy.top[3] = this.state.right[0];
        cubeCopy.left[1] = this.state.top[2];
        cubeCopy.left[2] = this.state.top[3];
        cubeCopy.right[0] = this.state.bottom[1];
        cubeCopy.right[3] = this.state.bottom[0];
    
        cubeCopy.front = this.counterclockwise(cubeCopy.right);
    
        this.state = cubeCopy;
      }

}