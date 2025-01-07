import { z } from "zod";
import { promisePool } from "../DB/Database.js";

export const store = async (req, res, next) => {
  const schema = z.object({
    name: z.string().regex(/^[A-Z][a-z]*$/, { message: "invalid value for name" }),
  });
  try {
    const data = schema.parse(req.body);
    const [result] = await promisePool.query("insert into test(name) values(?) ", [data.name]);
    return res.status(201).json(result);
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};

export const update = (req, res, next) => {
  try {
    return true;
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};

export const index = async (req, res, next) => {
  try {
    const [results] = await promisePool.query("select * from test");
    return res.status(200).json(results);
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};

export const show = (req, res, next) => {
  try {
    //get a single resource from the server status code 200
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};

export const remove = (req, res, next) => {
  try {
    //remove the record from the server status code 204
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};
