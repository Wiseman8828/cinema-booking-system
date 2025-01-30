import request from 'supertest';
import app from '../app';
import sequelize from '../database/connection';


let cinemaId:any;
describe('Cinema API Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a cinema', async () => {
    const res = await request(app).post('/cinemas').send({ name:'Inox', seats: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('cinemaId');
    cinemaId = res.body.cinemaId;
  });
});

export { cinemaId };