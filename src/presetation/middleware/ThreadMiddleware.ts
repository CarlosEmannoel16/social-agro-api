import { Worker, isMainThread, workerData, parentPort } from "worker_threads";
import Pool from "worker-threads-pool";
import Os from "os";
import { Request, Response } from "express";

const maxCpus = Os.cpus().length;
const pool = new Pool({
  max: maxCpus,
});

export class Thread {
  constructor(private readonly exec: Promise<Function>) {}
  async handle(request: Request, response: Response) {
    try {
      if (!isMainThread) {
        const result = await this.exec.then((fn) => fn())
        parentPort?.postMessage(result);
      }

      return new Promise((resolve, reject) => {
        pool.acquire(__filename, { workerData }, (err, work) => {
          if (err)
            return response.status(500).json({ error: "Internal error" });

          work.on("message", (message) => {
            resolve(response.status(200).json(message));
          });
          work.on("error", (error) => {
            reject(response.status(500).json({ error: "Internal error" }));
          });
          work.on("exit", (code) => {
            if (code !== 0) {
              reject(response.status(500).json({ error: "Internal error" }));
            }
          });
        });
      });
    } catch (error) {
      return response.status(500).json({ error: "Internal error" });
    }
  }
}
