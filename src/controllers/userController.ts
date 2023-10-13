import { Request, Response } from "express";
import UserService from "../services/userService";
import { signToken, validateUser } from "../utils/auth";

/**
 * Controller class for user related operations
 */
class UserController {
  /**
   * Registers a new user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Response} Returns the newly created user object
   */
  async register(req: Request, res: Response) {
    try {
      req.body.username = req.body.username.toLowerCase();
      req.body.email = req.body.email.toLowerCase();
      const { username, email, password } = req.body;
      const user = await UserService.createUser(username, email, password);
      const token = await signToken(user.id);
      await UserService.updateUserTokenById(user.id, token);
      return res.status(201).json({ token, username, email });
    } catch (error: any) {
      console.log({ error });
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "User already exists" });
      } else if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Error registering user" });
      }
    }
  }

  /**
   * Logs in a user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Response} Returns the JWT token for the logged in user
   */
  async login(req: Request, res: Response) {
    try {
      const { token } = await validateUser(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      console.log({ error });
      if (error.message === "Invalid password") {
        return res.status(401).json({ message: error.message });
      } else if (error.message.includes("does not exist")) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Error logging in user" });
      }
    }
  }

  /**
   * Gets the profile of a user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {Response} res - Express response object
   * @returns {Response} Returns the user profile data
   */
  async profile(req: Request & { user?: any }, res: Response) {
    try {
      const data = await UserService.searchByEntity("id", req.user.id);
      return res.status(200).json(data);
    } catch (error: any) {
      console.log({ error });
      if (error.message === "User with id does not exist") {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Error getting user profile" });
      }
    }
  }

  /**
   * Deletes a user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {Response} res - Express response object
   * @returns {Response} Returns a success message
   */
  async delete(req: Request & { user?: any }, res: Response) {
    try {
      const data = await UserService.deleteUserById(req.user.id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: "Error deleting user" });
    }
  }
}

export default new UserController();
