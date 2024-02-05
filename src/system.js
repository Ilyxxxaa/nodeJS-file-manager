import os from "os";
import { MESSAGES } from "./constants.js";

export const system = (command) => {
  switch (command) {
    case "--EOL":
      console.log(`System EOL: ${JSON.stringify(os.EOL)}`);
      break;

    case "--cpus":
      const cpus = os.cpus().map((cpu) => {
        console.log(cpu);
        return {
          Model: cpu.model.trim(),
          ClockRate: `${cpu.speed / 1000} GHz`,
        };
      });
      console.log(`Amount of CPUS is ${cpus.length}`);
      console.table(cpus);
      break;

    case "--homedir":
      console.log(`Homedir: ${os.homedir()}`);
      break;

    case "--username":
      console.log(`Username: ${os.userInfo().username}`);
      break;

    case "--architecture":
      console.log(`Process architecture: ${process.arch}`);
      break;

    default:
      console.log(MESSAGES.INVALID_INPUT);
  }
};
