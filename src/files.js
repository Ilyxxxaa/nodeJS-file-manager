import { checkThatExist, isExist } from "./utils.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile, rm, rename } from "fs/promises";
import { pipeline } from "stream/promises";

export const cat = async (path) => {
  await checkThatExist(path);
  const readable = createReadStream(path, "utf-8");

  readable.pipe(process.stdout);

  const streamPromise = new Promise((res, rej) => {
    readable.on("end", res);
    readable.on("error", rej);
  });
  await streamPromise;
};

export const add = async (path) => {
  await writeFile(path, "", { flag: "wx" });
};

export const copyFile = async (oldPath, newPath) => {
  await checkThatExist(oldPath);
  const newPathExist = await isExist(newPath);
  if (!newPathExist) {
    const readable = createReadStream(oldPath);
    const writable = createWriteStream(newPath);
    await pipeline(readable, writable);
  } else {
    throw new Error();
  }
};

export const removeFile = async (path) => {
  await rm(path);
};

export const renameFile = async (oldPath, newPath) => {
  const newPathExist = await isExist(newPath);
  if (!newPathExist) {
    await rename(oldPath, newPath);
  } else {
    throw new Error();
  }
};

export const moveFile = async (oldPath, newPath) => {
  await copyFile(oldPath, newPath);
  await removeFile(oldPath);
};
