import jwt from "jsonwebtoken";
import UserService from "../services/userService";
import bcrypt from "bcrypt";
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET not set");
}

interface UserData {
  username?: string;
  email?: string;
  password: string;
}

export const signToken = (id: string) => {
  const token = jwt.sign({ id }, jwtSecret, { expiresIn: "9999 years" });
  return token;
};

export const checkExist = async (entity: string, entityValue: string) => {
  const data = await UserService.searchByEntity(entity, entityValue, 1);
  return data;
};

export const checkUser = async (data: UserData) => {
  let user;
  if (data.hasOwnProperty("username") && data.username)
    user = await checkExist("username", data.username.toLowerCase());
  else if (data.hasOwnProperty("email") && data.email)
    user = await checkExist("email", data.email.toLowerCase());
  if (!user)
    throw new Error(
      `User with ${data.hasOwnProperty("username") ? "username" : "email"} ${
        data.username ?? data.email
      } does not exist`
    );
  return user;
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isPasswordValid = await bcrypt.compareSync(password, hashedPassword);
  return isPasswordValid;
};

export const validateUser = async (data: UserData) => {
  const user = await checkUser(data);
  const isPasswordValid = await checkPassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};
