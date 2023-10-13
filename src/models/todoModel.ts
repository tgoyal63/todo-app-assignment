import { Sequelize, Model, DataTypes } from "sequelize";

export default class Todo extends Model {
  public userId!: number;
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

/**
 * Initializes the Todo model and maps it to the "todos" table in the database.
 * @param {Sequelize} sequelize - The Sequelize instance to use for creating the model.
 * @returns {void}
 */
export const TodoMap = (sequelize: Sequelize) => {
  Todo.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        }
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "todos",
      timestamps: true,
    }
  );
  Todo.sync();
};
