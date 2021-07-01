import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteBrand } from '@db/entity/Brand/BrandDao';

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

describe('Get All brands',()=>{
    let brandId : number;

    beforeAll(async () => {
        const brandResponse = await inventoryService
        .post("/api/brand")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test brand",
            description: "test brand",
        });
        brandId = parseInt(brandResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteBrand(brandId)
    })


    it('Should get the brands',async ()=>{
        const brandResponse = await inventoryService
        .get('/api/brand')
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
        }
        expect(brandResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get brand',()=>{
    let brandId : number;

    beforeAll(async () => {
        const brandResponse = await inventoryService
        .post("/api/brand")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test brand",
            description: "test description",
        });
        brandId = parseInt(brandResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteBrand(brandId)
    })


    it('Should get a brand by id',async ()=>{
        const brandResponse = await inventoryService
        .get(`/api/brand/${brandId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : brandId,
            name: "test brand",
            description: "test description",
        }
        expect(brandResponse.body.data).toEqual(validationObject)
    })
})

describe('Brand creation',()=>{
    let brandId : number;

    afterAll(async ()=>{
       await deleteBrand(brandId)
    })

    it('Should create a brand',async ()=>{
        const brandResponse = await inventoryService
        .post("/api/brand")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test brand",
            description: "test description",
        });
        brandId = parseInt(brandResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name : 'test brand',
            description : 'test description'
        }
        expect(brandResponse.body.data).toEqual(validationObject)
    })
})

describe('Brand edit',()=>{
    let brandId : number;

    beforeAll(async () => {
        const brandResponse = await inventoryService
        .post("/api/brand")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test brand",
            description: "test brand",
        });
        brandId = parseInt(brandResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteBrand(brandId)
    })

    it('Should update a brand',async ()=>{
        const brandResponse = await inventoryService
        .put(`/api/brand/${brandId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Updated brand",
            description: "Updated description",
        });
        const validationObject = {
            id : brandId,
            name: "Updated brand",
            description: "Updated description",
        }
        expect(brandResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete brand',()=>{
    let brandId : number;

    beforeAll(async () => {
        const brandResponse = await inventoryService
        .post("/api/brand")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test brand",
            description: "test brand",
        });
        brandId = parseInt(brandResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteBrand(brandId)
    })

    it('Should delete a brand',async ()=>{
        const brandResponse = await inventoryService
        .delete(`/api/brand/${brandId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(brandResponse.body.statusCode).toBe(201)
    })
})