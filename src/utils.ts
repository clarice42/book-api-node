import { IncomingMessage } from "http";

export function getReqData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk): void => {
        body += chunk;
      });

      req.on("end", (): void => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
