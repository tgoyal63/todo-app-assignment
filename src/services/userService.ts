import db from "../models";
import User, { UserMap } from "../models/userModel";
import bcrypt from "bcrypt";

/**
 * A class representing a user service.
 */
class UserService {
  /**
   * An array of project fields.
   */
  projectFields = ["username", "email"];

  /**
   * Creates a new user with the given username, email and password.
   * @param username - The username of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The created user object.
   */
  async createUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    UserMap(db);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return result.dataValues;
  }

  /**
   * Searches for a user by the given entity and entity value.
   * @param entity - The entity to search by (username, email or id).
   * @param entityValue - The value of the entity to search for.
   * @param sensitive - Whether to include sensitive fields (password, token, id) in the result.
   * @returns The found user object.
   * @throws If the entity is invalid.
   */
  async searchByEntity(
    entity: string,
    entityValue: string,
    sensitive: number = 0
  ) {
    const allowedEntities = ["username", "email", "id"];
    if (!allowedEntities.includes(entity)) throw new Error("Invalid entity");
    let localProjectFields = this.projectFields;
    if (sensitive) {
      localProjectFields = [...localProjectFields, "password", "token", "id"];
    }
    UserMap(db);
    const result = await User.findOne({
      where: {
        [entity]: entityValue,
      },
      attributes: localProjectFields,
    });
    return result?.dataValues;
  }

  /**
   * Updates a user with the given id, username, email and password.
   * @param id - The id of the user to update.
   * @param username - The new username of the user.
   * @param email - The new email of the user.
   * @param password - The new password of the user.
   * @returns The updated rows.
   */
  async updateUserById(
    id: number,
    username: string,
    email: string,
    password: string
  ) {
    UserMap(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.update(
      {
        username,
        email,
        password: hashedPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return result;
  }

  /**
   * Updates a user's token with the given id and token.
   * @param id - The id of the user to update.
   * @param token - The new token of the user.
   * @returns The updated rows.
   */
  async updateUserTokenById(id: number, token: string) {
    UserMap(db);
    const result = await User.update(
      {
        token,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return result;
  }

  /**
   * Deletes a user with the given id.
   * @param id - The id of the user to delete.
   * @returns The deleted rows.
   */
  async deleteUserById(id: number) {
    UserMap(db);
    const result = await User.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }
}

export default new UserService();
