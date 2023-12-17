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

const moveSymbols = ['u','r','f','U','R','F',"l","L"]

function bidirectionalBfsSolver(cube) {
    const startTime = Date.now();

    console.log("Starting...");

    const maxItr = 30000;
    let curItr = 0;

    const searchQueue = [""];
    const solutionQueue = [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],
    [""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],];
    const searchVisited = new Map();
    const solutionVisited = [new Map(),new Map(),new Map(),new Map(),
        new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),
        new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),
        new Map(),new Map(),new Map(),new Map()];

    const startCube = new Cube(cube);

    const targetCube = new Cube({
        front: ['red', 'red', 'red', 'red'],
        back: ['orange', 'orange', 'orange', 'orange'],
        right: ['green', 'green', 'green', 'green'],
        left: ['blue', 'blue', 'blue', 'blue'],
        top: ['yellow', 'yellow', 'yellow', 'yellow'],
        bottom: ['white', 'white', 'white', 'white']
    });

    const targetCubes = getTargetCubes()

    while (curItr++ < maxItr) {
        console.log(`Iteration: ${curItr} / ${maxItr}`);

        // Search node
        const currentSearchSteps = searchQueue.shift();
        const currentSearchCubeState = startCube.calculateCubeState(currentSearchSteps);
        
        for (let i = 0; i < solutionVisited.length; i++) {
            const solutionMap = solutionVisited[i];
        
            if (!searchVisited.has(JSON.stringify(currentSearchCubeState))) {
                const previouslyVisitedSolutionSteps = solutionMap.get(JSON.stringify(currentSearchCubeState));
        
                // console.log("Current search after doing " + currentSearchSteps + ": " + JSON.stringify(currentSearchCubeState))
                if (previouslyVisitedSolutionSteps !== undefined) {
                    let solution = currentSearchSteps + previouslyVisitedSolutionSteps
                    console.log(`Solved! (From search queue): ${solution}`);
                }
        
                searchVisited.set(JSON.stringify(currentSearchCubeState), currentSearchSteps);
        
                moveSymbols.forEach((move) => {
                    searchQueue.push(currentSearchSteps.concat(move));
                });
            }
        }
        
        
        // Solution node
        for (let i = 0; i < targetCubes.length; i++) {
            const currSolutionQueue = solutionQueue[i]
            const curTargetSteps = currSolutionQueue.shift();
            const currentTargetCubeState = targetCubes[i].calculateCubeState(curTargetSteps);

            if (!solutionVisited[i].has(JSON.stringify(currentTargetCubeState))) {
                const previouslyVisitedSearchSteps = searchVisited.get(JSON.stringify(currentTargetCubeState));

                if (previouslyVisitedSearchSteps !== undefined) {
                    let solution = previouslyVisitedSearchSteps + reverseSteps(curTargetSteps)
                    console.log(`Solved! (From solution queue): ${solution}`);
                    return solution
                }

                solutionVisited[i].set(JSON.stringify(currentTargetCubeState), curTargetSteps);

                moveSymbols.forEach((move) => {
                    currSolutionQueue.push(curTargetSteps.concat(move));
                })

            }
        }
    }

    if (curItr >= maxItr) {
        console.log("Reached max allowed steps");
        return null;
    }
    
    const endTime = Date.now();
    console.log(`Search took ${endTime - startTime} milliseconds`);
}

