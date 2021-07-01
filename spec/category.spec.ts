import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteCategory } from '@db/entity/Category/CategoryDao';

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

describe('Get All categorys',()=>{
    let categoryId : number;

    beforeAll(async () => {
        const categoryResponse = await inventoryService
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test category",
            description: "test category",
        });
        categoryId = parseInt(categoryResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteCategory(categoryId)
    })


    it('Should get the categorys',async ()=>{
        const categoryResponse = await inventoryService
        .get('/api/category')
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
        }
        expect(categoryResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get category',()=>{
    let categoryId : number;

    beforeAll(async () => {
        const categoryResponse = await inventoryService
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test category",
            description: "test description",
        });
        categoryId = parseInt(categoryResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteCategory(categoryId)
    })


    it('Should get a category by id',async ()=>{
        const categoryResponse = await inventoryService
        .get(`/api/category/${categoryId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : categoryId,
            name: "test category",
            description: "test description",
        }
        expect(categoryResponse.body.data).toEqual(validationObject)
    })
})

describe('category creation',()=>{
    let categoryId : number;

    afterAll(async ()=>{
       await deleteCategory(categoryId)
    })

    it('Should create a category',async ()=>{
        const categoryResponse = await inventoryService
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test category",
            description: "test description",
        });
        categoryId = parseInt(categoryResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name : 'test category',
            description : 'test description'
        }
        expect(categoryResponse.body.data).toEqual(validationObject)
    })
})

describe('category edit',()=>{
    let categoryId : number;

    beforeAll(async () => {
        const categoryResponse = await inventoryService
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test category",
            description: "test category",
        });
        categoryId = parseInt(categoryResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteCategory(categoryId)
    })

    it('Should update a category',async ()=>{
        const categoryResponse = await inventoryService
        .put(`/api/category/${categoryId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Updated category",
            description: "Updated description",
        });
        const validationObject = {
            id : categoryId,
            name: "Updated category",
            description: "Updated description",
        }
        expect(categoryResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete category',()=>{
    let categoryId : number;

    beforeAll(async () => {
        const categoryResponse = await inventoryService
        .post("/api/category")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test category",
            description: "test category",
        });
        categoryId = parseInt(categoryResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteCategory(categoryId)
    })

    it('Should delete a category',async ()=>{
        const categoryResponse = await inventoryService
        .delete(`/api/category/${categoryId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(categoryResponse.body.statusCode).toBe(201)
    })
})