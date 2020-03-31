const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@apad.com",
                whatsapp: "4700000000",
                city: "Sobral",
                uf: "CE"
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
            
    });
});
