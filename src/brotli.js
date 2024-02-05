import { BROTLI_ACTIONS } from "./constants.js";
import { checkThatExist, isExist } from "./utils.js";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export const brotli = async (pathToFile, pathToCompressedFile, action) => {
  await checkThatExist(pathToFile);
  const isCompressedExist = await isExist(pathToCompressedFile);
  if (!isCompressedExist) {
    const brotliStream = action === BROTLI_ACTIONS.COMPRESS ? createBrotliCompress() : createBrotliDecompress();

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToCompressedFile);

    await pipeline(readStream, brotliStream, writeStream);
  } else {
    throw new Error();
  }
};
