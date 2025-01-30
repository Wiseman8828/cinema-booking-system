import request from 'supertest';
import app from '../app';
import { cinemaId } from './cinema.test';

describe('Seat API Tests', () => {
    it('should purchase a specific seat', async () => {
        const res = await request(app).post(`/seats/${cinemaId}/purchase/3`);
        expect(res.status).toBe(200);
        expect(res.body.seat.isBooked).toBe(true);
    });

    it('should purchase two consecutive seats', async () => {
        const res = await request(app).post(`/seats/${cinemaId}/purchase-consecutive`);
        expect(res.status).toBe(200);
        expect(res.body.seats.length).toBe(2);
    });

    it('should not allow double booking of a seat', async () => {
        await request(app).post('/seats/1/purchase/3');
        const res = await request(app).post(`/seats/${cinemaId}/purchase/3`);
        expect(res.status).toBe(400);
    });
});


describe('Concurrent Seat Booking', () => {
    it('should allow only one booking for the same seat', async () => {

        const seatNumber = 5;
        const results = await Promise.all([
            request(app).post(`/seats/${cinemaId}/purchase/${seatNumber}`),
            request(app).post(`/seats/${cinemaId}/purchase/${seatNumber}`),
            request(app).post(`/seats/${cinemaId}/purchase/${seatNumber}`)
        ]);

        // One request should succeed, others should fail
        const successfulRequests = results.filter(res => res.status === 200);
        const failedRequests = results.filter(res => res.status === 400);

        expect(successfulRequests.length).toBe(1);
        expect(failedRequests.length).toBeGreaterThan(0);
    });
});