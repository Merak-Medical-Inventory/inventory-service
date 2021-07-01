import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deletePresentation } from '@db/entity/Presentation/PresentationDao';

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

describe('Get All presentation',()=>{
    let presentationId : number;

    beforeAll(async () => {
        const presentationResponse = await inventoryService
        .post("/api/presentation")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        });
        presentationId = parseInt(presentationResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deletePresentation(presentationId)
    })


    it('Should get the presentations',async ()=>{
        const presentationResponse = await inventoryService
        .get('/api/presentation')
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            quantity: expect.any(Number),
            measure : expect.any(String),
            measure_value : expect.any(Number)
        }
        expect(presentationResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get presentation',()=>{
    let presentationId : number;

    beforeAll(async () => {
        const presentationResponse = await inventoryService
        .post("/api/presentation")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        });
        presentationId = parseInt(presentationResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deletePresentation(presentationId)
    })


    it('Should get a presentation by id',async ()=>{
        const presentationResponse = await inventoryService
        .get(`/api/presentation/${presentationId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : presentationId,
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        }
        expect(presentationResponse.body.data).toEqual(validationObject)
    })
})

describe('presentation creation',()=>{
    let presentationId : number;

    afterAll(async ()=>{
       await deletePresentation(presentationId)
    })

    it('Should create a presentation',async ()=>{
        const presentationResponse = await inventoryService
        .post("/api/presentation")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        });
        console.log(presentationResponse.body)
        presentationId = parseInt(presentationResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        }
        expect(presentationResponse.body.data).toEqual(validationObject)
    })
})

describe('presentation edit',()=>{
    let presentationId : number;

    beforeAll(async () => {
        const presentationResponse = await inventoryService
        .post("/api/presentation")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        });
        presentationId = parseInt(presentationResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deletePresentation(presentationId)
    })

    it('Should update a presentation',async ()=>{
        const presentationResponse = await inventoryService
        .put(`/api/presentation/${presentationId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Updated presentation",
            quantity: 10,
            measure : 'mg',
            measure_value : 50
        });
        const validationObject = {
            id : presentationId,
            name: "Updated presentation",
            quantity: 10,
            measure : 'mg',
            measure_value : 50
        }
        expect(presentationResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete presentation',()=>{
    let presentationId : number;

    beforeAll(async () => {
        const presentationResponse = await inventoryService
        .post("/api/presentation")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test presentation",
            quantity: 6,
            measure : 'ml',
            measure_value : 250
        });
        presentationId = parseInt(presentationResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deletePresentation(presentationId)
    })

    it('Should delete a presentation',async ()=>{
        const presentationResponse = await inventoryService
        .delete(`/api/presentation/${presentationId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(presentationResponse.body.statusCode).toBe(201)
    })
})