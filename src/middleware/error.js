import { ZodError } from "zod";
import { ErrorWithStatus } from "../ErrorWithStatus.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ZodError) {
    console.log("zod error");
    return res.status(400).json(err.errors);
  }
  if (err instanceof ErrorWithStatus) {
    console.log("error with status");
    return res.status(err.status).json({ message: err.message });
  }
  if (err.status) {
    return res.status(err.status).json(err);
  } else {
    res.status(500).json(err.message);
  }
};

export default errorHandler;
