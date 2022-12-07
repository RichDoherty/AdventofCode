const input = await Deno.readTextFile("./input.txt");

const rounds = input.split("\r\n");
// const rounds = ["A Y", "B X", "C Z"];

let totalPoints = 0;

const points = new Map();
points.set("A", 1);
points.set("B", 2);
points.set("C", 3);
points.set("X", 1);
points.set("Y", 2);
points.set("Z", 3);

for (let i = 0; i < rounds.length; i++) {
    let roundPoints = points.get(rounds[i][2]);
    if (points.get(rounds[i][2]) === points.get(rounds[i][0])) {
        roundPoints += 3;
    } 
    if (rounds[i][0] === "A" && rounds[i][2] === "Y") {
        roundPoints += 6;
    }
    if (rounds[i][0] === "B" && rounds[i][2] === "Z") {
        roundPoints += 6;
    }
    if (rounds[i][0] === "C" && rounds[i][2] === "X") {
        roundPoints += 6;
    }
    totalPoints += roundPoints;
}

console.log(totalPoints);