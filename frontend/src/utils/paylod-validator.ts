import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

export function payload(schema: Joi.AnySchema) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const value = schema.validate(req.body);
    if (value.error) {
      console.error(value);
      res.status(500).json({ error: value.error.message });
      throw Error("Payload is not valid");
    }
  };
}
