import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validation";

/**
 * Express middleware that handles errors and sends an appropriate response to the client.
 * @param {Error} err - The error object passed by Express.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error for debugging purposes
  console.error({ err });
  if (err instanceof ValidationError) {
    const { message, statusCode, details } = err;
    if (details.headers) {
      return res
        .status(statusCode)
        .json({ message, headers: details.headers[0].message });
    } else if (details.body) {
      return res
        .status(statusCode)
        .json({ message, body: details.body[0].message });
    } else if (details.params) {
      return res
        .status(statusCode)
        .json({ message, params: details.params[0].message });
    } else if (details.query) {
      return res
        .status(statusCode)
        .json({ message, query: details.query[0].message });
    } else {
      return res.status(statusCode).json({ message });
    }
  }
  // Send the error response to the client
  return res.status(500).json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    },
  });
}
