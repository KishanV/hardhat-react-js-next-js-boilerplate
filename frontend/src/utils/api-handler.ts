import { NextApiRequest, NextApiResponse } from "next";

export function middleware(
  ...callbacks: ((req: NextApiRequest, res: NextApiResponse) => Promise<void>)[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      for (let index = 0; index < callbacks.length; index++) {
        await callbacks[index](req, res);
      }
    } catch (error) {
      console.error(error);
      try {
        res.status(500).json({ error: "Api Internal Error" });
      } catch (error) {
        console.error(error);
      }
    }
  };
}

console.log();
