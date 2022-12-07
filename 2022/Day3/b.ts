const input = await Deno.readTextFile("./input.txt");

const rucksacks = input.split("\r\n");

const groups = [];
let i = 0;
while (i < rucksacks.length) {
    let group = [];
    while (group.length < 3) {
        group.push(rucksacks[i]);
        i++;
    }
    groups.push(group);
    group = [];
}

const letterPriorities = new Map();
for (let i = 65; i <= 90; i++) {
    letterPriorities.set(String.fromCharCode(i), i-38);
}
for (let i = 97; i <= 122; i++) {
    letterPriorities.set(String.fromCharCode(i), i-96);
}

function getCommonItem(group: string[]) {
    const set1 = new Set();
    const set2 = new Set();
    for (let i = 0; i < group[0].length; i++) {
        set1.add(group[0][i]);
    }    
    for (let i = 0; i < group[1].length; i++) {
        set2.add(group[1][i]);
    }    
    for (let i = 0; i < group[2].length; i++) {
        if (set1.has(group[2][i]) && set2.has(group[2][i])) {
            return group[2][i];
        }
    }
}

const commonItems = [];
for (let i = 0; i < groups.length; i++) {
    commonItems.push(getCommonItem(groups[i]));
}

let prioritySum = 0;
for (const item of commonItems) {
    prioritySum += letterPriorities.get(item);
}

console.log(prioritySum);