const input = await Deno.readTextFile("./input.txt");

const rounds = input.split("\r\n");

let totalPoints = 0;

const points = new Map();
points.set("A", 1);
points.set("B", 2);
points.set("C", 3);

const lose = new Map();
lose.set("A", "C");
lose.set("B", "A");
lose.set("C", "B");

const tie = new Map();
tie.set("A", "A");
tie.set("B", "B");
tie.set("B", "C");

const win = new Map();
win.set("A", "B");
win.set("B", "C");
win.set("C", "A");

for (let i = 0; i < rounds.length; i++) {
    let roundPoints = 0;
    if (rounds[i][2] === "X") {
        roundPoints += points.get(lose.get(rounds[i][0]));
    }
    if (rounds[i][2] === "Y") {
        roundPoints += points.get(rounds[i][0]) + 3;
    }
    if (rounds[i][2] === "Z") {
        roundPoints += points.get(win.get(rounds[i][0])) + 6;
    }
    totalPoints += roundPoints;
}

console.log(totalPoints);