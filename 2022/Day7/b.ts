const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

type Directory = {
    parent?: Directory;
    directories: { [name: string]: Directory };
    files: { [name: string]: number };
}

const fileSystem = [];
const root: Directory = { directories: {}, files: {} };
fileSystem.push(root);

let currentDirectory = root;
let filePath = [root];

function mkdir(name: string) {
    currentDirectory.directories[name] = { parent: currentDirectory, files: {}, directories: {} };
}

function newFile(name: string, size: number) {
    currentDirectory.files[name] = size;
}

function cd(directoryName: string) {
    if (directoryName === "..") {
        currentDirectory = currentDirectory.parent!; 
        filePath.pop();
    } else if (directoryName === "/") {
        currentDirectory = root;
        filePath = [root];
    } else {
        if (!currentDirectory.directories[directoryName]) {
            currentDirectory.directories[directoryName] = { parent: currentDirectory, directories: {}, files: {} };
        }
        currentDirectory = currentDirectory.directories[directoryName];
        filePath.push(currentDirectory.directories[directoryName]);
        return currentDirectory;
    }
}

for (const line of lines) {
    const parsedLine = line.split(" ");
    if (parsedLine[0] === "$") {
        switch (parsedLine[1]) {
            case "cd":
                cd(parsedLine[2]);
                break;
            case "ls":
                break;
        }
    } else if (parsedLine[0] === "dir") {
        mkdir(parsedLine[1]);
    } else {
        newFile(parsedLine[1], parseInt(parsedLine[0]));
    }
}

console.log(root);

const directorySizes: number[] = [];
const totalFileSize = (directory: Directory): number => {
    let size = 0;

    for (const file in directory.files) {
        size += directory.files[file];
    }

    for (const dir in directory.directories) {
        const directorySize = totalFileSize(directory.directories[dir]);
        size += directorySize;

        directorySizes.push(directorySize);
    }

    return size;
}

const rootSize = totalFileSize(root);

const smallestThatWorks = Math.min(...directorySizes.filter((x) => x >= 30000000 - (70000000 - rootSize)));
console.log(smallestThatWorks);