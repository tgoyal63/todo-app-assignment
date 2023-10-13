import { Request, Response } from "express";
import TodoService from "../services/todoService";

/**
 * Controller class for handling CRUD operations on Todo items
 */
class TodoController {
  /**
   * Creates a new Todo item for the authenticated user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {ReqBody} req.body - Request body containing Todo item details
   * @param {Response} res - Express Response object
   * @returns {Response} Created Todo item
   */
  async create(req: Request & { user?: any }, res: Response) {
    const userId = Number(req.user.id);
    const { title, description, completed } = req.body;
    try {
      const todo = await TodoService.createTodo(
        userId,
        title,
        description,
        completed
      );
      return res.status(201).json(todo);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: "Error creating todo" });
    }
  }

  /**
   * Gets all Todo items for the authenticated user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {Response} res - Express Response object
   * @returns {Response} Array of Todo items
   */
  async getAll(req: Request & { user?: any }, res: Response) {
    const userId = Number(req.user.id);
    try {
      const todos = await TodoService.getTodosByUserId(userId);
      console.log({ todos });
      if (todos.length === 0) throw new Error("No todos found");
      return res.status(200).json(todos);
    } catch (error: any) {
      console.log({ error });
      if (error.message) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Error getting todos" });
      }
    }
  }

  /**
   * Gets a single Todo item by ID for the authenticated user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {ParamsDictionary} req.params.id - ID of the Todo item to retrieve
   * @param {Response} res - Express Response object
   * @returns {Response} Retrieved Todo item
   */
  async getOne(req: Request & { user?: any }, res: Response) {
    const id = Number(req.params.id);
    try {
      const todo = await TodoService.getTodoById(id);
      if (!todo) throw new Error(`Todo with id ${id} not found`);
      return res.status(200).json(todo);
    } catch (error: any) {
      console.log({ error });
      if (error.message === "Unauthorized") {
        return res.status(401).json({ message: error.message });
      } else if (error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Error getting todo" });
      }
    }
  }

  /**
   * Updates a single Todo item by ID for the authenticated user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {ParamsDictionary} req.params.id - ID of the Todo item to update
   * @param {ReqBody} req.body - Request body containing Todo item details
   * @param {Response} res - Express Response object
   * @returns {Response} Updated Todo item
   */
  async update(req: Request & { user?: any }, res: Response) {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;
    console.log(req.body);
    try {
      const todo = await TodoService.updateTodoById(
        id,
        title,
        description,
        completed
      );
      if (!todo) throw new Error(`Todo with id ${id} not found`);
  
      return res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error: any) {
      console.log({ error });
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Error updating todo" });
    }
  }

  /**
   * Deletes a single Todo item by ID for the authenticated user
   * @param {Request & { user?: any }} req - Express request object with user object attached
   * @param {ParamsDictionary} req.params.id - ID of the Todo item to delete
   * @param {Response} res - Express Response object
   * @returns {Response} Deleted Todo item
   */
  async delete(req: Request & { user?: any }, res: Response) {
    const id = Number(req.params.id);
    try {
      const todo = await TodoService.deleteTodoById(id);
      if (!todo) throw new Error(`Todo with id ${id} not found`);
      return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error: any) {
      console.log({ error });
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Error deleting todo" });
    }
  }
}

export default new TodoController();
