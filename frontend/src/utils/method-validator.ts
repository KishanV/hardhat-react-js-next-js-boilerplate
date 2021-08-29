import { NextApiRequest, NextApiResponse } from "next";

const errorMessage = "Method not allowed";
export function method(requiredMethod: string) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (requiredMethod !== req.method) {
      res.status(500).json({ error: errorMessage });
      throw Error(errorMessage);
    }
  };
}
