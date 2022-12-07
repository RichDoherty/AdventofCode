const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const pairs = lines.map((line) => line.split(","));

let overlappingPairs = 0;
for (const pair of pairs) {
    const splitPair1 = pair[0].split("-").map((x) => parseInt(x));
    const splitPair2 = pair[1].split("-").map((x) => parseInt(x));
    if (!(splitPair1[1] < splitPair2[0]) && !(splitPair1[0] > splitPair2[1])) {
        overlappingPairs++;
    }
}

console.log(overlappingPairs);