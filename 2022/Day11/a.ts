const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const monkeyInfo: string[][] = [];
let arr: string[] = [];
for (const line of lines) {
    if (line === "") {
        monkeyInfo.push(arr);
        arr = [];
    } else {
        arr.push(line.trim());
    }
}

console.log(monkeyInfo);

const monkeyItems: string[][] = [];
for (const monkey of monkeyInfo) {
    const splitLine = monkey[1].split(" ");
    console.log(splitLine);
    const arr = [];
    for (let i = 2; i < splitLine.length; i++) {
        if (splitLine[i][splitLine[i].length-1] === ",") {
            arr.push(splitLine[i].substring(0, splitLine[i].length-1));
        } else {
            arr.push(splitLine[i]);
        }
    }
    monkeyItems.push(arr);
}

console.log(monkeyItems);

function operation(oldNum: number, newNum: number, operator: string) {
    if (operator === "+") {
        return oldNum + newNum;
    } else {
        return oldNum * newNum;
    }
}

const monkeyInspections: number[] = [];
for (let i = 0; i < monkeyInfo.length; i++) {
    monkeyInspections.push(0);
}

function simulateRound() {
    for (let i = 0; i < monkeyInfo.length; i++) {
        while (monkeyItems[i].length > 0) {
            // Operation
            const operationInstructions = monkeyInfo[i][2].split(" ");
            const newNum = Math.floor(operation(parseInt(monkeyItems[i][0]), (operationInstructions[5] === "old" ? parseInt(monkeyItems[i][0]) : parseInt(operationInstructions[5])), operationInstructions[4]) / 3);
            // Test
            const testInstructions = monkeyInfo[i][3].split(" ");
            if (newNum % parseInt(testInstructions[3]) === 0) {
                const targetMonkey = monkeyInfo[i][4].split(" ");
                monkeyItems[parseInt(targetMonkey[5])].push(newNum.toString());
            } else {
                const targetMonkey = monkeyInfo[i][5].split(" ");
                monkeyItems[parseInt(targetMonkey[5])].push(newNum.toString());
            }
            monkeyItems[i].shift();
            monkeyInspections[i]++;
        } 
    }
    return monkeyItems;
}

for (let i = 0; i < 20; i++) {
    simulateRound();
}

monkeyInspections.sort((a, b) => a - b);
console.log(monkeyInspections[monkeyInspections.length-1] * monkeyInspections[monkeyInspections.length-2]);