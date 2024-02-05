import { getUsername, sayHello, sayGoodbye, parseInput, validateCommand } from "./utils.js";
import path from "path";
import { cd, ls } from "./nwd.js";

import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "url";
import os from "os";
import { MESSAGES } from "./constants.js";
import { add, cat, copyFile, moveFile, removeFile, renameFile } from "./files.js";
import { system } from "./system.js";

export class App {
  start = async () => {
    this._username = getUsername();
    this._currentDir = os.homedir();

    sayHello(this._username);

    process.on("exit", () => sayGoodbye(this._username));

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    while (true) {
      const input = await rl.question(`You are currently in ${this._currentDir}\n`);
      const [command, ...args] = parseInput(input);
      if (command) {
        try {
          await this.runCommand(command, args);
        } catch (err) {
          //   console.log(err);
          console.log(MESSAGES.OPERATION_FAILED);
        }
      }
    }
  };

  _resolvePath = (newPath) => {
    return path.resolve(this._currentDir, newPath);
  };

  runCommand = async (command, args) => {
    if (validateCommand(command, args)) {
      await this[command](args);
    } else {
      console.log(MESSAGES.INVALID_INPUT);
    }
  };

  up = async () => {
    const pathToUpperDirectory = this._resolvePath("..");
    this._currentDir = await cd(pathToUpperDirectory);
  };

  cd = async (args) => {
    const pathToDirectory = this._resolvePath(args[0]);
    this._currentDir = await cd(pathToDirectory);
  };

  ls = async () => {
    await ls(this._currentDir);
  };

  cat = async (args) => {
    const pathToFile = this._resolvePath(args[0]);
    await cat(pathToFile);
  };

  add = async (args) => {
    const newFileName = this._resolvePath(args[0]);
    await add(newFileName);
  };

  cp = async (args) => {
    const pathToOldFile = this._resolvePath(args[0]);
    const pathToNewFile = this._resolvePath(args[1]);
    await copyFile(pathToOldFile, pathToNewFile);
  };

  rm = async (args) => {
    const pathToFile = this._resolvePath(args[0]);
    await removeFile(pathToFile);
  };

  rn = async (args) => {
    const pathToOldFile = this._resolvePath(args[0]);
    const pathToNewFile = this._resolvePath(args[1]);
    await renameFile(pathToOldFile, pathToNewFile);
  };

  mv = async (args) => {
    const pathToOldFile = this._resolvePath(args[0]);
    const pathToNewFile = this._resolvePath(args[1]);
    await moveFile(pathToOldFile, pathToNewFile);
  };

  os = (args) => {
    system(args[0]);
  };
}
