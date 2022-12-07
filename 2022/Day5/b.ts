const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

const cargo = [];
let instructions = [];
let isInstruction = false;
for (const line of lines) {
    if (line === "") {
        isInstruction = true;
    } else if (!isInstruction) {
        cargo.push(line);
    } else {
        instructions.push(line);
    }
}

instructions = instructions.map((line) => line.split(" "));

const cargoMatrix: string[][] = [];
for (let i = 0; i < cargo.length-1; i++) {
    const row: string[] = [];
    for (let j = 1; j < cargo[i].length; j += 4) {
        row.push(cargo[i][j]);
    }
    cargoMatrix.push(row);
}

function followInstruction(cargoMatrix: string[][], instructions: string[][], index: number) {
    const numToMove = parseInt(instructions[index][1]);
    const targetCol = parseInt(instructions[index][3])-1;
    const destinationCol = parseInt(instructions[index][5])-1;
    moveCrates(cargoMatrix, numToMove, targetCol, destinationCol);
    return cargoMatrix;
}

function moveCrates(cargoMatrix: string[][], numToMove: number, targetCol: number, destinationCol: number) {
    let i = 0;
    while (cargoMatrix[i][targetCol] === " ") {
        i++;
    }
    const targetRows = [];
    while (numToMove > 0) {
        targetRows.push(cargoMatrix[i][targetCol]);
        cargoMatrix[i][targetCol] = " ";
        i++;
        numToMove--;
    }
    i = 0;
    while (i < cargoMatrix.length && cargoMatrix[i][destinationCol] === " ") {
        i++;
    }
    while (i > 0) {
        cargoMatrix[i-1][destinationCol] = targetRows[targetRows.length-1] || " ";
        targetRows.pop();
        i--;
    }
    while (targetRows.length !== 0) {
        const newArr: string[] = [];
        newArr.length = cargoMatrix[1].length;
        newArr.fill(" ");
        cargoMatrix.unshift(newArr);
        cargoMatrix[i][destinationCol] = targetRows[targetRows.length-1];
        targetRows.pop();
    }
    return cargoMatrix;
}

for (let i = 0; i < instructions.length; i++) {
    followInstruction(cargoMatrix, instructions, i);
}

function getTop(cargoMatrix: string[][]) {
    let result = "";
    let i = 0;
    let j = 0;
    while (i < cargoMatrix[cargoMatrix.length-1].length) {
        while (cargoMatrix[j][i] === " ") {
            j++;
        }
        result += cargoMatrix[j][i];
        j = 0;
        i++;
    }
    return result;
}

console.log(getTop(cargoMatrix));