const input = await Deno.readTextFile("./input.txt");

function allDistinctChars(input: string, numOfDistinctChars: number) {
    let p1 = 0;
    let p2 = numOfDistinctChars-1;
    while (p2 < input.length) {
        const set = new Set();
        for (let i = p1; i <= p2; i++) {
            set.add(input[i]);
        }
        p1++;
        p2++;
        if (set.size === numOfDistinctChars) { return p2; }
    }
}

console.log(allDistinctChars(input, 14));