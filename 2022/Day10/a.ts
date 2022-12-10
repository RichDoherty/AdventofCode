const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

let x = 1;
const numsToAdd: number[] = [];

for (const line of lines) {
    const splitLine = line.split(" ");
    if (splitLine[0] === "addx") {
        numsToAdd.push(0);
        numsToAdd.push(parseInt(splitLine[1]));
    } else {
        numsToAdd.push(0);
    }
}

const signalStrengthSums: number[] = [];
numsToAdd.forEach((num, index) => {
    if ([20, 60, 100, 140, 180, 220].includes(index + 1)) {
       signalStrengthSums.push(x * (index + 1));
    }
    x += num;
});

const total = signalStrengthSums.reduce((a, b) => a + b, 0);
console.log(total);