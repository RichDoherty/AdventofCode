const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const instructions = lines.map(line => line.split(" "));

console.log(instructions);

type Point = { x: number, y: number };

const knotPositions: Point[] = [];
for (let i = 0; i < 10; i++) {
    knotPositions.push({ x: 0, y: 0 });
}
const tailPositionHistory = new Set();
tailPositionHistory.add(`0,0`)

function followInstruction(instruction: string[]) {
    for (let i = 0; i < parseInt(instruction[1]); i++) {
        if (instruction[0] === "R") {
            knotPositions[0].x += 1;
        } else if (instruction[0] === "L") {
            knotPositions[0].x -= 1;
        } else if (instruction[0] === "U") {
            knotPositions[0].y += 1;
        } else if (instruction[0] === "D") {
            knotPositions[0].y -= 1;
        }
        for (let j = 1; j < knotPositions.length; j++) {
            moveKnot(j);
        }
        tailPositionHistory.add(`${knotPositions[knotPositions.length-1].x},${knotPositions[knotPositions.length-1].y}`);
        console.log("Head:", knotPositions[0]);
        for (let knot = 1; knot < knotPositions.length-1; knot++) {
            console.log("Knot", knot, ":", knotPositions[knot]);
        }
        console.log("Tail:", knotPositions[knotPositions.length-1]);
    }
    return knotPositions[0];
}

// Diagonal Moves
// Up-Left: x-1, y+1
// Up-Right: x+1, y+1
// Down-Left: x-1, y-1
// Down-Right: x+1, y-1

function moveKnot(knotIndex: number) {
    if ((Math.abs(knotPositions[knotIndex-1].x - knotPositions[knotIndex].x) > 1 && knotPositions[knotIndex-1].y !== knotPositions[knotIndex].y) ||
        (Math.abs(knotPositions[knotIndex-1].y - knotPositions[knotIndex].y) > 1 && knotPositions[knotIndex-1].x !== knotPositions[knotIndex].x)) {
        if (knotPositions[knotIndex-1].x > knotPositions[knotIndex].x) {
            knotPositions[knotIndex].x++;
            if (knotPositions[knotIndex-1].y > knotPositions[knotIndex].y) {
                knotPositions[knotIndex].y++;
            } else {
                knotPositions[knotIndex].y--;
            }
        } else if (knotPositions[knotIndex-1].x < knotPositions[knotIndex].x) {
            knotPositions[knotIndex].x--;
            if (knotPositions[knotIndex-1].y > knotPositions[knotIndex].y) {
                knotPositions[knotIndex].y++;
            } else {
                knotPositions[knotIndex].y--;
            }
        } 
    } else if (knotPositions[knotIndex-1].x - knotPositions[knotIndex].x > 1) {
        knotPositions[knotIndex].x += 1;
    } else if (knotPositions[knotIndex-1].x - knotPositions[knotIndex].x < -1) {
        knotPositions[knotIndex].x -= 1;
    } else if (knotPositions[knotIndex-1].y - knotPositions[knotIndex].y > 1) {
        knotPositions[knotIndex].y += 1;
    } else if (knotPositions[knotIndex-1].y - knotPositions[knotIndex].y < -1) {
        knotPositions[knotIndex].y -= 1;
    }
    return knotPositions[knotIndex];
}

for (const instruction of instructions) {
    followInstruction(instruction);
}

console.log(tailPositionHistory);
console.log(tailPositionHistory.size);