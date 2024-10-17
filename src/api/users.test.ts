import request from 'supertest';
import app from '../app';

describe('api', () => {
  let id: string;

  it('create user', async () => {
    const route = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        age: 25,
        hobbies: ['reading', 'gaming']
      });
    
    expect(route.status).toBe(201);
    expect(route.body).toHaveProperty('id');
    id = route.body.id;
  });

  it('get users', async () => {
    const route = await request(app).get('/api/users');
    
    expect(route.status).toBe(200);
    expect(route.body.length).toBeGreaterThan(0);
  });

  it('get user by id', async () => {
    const route = await request(app).get(`/api/users/${id}`);
    
    expect(route.status).toBe(200);
    expect(route.body).toHaveProperty('username', 'testuser');
  });

  it('update user', async () => {
    const route = await request(app)
      .put(`/api/users/${id}`)
      .send({
        username: 'updateduser',
        age: 30,
        hobbies: ['sports']
      });
    
    expect(route.status).toBe(200);
    expect(route.body).toHaveProperty('username', 'updateduser');
  });

  it('delete user', async () => {
    const route = await request(app).delete(`/api/users/${id}`);
    expect(route.status).toBe(204);

    const getUser = await request(app).get(`/api/users/${id}`);
    expect(getUser.status).toBe(404);
  });
});
