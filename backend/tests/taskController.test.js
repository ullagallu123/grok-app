const request = require('supertest');
const app = require('../app');
const pool = require('../config/db');

describe('Task Controller', () => {
  beforeAll(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT)');
  });

  afterAll(async () => {
    await pool.query('DROP TABLE tasks');
    await pool.end();
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Desc' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });
});