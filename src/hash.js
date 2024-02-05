import { createHash } from "crypto";
import { createReadStream } from "fs";

export const createHashForFile = async (path) => {
  const hash = createHash("sha256");
  const readStream = createReadStream(path);
  readStream.pipe(hash);
  const streamPromise = new Promise((resolve, reject) => {
    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
  await streamPromise;
  console.log(`Hash for ${path} is: ${hash.digest("hex")}`);
};
