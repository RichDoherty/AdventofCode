const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const screen: string[] = [];

let x = 1;
const cycles: number[] = [];

for (const line of lines) {
    const splitLine = line.split(" ");
    if (splitLine[0] === "addx") {
        cycles.push(0);
        cycles.push(parseInt(splitLine[1]));
    } else {
        cycles.push(0);
    }
}

let numCycles = 0;
for (let i = 0; i < 6; i++) {
    let screenLine = "";
    for (let j = 0; j < 40; j++) {
    const sprite = [x-1, x, x+1];
    if (j >= sprite[0] && j <= sprite[2]) {
        screenLine += "#";
    } else {
        screenLine += ".";
    }
    x += cycles[j + 40 * numCycles];
    console.log(sprite);
    }
    screen.push(screenLine);
    numCycles++;
    console.log(numCycles);
}

console.log(screen);