import request from "supertest";
import app from "../src/index";

describe("User Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/users/register").send({
      username: "newtestuser",
      email: "newtestuser@email.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual("newtestuser");
    expect(res.body.email).toEqual("newtestuser@email.com");
    expect(res.body).toHaveProperty("token");
  });

  it("should not create a new user with an existing username", async () => {
    const res = await request(app).post("/api/v1/users/register").send({
      username: "newtestuser",
      email: "newtestuser2@gmail.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toEqual("User already exists");
  });

  it("should not create a new user with an existing email", async () => {
    const res = await request(app).post("/api/v1/users/register").send({
      username: "newtestuser2",
      email: "newtestuser@gmail.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toEqual("User already exists");
  });

  it("should not create a new user with an invalid email", async () => {
    const res = await request(app).post("/api/v1/users/register").send({
      username: "newtestuser2",
      email: "newtestusergmail.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Failed");
    expect(res.body.body).toEqual('"email" must be a valid email');
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      username: "newtestuser",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login the user with an invalid password", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      username: "newtestuser",
      password: "password1234",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Invalid password");
  });

  it("should not login the user with an invalid username", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      username: "newtestuser3",
      password: "password123",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual(
      "User with username newtestuser3 does not exist"
    );
  });

  it("should not login the user with an invalid email", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "newtestuser3@gmail.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual(
      "User with email newtestuser3@gmail.com does not exist"
    );
  });

  it("should get the user profile", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      username: "newtestuser",
      password: "password123",
    });
    const res = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual("newtestuser");
  });

  it("should delete the user", async () => {
    const login = await request(app).post("/api/v1/users/login").send({
      username: "newtestuser",
      password: "password123",
    });
    const res = await request(app)
      .delete("/api/v1/users/delete")
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("User deleted successfully");
  });
});
