import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export const reqAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const user = await User.findOne({
        token: token,
        deleted: false,
      }).select("-password");
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auth Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
