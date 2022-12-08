const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const treeMatrix = lines.map(line => line.split(""));

console.log(treeMatrix);

function visibleFromTop(matrix: string[][], coordinate: number[]): boolean {
    let row = coordinate[1];
    let col = coordinate[0];
    while (row > 0) {
        if (matrix[row-1][col] >= matrix[coordinate[1]][coordinate[0]]) {
            return false;
        }
        row--;
    }
    return true;
}

function visibleFromBottom(matrix: string[][], coordinate: number[]): boolean {
    let row = coordinate[1];
    let col = coordinate[0];
    while (row < matrix.length-1) {
        if (matrix[row+1][col] >= matrix[coordinate[1]][coordinate[0]]) {
            return false;
        }
        row++;
    }
    return true;
}

function visibleFromLeft(matrix: string[][], coordinate: number[]): boolean {
    let row = coordinate[1];
    let col = coordinate[0];
    while (col > 0) {
        if (matrix[row][col-1] >= matrix[coordinate[1]][coordinate[0]]) {
            return false;
        }
        col--;
    }
    return true;
}

function visibleFromRight(matrix: string[][], coordinate: number[]): boolean {
    let row = coordinate[1];
    let col = coordinate[0];
    while (col < matrix[coordinate[1]].length-1) {
        if (matrix[row][col+1] >= matrix[coordinate[1]][coordinate[0]]) {
            return false;
        }
        col++;
    }
    return true;
}

let count = 0;
for (let i = 1; i < treeMatrix.length-1; i++) {
    for (let j = 1; j < treeMatrix[i].length-1; j++) {
        if (visibleFromTop(treeMatrix, [i, j]) || visibleFromBottom(treeMatrix, [i, j]) || visibleFromLeft(treeMatrix, [i, j]) || visibleFromRight(treeMatrix, [i, j])) {
            count += 1;
        }
    }
}

count += treeMatrix.length*2 + treeMatrix[0].length*2 - 4;
console.log(count);