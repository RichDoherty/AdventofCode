const input = await Deno.readTextFile("./input.txt");

const rucksacks = input.split("\r\n");

const compartments = rucksacks.map((rucksack) => [rucksack.slice(0, Math.floor(rucksack.length/2)), rucksack.slice(Math.trunc(rucksack.length/2))]);

function sameItems(compartments: string[]) {
    const items: string[] = [];
    const set = new Set();
    for (let i = 0; i < compartments[0].length; i++) {
        set.add(compartments[0][i]);
    }
    for (let i = 0; i < compartments[1].length; i++) {
        if (set.has(compartments[1][i]) && !items.includes(compartments[1][i])) {
            items.push(compartments[1][i]);
        }
    }
    return items;
}

const letterPriorities = new Map();
for (let i = 65; i <= 90; i++) {
    letterPriorities.set(String.fromCharCode(i), i-38);
}
for (let i = 97; i <= 122; i++) {
    letterPriorities.set(String.fromCharCode(i), i-96);
}

function addPriorities(items: string[][]) {
    let prioritySum = 0;
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].length; j++) {
            prioritySum += letterPriorities.get(items[i][j]);
        }
    }
    return prioritySum;
}

const allItems = [];
for (let i = 0; i < compartments.length; i++) {
    allItems.push(sameItems(compartments[i]));
}

console.log(addPriorities(allItems));
