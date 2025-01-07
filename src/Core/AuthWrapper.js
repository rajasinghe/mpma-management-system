import { jwtVerify } from "jose";
import { AcessLevel, User } from "../models/index.js";
import { ErrorWithStatus } from "../ErrorWithStatus.js";
import { any } from "zod";

export const Auth = async (permissions = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        throw new ErrorWithStatus(401, "NO_TOKEN");
      }
      //check the token is valid
      const { payload, headers } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.AUTH_SECRET)
      );
      //check the token is not blocked
      //get the user with the access levels
      const user = await User.findByPk(payload.user_id, {
        include: [AcessLevel],
      });
      req.user = user.dataValues;
      if (user.type == "SUPERADMIN") {
        return next();
      }

      if (user.status == "SUSPENDED") {
        throw new ErrorWithStatus(403, "SUSPENDED");
      }

      const allowedPermisions = user.dataValues.accessLevels.filter((accessLevel) => {
        //console.log("accessLevel", accessLevel);
        if (permissions.includes(accessLevel.dataValues.access)) {
          return true;
        } else {
          return false;
        }
      });

      if (allowedPermisions && allowedPermisions.length == 0) {
        throw new ErrorWithStatus(403, "NO_PERMISSION");
      }
      next();
      //check if user has the required access levels
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        next(error);
      } else {
        next(new ErrorWithStatus(401, "AUTHENTICATION_FAILED"));
      }
    }
  };
};

const verifyToken = () => {};
