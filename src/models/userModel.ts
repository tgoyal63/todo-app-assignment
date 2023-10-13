import { Sequelize, Model, DataTypes } from "sequelize";

export default class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public token!: string;
}

/**
 * Defines the User model and maps it to the database table.
 * @param sequelize - The Sequelize instance.
 */
export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
    }
  );
  User.sync();
};
