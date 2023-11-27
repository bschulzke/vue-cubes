onmessage = (e) => {
    solveCube(e);
}

async function solveCube(e) {
    await new Promise(r => setTimeout(r, 500));
    console.log("Received message from main script");
    console.log(e.data);
    postMessage("Message from worker");
}