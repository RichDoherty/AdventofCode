const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const instructions = lines.map(line => line.split(" "));

console.log(instructions);

type Point = { x: number, y: number };

const headPosition: Point = { x: 0, y: 0 };
const tailPosition: Point = { x: 0, y: 0 };
const tailPositionHistory = new Set();
tailPositionHistory.add(`0,0`)

function followInstruction(instruction: string[]) {
    for (let i = 0; i < parseInt(instruction[1]); i++) {
        if (instruction[0] === "R") {
            headPosition.x += 1;
        } else if (instruction[0] === "L") {
            headPosition.x -= 1;
        } else if (instruction[0] === "U") {
            headPosition.y += 1;
        } else if (instruction[0] === "D") {
            headPosition.y -= 1;
        }
        moveTail();
        tailPositionHistory.add(`${tailPosition.x},${tailPosition.y}`);
        console.log("Head:", headPosition);
        console.log("Tail:", tailPosition);
    }
    return headPosition;
}

// Diagonal Moves
// Up-Left: x-1, y+1
// Up-Right: x+1, y+1
// Down-Left: x-1, y-1
// Down-Right: x+1, y-1

function moveTail() {
    if ((Math.abs(headPosition.x - tailPosition.x) > 1 && headPosition.y !== tailPosition.y) ||
        (Math.abs(headPosition.y - tailPosition.y) > 1 && headPosition.x !== tailPosition.x)) {
        if (headPosition.x > tailPosition.x) {
            tailPosition.x++;
            if (headPosition.y > tailPosition.y) {
                tailPosition.y++;
            } else {
                tailPosition.y--;
            }
        } else if (headPosition.x < tailPosition.x) {
            tailPosition.x--;
            if (headPosition.y > tailPosition.y) {
                tailPosition.y++;
            } else {
                tailPosition.y--;
            }
        } 
    } else if (headPosition.x - tailPosition.x > 1) {
        tailPosition.x += 1;
    } else if (headPosition.x - tailPosition.x < -1) {
        tailPosition.x -= 1;
    } else if (headPosition.y - tailPosition.y > 1) {
        tailPosition.y += 1;
    } else if (headPosition.y - tailPosition.y < -1) {
        tailPosition.y -= 1;
    }
    return tailPosition;
}

for (const instruction of instructions) {
    followInstruction(instruction);
}

console.log(tailPositionHistory);
console.log(tailPositionHistory.size);