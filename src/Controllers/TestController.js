import { z } from "zod";
import { promisePool } from "../DB/Database.js";
import {ErrorWithStatus} from "../ErrorWithStatus.js"

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

export const update = async (req, res, next) => {
  const schema = z.object({
    name: z.string().regex(/^[A-Z][a-z]*$/, {message: "Unsuccess update"}),
  });
  try {
    const data = schema.parse(req.body);
    const [result] = await promisePool.query("update test set name=? where id=? ", [
    data.name,
    req.params.id,
  ]);
    return res.status(200).json(result);
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

export const show = async (req, res, next) => {
  const schema = z.object ({
    id: z.string().regex(/^[0-9]+$/),
  });
  try {
    const data = schema.parse(req.params);
    const [results] = await promisePool.query("select * from test where id = ?", [data.id]);
    return res.status(200).json(results);

    // const id = req.params.id;
    // if(/^[0-9]+$/.test(id)){
    //   const [results] = await promisePool.query("select * from test where id = ?", [id]);
    // return res.status(200).json(results);
    // }else{
    //   throw new ErrorWithStatus(400, "id must be a integer");
    // }
    
    //get a single resource from the server status code 200
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const schema = z.object({
  id: z.string().regex(/^[0-9]+$/),
  });
  try {
    const data = schema.parse(req.params);
    const result = await promisePool.query("delete from test where id=?", [data.id]);
      return res.status(200).json("Successfully deletede...");
    //remove the record from the server status code 204
  } catch (error) {
    //pass the error for handled by the error handler middleware
    next(error);
  }
};
