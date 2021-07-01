import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { response } from 'express';
import { array } from '@hapi/joi';

const connection = new Connection(typeOrmConfig);

const inventoryService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

let token : string;
const inventoryId = 1;

beforeAll(async ()=>{
    await connection.create()
    const response = await authService.post("/auth/login").send({
        username: "superuser",
        password: "superuser",
    });
    token = response.body.data.token;
})

afterAll(async ()=>{
    await connection.close()
})

describe('Get all inventory',()=>{
    it('Should return the inventory',async () =>{
        const inventoryResponse = await inventoryService
        .get("/api/inventory")
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name : expect.any(String),
            description : expect.any(String),
        }
        expect(inventoryResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get inventory',()=>{
    it('Should return the inventory by id',async () =>{
        const inventoryResponse = await inventoryService
        .get(`/api/inventory/${inventoryId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name : expect.any(String),
            description : expect.any(String),
            stock : expect.arrayContaining([expect.anything()])
        }
        expect(inventoryResponse.body.data).toEqual(validationObject)
    })
})