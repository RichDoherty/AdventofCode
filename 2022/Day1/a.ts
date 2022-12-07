const input = await Deno.readTextFile("./input.txt");

const split = input.split("\r\n");

const inventories: number[] = [];
// let max = 0;


let elf = 0;
for (let i = 0; i < split.length; i++) {
    if (split[i] === "") {
        // max = Math.max(inventories[elf], max);
        elf++;
    } else {
        if (!inventories[elf]) {
            inventories.push(parseInt(split[i]));
        } else {
            inventories[elf] += parseInt(split[i]);
        }
    }
}

const topThree = inventories.sort((a, b) => b - a).slice(0, 3);

let topThreeSum = 0;
for (let i = 0; i < topThree.length; i++) {
    topThreeSum += topThree[i];
}

console.log(topThreeSum);