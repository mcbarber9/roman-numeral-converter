import request from 'supertest';
import { startServer } from '../server.js';

describe('Roman Numeral API', () => {
    let api;

    beforeAll(async () => {
        api = await startServer();
    });

    afterAll(async () => {
        await api?.close();
    });

    it('should return a Roman numeral for valid input', async () => {
        const response = await request(api).get('/romannumeral?query=5');
        expect(response.status).toBe(200);
        expect(response.body.output).toBe('V');
    });

    it('should return an error for invalid input', async () => {
        const response = await request(api).get('/romannumeral?query=abc');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a number between 1 and 3999.');
    });

    it('should handle numbers out of range gracefully', async () => {
        const response = await request(api).get('/romannumeral?query=5000');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a number between 1 and 3999.');
    });
});
