import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteGeneralItem } from '@db/entity/GeneralItem/GeneralItemDao';

const connection = new Connection(typeOrmConfig);

const inventoryService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

let token : string;

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

describe('Get All item',()=>{
    let generalItemId : number;

    beforeAll(async () => {
        const generalItemResponse = await inventoryService
        .post("/api/generalItem")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalItemId = parseInt(generalItemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralItem(generalItemId)
    })


    it('Should get all general item',async ()=>{
        const generalItemResponse = await inventoryService
        .get(`/api/generalItem`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
        }
        expect(generalItemResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get general item',()=>{
    let generalItemId : number;

    beforeAll(async () => {
        const generalItemResponse = await inventoryService
        .post("/api/generalItem")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalItemId = parseInt(generalItemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralItem(generalItemId)
    })


    it('Should get a general item by id',async ()=>{
        const generalItemResponse = await inventoryService
        .get(`/api/generalItem/${generalItemId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : generalItemId,
            name: "test general item",
            description: "test description",
        }
        expect(generalItemResponse.body.data).toEqual(validationObject)
    })
})

describe('General item creation',()=>{
    let generalItemId : number;

    afterAll(async ()=>{
       await deleteGeneralItem(generalItemId)
    })

    it('Should create a general item',async ()=>{
        const generalItemResponse = await inventoryService
        .post("/api/generalItem")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalItemId = parseInt(generalItemResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name : 'test general item',
            description : 'test description'
        }
        expect(generalItemResponse.body.data).toEqual(validationObject)
    })
})

describe('General item edit',()=>{
    let generalItemId : number;

    beforeAll(async () => {
        const generalItemResponse = await inventoryService
        .post("/api/generalItem")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalItemId = parseInt(generalItemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralItem(generalItemId)
    })

    it('Should update a general item',async ()=>{
        const generalItemResponse = await inventoryService
        .put(`/api/generalItem/${generalItemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Updated general item",
            description: "Updated description",
        });
        const validationObject = {
            id : generalItemId,
            name: "Updated general item",
            description: "Updated description",
        }
        expect(generalItemResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete general item',()=>{
    let generalItemId : number;

    beforeAll(async () => {
        const generalItemResponse = await inventoryService
        .post("/api/generalItem")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "test general item",
        description: "test description",
        });
        generalItemId = parseInt(generalItemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteGeneralItem(generalItemId)
    })

    it('Should delete a general item',async ()=>{
        const generalItemResponse = await inventoryService
        .delete(`/api/generalItem/${generalItemId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : generalItemId,
            name: "Updated general item",
            description: "Updated description",
        }
        expect(generalItemResponse.body.statusCode).toBe(201)
    })
})