function getTargetCubes() {
    return [
        new Cube({
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        }),
        new Cube({
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['blue', 'blue', 'blue', 'blue'],
            left: ['green', 'green', 'green', 'green'],
            top: ['white', 'white', 'white', 'white'],
            bottom: ['yellow', 'yellow', 'yellow', 'yellow']
        }),
        new Cube({
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['white', 'white', 'white', 'white'],
            left: ['yellow', 'yellow', 'yellow', 'yellow'],
            top: ['green', 'green', 'green', 'green'],
            bottom: ['blue', 'blue', 'blue', 'blue']
        }),
        new Cube({
            front: ['red', 'red', 'red', 'red'],
            back: ['orange', 'orange', 'orange', 'orange'],
            right: ['yellow', 'yellow', 'yellow', 'yellow'],
            left: ['white', 'white', 'white', 'white'],
            top: ['blue', 'blue', 'blue', 'blue'],
            bottom: ['green', 'green', 'green', 'green']
        }),
        new Cube({
            front: ['orange', 'orange', 'orange', 'orange'],
            back: ['red', 'red', 'red', 'red'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['white', 'white', 'white', 'white'],
            bottom: ['yellow', 'yellow', 'yellow', 'yellow']
        }),
        new Cube({
            front: ['orange', 'orange', 'orange', 'orange'],
            back: ['red', 'red', 'red', 'red'],
            right: ['blue', 'blue', 'blue', 'blue'],
            left: ['green', 'green', 'green', 'green'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        }),
        new Cube({
            front: ['orange', 'orange', 'orange', 'orange'],
            back: ['red', 'red', 'red', 'red'],
            right: ['white', 'white', 'white', 'white'],
            left: ['yellow', 'yellow', 'yellow', 'yellow'],
            top: ['blue', 'blue', 'blue', 'blue'],
            bottom: ['green', 'green', 'green', 'green']
        }),
        new Cube({
            front: ['orange', 'orange', 'orange', 'orange'],
            back: ['red', 'red', 'red', 'red'],
            right: ['yellow', 'yellow', 'yellow', 'yellow'],
            left: ['white', 'white', 'white', 'white'],
            top: ['green', 'green', 'green', 'green'],
            bottom: ['blue', 'blue', 'blue', 'blue']
        }),
        new Cube({
            front: ['green', 'green', 'green', 'green'],
            back: ['blue', 'blue', 'blue', 'blue'],
            right: ['orange', 'orange', 'orange', 'orange'],
            left: ['red', 'red', 'red', 'red'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        }),
        new Cube({
            front: ['green', 'green', 'green', 'green'],
            back: ['blue', 'blue', 'blue', 'blue'],
            right: ['red', 'red', 'red', 'red'],
            left: ['orange', 'orange', 'orange', 'orange'],
            top: ['white', 'white', 'white', 'white'],
            bottom: ['yellow', 'yellow', 'yellow', 'yellow']
        }),
        new Cube({
            front: ['green', 'green', 'green', 'green'],
            back: ['blue', 'blue', 'blue', 'blue'],
            right: ['yellow', 'yellow', 'yellow', 'yellow'],
            left: ['white', 'white', 'white', 'white'],
            top: ['red', 'red', 'red', 'red'],
            bottom: ['orange', 'orange', 'orange', 'orange']
        }),
        new Cube({
            front: ['green', 'green', 'green', 'green'],
            back: ['blue', 'blue', 'blue', 'blue'],
            right: ['white', 'white', 'white', 'white'],
            left: ['yellow', 'yellow', 'yellow', 'yellow'],
            top: ['orange', 'orange', 'orange', 'orange'],
            bottom: ['red', 'red', 'red', 'red']
        }),
        new Cube({
            front: ['white', 'white', 'white', 'white'],
            back: ['yellow', 'yellow', 'yellow', 'yellow'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['red', 'red', 'red', 'red'],
            bottom: ['orange', 'orange', 'orange', 'orange']
        }),
        new Cube({
            front: ['white', 'white', 'white', 'white'],
            back: ['yellow', 'yellow', 'yellow', 'yellow'],
            right: ['blue', 'blue', 'blue', 'blue'],
            left: ['green', 'green', 'green', 'green'],
            top: ['orange', 'orange', 'orange', 'orange'],
            bottom: ['red', 'red', 'red', 'red']
        }),
        new Cube({
            front: ['white', 'white', 'white', 'white'],
            back: ['yellow', 'yellow', 'yellow', 'yellow'],
            right: ['orange', 'orange', 'orange', 'orange'],
            left: ['red', 'red', 'red', 'red'],
            top: ['green', 'green', 'green', 'green'],
            bottom: ['blue', 'blue', 'blue', 'blue']
        }),
        new Cube({
            front: ['white', 'white', 'white', 'white'],
            back: ['yellow', 'yellow', 'yellow', 'yellow'],
            right: ['red', 'red', 'red', 'red'],
            left: ['orange', 'orange', 'orange', 'orange'],
            top: ['blue', 'blue', 'blue', 'blue'],
            bottom: ['green', 'green', 'green', 'green']
        }),
        new Cube({
            front: ['blue', 'blue', 'blue', 'blue'],
            back: ['green', 'green', 'green', 'green'],
            right: ['red', 'red', 'red', 'red'],
            left: ['orange', 'orange', 'orange', 'orange'],
            top: ['yellow', 'yellow', 'yellow', 'yellow'],
            bottom: ['white', 'white', 'white', 'white']
        }),
        new Cube({
            front: ['blue', 'blue', 'blue', 'blue'],
            back: ['green', 'green', 'green', 'green'],
            right: ['orange', 'orange', 'orange', 'orange'],
            left: ['red', 'red', 'red', 'red'],
            top: ['white', 'white', 'white', 'white'],
            bottom: ['yellow', 'yellow', 'yellow', 'yellow']
        }),
        new Cube({
            front: ['blue', 'blue', 'blue', 'blue'],
            back: ['green', 'green', 'green', 'green'],
            right: ['white', 'white', 'white', 'white'],
            left: ['yellow', 'yellow', 'yellow', 'yellow'],
            top: ['red', 'red', 'red', 'red'],
            bottom: ['orange', 'orange', 'orange', 'orange']
        }),
        new Cube({
            front: ['blue', 'blue', 'blue', 'blue'],
            back: ['green', 'green', 'green', 'green'],
            right: ['yellow', 'yellow', 'yellow', 'yellow'],
            left: ['white', 'white', 'white', 'white'],
            top: ['orange', 'orange', 'orange', 'orange'],
            bottom: ['red', 'red', 'red', 'red']
        }),
        new Cube({
            front: ['yellow', 'yellow', 'yellow', 'yellow'],
            back: ['white', 'white', 'white', 'white'],
            right: ['orange', 'orange', 'orange', 'orange'],
            left: ['red', 'red', 'red', 'red'],
            top: ['blue', 'blue', 'blue', 'blue'],
            bottom: ['green', 'green', 'green', 'green']
        }),
        new Cube({
            front: ['yellow', 'yellow', 'yellow', 'yellow'],
            back: ['white', 'white', 'white', 'white'],
            right: ['red', 'red', 'red', 'red'],
            left: ['orange', 'orange', 'orange', 'orange'],
            top: ['green', 'green', 'green', 'green'],
            bottom: ['blue', 'blue', 'blue', 'blue']
        }),
        new Cube({
            front: ['yellow', 'yellow', 'yellow', 'yellow'],
            back: ['white', 'white', 'white', 'white'],
            right: ['green', 'green', 'green', 'green'],
            left: ['blue', 'blue', 'blue', 'blue'],
            top: ['orange', 'orange', 'orange', 'orange'],
            bottom: ['red', 'red', 'red', 'red']
        }),
        new Cube({
            front: ['yellow', 'yellow', 'yellow', 'yellow'],
            back: ['white', 'white', 'white', 'white'],
            right: ['blue', 'blue', 'blue', 'blue'],
            left: ['green', 'green', 'green', 'green'],
            top: ['red', 'red', 'red', 'red'],
            bottom: ['orange', 'orange', 'orange', 'orange']
        })
    ]
}

function reverseSteps(steps) {
    let reverseSteps = ""
    for (let i = steps.length - 1; i >= 0; i--) {
        reverseSteps += oppositeMove(steps.at(i))
    }
    return reverseSteps
}

function oppositeMove(move) {
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
        case 'l':
            return 'L'
        case 'L':
            return 'l'
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
            case 'l':
                return this.l()
            case 'L':
                return this.lPrime()
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
      l() {
        let cubeCopy = this.copyState();
    
        cubeCopy.front[0] = this.state.top[0];
        cubeCopy.front[3] = this.state.top[3];
        cubeCopy.back[1] = this.state.bottom[3];
        cubeCopy.back[2] = this.state.bottom[0];
        cubeCopy.bottom[0] = this.state.front[0];
        cubeCopy.bottom[3] = this.state.front[3];
        cubeCopy.top[0] = this.state.back[2];
        cubeCopy.top[3] = this.state.back[1];
        
        cubeCopy.left = this.clockwise(cubeCopy.left);
    
        this.state = cubeCopy;
      }
      lPrime() {
        let cubeCopy = this.copyState();
    
        cubeCopy.front[0] = this.state.bottom[0];
        cubeCopy.front[3] = this.state.bottom[3];
        cubeCopy.back[1] = this.state.top[3];
        cubeCopy.back[2] = this.state.top[0];
        cubeCopy.bottom[0] = this.state.back[2];
        cubeCopy.bottom[3] = this.state.back[1];
        cubeCopy.top[0] = this.state.front[0];
        cubeCopy.top[3] = this.state.front[3];
    
        cubeCopy.left = this.counterclockwise(cubeCopy.left);
    
        this.state = cubeCopy;
      }

}