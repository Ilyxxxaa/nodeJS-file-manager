import fs from "fs/promises";

export const getUsername = () => {
  const lastArg = process.argv[process.argv.length - 1];
  const username = lastArg.replace("--username=", "").trim() || "Anonymous User";
  return username;
};

export const sayHello = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const sayGoodbye = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const parseInput = (input) => {
  return input.split(" ");
};

export const validateCommand = (command, args) => {
  switch (command) {
    case ".exit":
    case "up":
    case "ls":
      return true;

    case "cd":
    case "cat":
    case "os":
    case "hash":
    case "rm":
      if (args[0]) {
        return true;
      }

    case "mv":
    case "cp":
    case "compress":
    case "decompress":
      if (args[0] && args[1]) {
        return true;
      }

    case "add":
      if (args[0] && isPathToFile(args[0])) {
        return true;
      }

    case "rn":
      if (args[0] && args[1] && isPathToFile(args[1])) {
        return true;
      }

    default:
      return false;
  }
};

export const isExist = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
};

export const isPathToFile = (filename) => {
  const regExp = /\/|\\/g;
  return !regExp.test(filename);
};

export const checkThatExist = async (path) => {
  try {
    return await fs.stat(path);
  } catch {
    throw new Error();
  }
};

export const checkIsFile = async (path) => {
  try {
    const pathStat = await fs.stat(path);
    const isFile = pathStat.isFile();
    return isFile;
  } catch {
    throw new Error();
  }
};
