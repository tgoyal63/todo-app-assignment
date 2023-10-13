import { UserMap } from "./userModel";
import { TodoMap } from "./todoModel";
import db from "../utils/db";

/**
 * This object contains the Sequelize instance and the models for User and Todo.
 * @typedef {Object} db
 * @property {Sequelize} sequelize - The Sequelize instance.
 * @property {User} User - The User model.
 * @property {Todo} Todo - The Todo model.
 */
export const User = UserMap(db);
export const Todo = TodoMap(db);
export default db;
