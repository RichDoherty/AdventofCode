const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const treeMatrix = lines.map(line => line.split(""));

console.log(treeMatrix);

function topViewDistance(matrix: string[][], coordinate: number[]): number {
    let row = coordinate[1];
    let col = coordinate[0];
    let viewingDistance = 0;
    while (row > 0) {
        if (matrix[row-1][col] < matrix[coordinate[1]][coordinate[0]]) {
            viewingDistance++;
        } else {
            viewingDistance++;
            return viewingDistance;
        }
        row--;
    }
    return viewingDistance;
}

function bottomViewDistance(matrix: string[][], coordinate: number[]): number {
    let row = coordinate[1];
    let col = coordinate[0];
    let viewingDistance = 0;
    while (row < matrix.length-1) {
        if (matrix[row+1][col] < matrix[coordinate[1]][coordinate[0]]) {
            viewingDistance++;
        } else {
            viewingDistance++;
            return viewingDistance;
        }
        row++;
    }
    return viewingDistance;
}

function leftViewDistance(matrix: string[][], coordinate: number[]): number {
    let row = coordinate[1];
    let col = coordinate[0];
    let viewingDistance = 0;
    while (col > 0) {
        if (matrix[row][col-1] < matrix[coordinate[1]][coordinate[0]]) {
            viewingDistance++;
        } else {
            viewingDistance++;
            return viewingDistance;
        }
        col--;
    }
    return viewingDistance;
}

function rightViewDistance(matrix: string[][], coordinate: number[]): number {
    let row = coordinate[1];
    let col = coordinate[0];
    let viewingDistance = 0;
    while (col < matrix[coordinate[1]].length-1) {
        if (matrix[row][col+1] < matrix[coordinate[1]][coordinate[0]]) {
            viewingDistance++;
        } else {
            viewingDistance++;
            return viewingDistance;
        }
        col++;
    }
    return viewingDistance;
}

const i = 2;
const j = 3;
const point = treeMatrix[j][i];
console.log("coordinates:", [i, j], "value:", point);
console.log("top:", topViewDistance(treeMatrix, [i, j]));
console.log("bottom:", bottomViewDistance(treeMatrix, [i, j]));
console.log("left:", leftViewDistance(treeMatrix, [i, j]));
console.log("right:", rightViewDistance(treeMatrix, [i, j]));

let maxScenicScore = 0;
for (let i = 1; i < treeMatrix.length-1; i++) {
    for (let j = 1; j < treeMatrix[i].length-1; j++) {
       const scenicScore = topViewDistance(treeMatrix, [i, j]) * bottomViewDistance(treeMatrix, [i, j]) * leftViewDistance(treeMatrix, [i, j]) * rightViewDistance(treeMatrix, [i, j]);
       maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
}

console.log(maxScenicScore);