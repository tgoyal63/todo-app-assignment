import request from 'supertest';
import app from '../src';
import Todo from '../src/models/todoModel';
import db from '../src/models';

describe('Todo endpoints', () => {
    let todo: Todo;
    let token: string;

    beforeEach(async () => {
        // Login user
        const res = await request(app).post('/api/v1/users/login').send({
            username: "tgoyal63",
            password: "tgoyal63",
        });
        token = res.body.token;

        // Create a todo
        await request(app).post('/api/v1/todos').set('Authorization', `Bearer ${token}`).send({
            title: 'Test Todo',
            description: 'Test Todo Description',
            completed: false,
        });

        // Get the todo
        const todoRes = await request(app).get('/api/v1/todos').set('Authorization', `Bearer ${token}`);
        todo = todoRes.body[0];
    });

    it('should get all todos', async () => {
        const res = await request(app).get('/api/v1/todos').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a todo by id', async () => {
        const res = await request(app).get(`/api/v1/todos/${todo.id}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(todo.title);
    });

    it('should create a todo', async () => {
        const res = await request(app).post('/api/v1/todos').set('Authorization', `Bearer ${token}`).send({
            title: 'Test Todo 2',
            description: 'Test Todo Description 2',
            completed: false,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual('Test Todo 2');
    });

    it('should update a todo', async () => {
        const res = await request(app).put(`/api/v1/todos/${todo.id}`).set('Authorization', `Bearer ${token}`).send({
            title: 'Test Todo 2',
            description: 'Test Todo Description 2',
            completed: false,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Todo updated successfully');
        expect(res.body.todo.title).toEqual('Test Todo 2');
    });

    it('should delete a todo', async () => {
        const res = await request(app).delete(`/api/v1/todos/${todo.id}`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Todo deleted successfully');
    });

    it('should not get a todo with an invalid id', async () => {
        const res = await request(app).get('/api/v1/todos/1000000').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Todo with id 1000000 not found');
    });

    it('should not update a todo with an invalid id', async () => {
        const res = await request(app).put('/api/v1/todos/1000000').set('Authorization', `Bearer ${token}`).send({
            title: 'Test Todo 2',
            description: 'Test Todo Description 2',
            completed: false,
        });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Todo with id 1000000 not found');
    });

    it('should not delete a todo with an invalid id', async () => {
        const res = await request(app).delete('/api/v1/todos/1000000').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Todo with id 1000000 not found');
    });

    afterAll(async () => {
        await db.close();
        await app.listen().close();
    });
});
