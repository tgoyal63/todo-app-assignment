import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { checkExist } from "../utils/auth";
const jwtSecret = process.env.JWT_SECRET as Secret;

/**
 * Middleware to verify the authorization token in the request header.
 */
class AuthMiddleware {
  /**
   * Verifies the authorization token in the request header.
   * @param {Request & { user?: any }} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {Response} - Returns a response object with status 401 if the token is invalid or missing.
   */
  static async verifyToken(
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!(req.headers && req.headers.authorization)) {
        throw new Error("No authorization header found");
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("No token found");
      const decoded = await jwt.verify(token, jwtSecret) as any;
      const data = await checkExist("id", decoded.id.toString());
      if (data && token === data.token) {
        req.user = data;
        next();
      } else throw new Error("Invalid token");
    } catch (error) {
      console.log({error});
      return res.status(401).send({ message: "Unauthorized" });
    }
  }
}

export default AuthMiddleware;

export const verifyToken = AuthMiddleware.verifyToken;
