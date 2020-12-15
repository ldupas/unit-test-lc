const request = require('supertest');
const app = require('../src/app');
const {closeConnection, query} = require('../src/db_connection');

describe('user', () =>{
    const user = {
        name: "louis"
    };

    beforeAll(async (done) => {
        const sql = "INSERT INTO user SET ?";
        const res = await query(sql, user);

        expect(res.insertId).toBe(1);
        done();
    })

    afterAll(async (done) => {
        const sql = "TRUNCATE TABLE user";
        await query(sql);
        await closeConnection();
        done();
    })

    it('GET should return an array with 1 element in it', async(done) => {
        const res = await request(app)
        .get('/api/users')
        .expect(200);
        expect(parseInt(res.body.length)).toEqual(1);
        done();
    })

    it('my POST should return {id: 1, name: "pierre"}', async(done) => {
        const res = await request(app)
        .post('/api/users')
        .send({name: "pierre"})
        .expect(201);
    expect(res.body.id).toBe(2);
    expect(res.body.name).toEqual("pierre");
    done();
    })

    it('My PUT route modification should return {id: 1, name: "Leonard"}', async(done) => {
        const res = await request(app)
        .put('/api/users/1')
        .send({name: "Leonard"})
        .expect(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toEqual("Leonard");
    done();
    })

    it('MyDelete should only return a 200 status', async(done) => {
        const res = await request(app)
        .delete('/api/users/2')
        .expect(200)
        done();
    })
});