import db from "../models";
import Todo, { TodoMap } from "../models/todoModel";
import bcrypt from "bcrypt";

/**
 * A class representing a Todo Service.
 */
class TodoService {
  /**
   * An array of project fields.
   */
  projectFields = [
    "title",
    "description",
    "completed",
    "id",
    "createdAt",
    "updatedAt",
  ];

  // Function for filtering project fields.
  filterProjectFields = (project: any) => {
    const filteredProject: any = {};
    this.projectFields.forEach((field) => {
      filteredProject[field] = project[field];
    });
    return filteredProject;
  };

  /**
   * Creates a new Todo for the given user.
   * @param userId - The ID of the user for whom the Todo is being created.
   * @param title - The title of the Todo.
   * @param description - The description of the Todo.
   * @param completed - The completion status of the Todo.
   * @returns The created Todo object.
   */
  async createTodo(
    userId: number,
    title: string,
    description: string,
    completed: boolean
  ) {
    TodoMap(db);
    const result = await Todo.create({
      userId,
      title,
      description,
      completed,
    });
    return result.dataValues ? this.filterProjectFields(result.dataValues): null;
  }

  /**
   * Gets all the Todos for the given user.
   * @param userId - The ID of the user for whom the Todos are being fetched.
   * @returns An array of Todo objects.
   */
  async getTodosByUserId(userId: number) {
    TodoMap(db);
    const result = await Todo.findAll({
      where: {
        userId: userId,
      },
      attributes: this.projectFields,
    });
    return result;
  }

  /**
   * Gets the Todo with the given ID.
   * @param id - The ID of the Todo to be fetched.
   * @returns The Todo object with the given ID.
   */
  async getTodoById(id: number) {
    TodoMap(db);
    const result = await Todo.findOne({
      where: {
        id: id,
      },
      attributes: this.projectFields,
    });
    return result?.dataValues ? this.filterProjectFields(result.dataValues): null;
  }

  /**
   * Updates the Todo with the given ID.
   * @param id - The ID of the Todo to be updated.
   * @param title - The new title of the Todo.
   * @param description - The new description of the Todo.
   * @param completed - The new completion status of the Todo.
   * @returns The number of rows affected by the update operation.
   */
  async updateTodoById(
    id: number,
    title: string,
    description: string,
    completed: boolean
  ) {
    TodoMap(db);
    const result = await Todo.update(
      {
        title,
        description,
        completed,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );
    return result[1][0]?.dataValues ? this.filterProjectFields(result[1][0].dataValues) : null;
  }

  /**
   * Deletes the Todo with the given ID.
   * @param id - The ID of the Todo to be deleted.
   * @returns The number of rows affected by the delete operation.
   */
  async deleteTodoById(id: number) {
    TodoMap(db);
    const result = await Todo.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }
}

export default new TodoService();
