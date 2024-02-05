import { checkIsFile } from "./utils.js";
import fs from "fs/promises";

export const cd = async (path) => {
  try {
    const isFile = await checkIsFile(path);
    if (!isFile) {
      return path;
    }
  } catch (err) {
    throw new Error();
  }
};

export const ls = async (path) => {
  const directories = await fs.readdir(path, { withFileTypes: true });
  const sortedDirectories = directories
    .sort((a, b) => a.isFile() - b.isFile())
    .filter((item) => !item.isSymbolicLink());
  const result = sortedDirectories.map((item) => {
    return {
      Name: item.name,
      Type: item.isFile() ? "file" : "directory",
    };
  });
  console.table(result);
};
