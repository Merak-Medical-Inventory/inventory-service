import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteBrand } from '@db/entity/Brand/BrandDao';
import { deletePresentation } from '@db/entity/Presentation/PresentationDao';
import { deleteCategory } from '@db/entity/Category/CategoryDao';
import { deleteItem } from '@db/entity/Item/ItemDao';
import { deleteGeneralItem } from '@db/entity/GeneralItem/GeneralItemDao';

const connection = new Connection(typeOrmConfig);

const inventoryService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

let token : string;
let generalItemId : number;
let categoryId : number;
let brandId : number;
let presentationId : number;


beforeAll(async ()=>{
  await connection.create();

  const response = await authService.post("/auth/login").send({
    username: "superuser",
    password: "superuser",
  });
  token = response.body.data.token;

  const generalItemResponse = await inventoryService
    .post("/api/generalItem")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test general item",
      description: "test description",
    });
  generalItemId = parseInt(generalItemResponse.body.data.id);

  const categoryResponse = await inventoryService
    .post("/api/category")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test category",
      description: "test description",
    });
  categoryId = parseInt(categoryResponse.body.data.id);

  const brandResponse = await inventoryService
    .post("/api/brand")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test brand",
      description: "test description",
    });
  brandId = parseInt(brandResponse.body.data.id);

  const presentationResponse = await inventoryService
    .post("/api/presentation")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "test presentation",
      quantity: 10,
      measure: "ml",
      measure_value: 1,
    });
  presentationId = parseInt(presentationResponse.body.data.id);

})

afterAll(async ()=>{
    await deleteBrand(brandId);
    await deletePresentation(presentationId);
    await deleteCategory(categoryId);
    await deleteGeneralItem(generalItemId);
    await connection.close();
})

describe('Get All items',()=>{
    let itemId : number;

    beforeAll(async () => {
        const itemResponse = await inventoryService
        .post("/api/item")
        .set("Authorization", `Bearer ${token}`)
        .send({
            code: Math.floor(1000 + Math.random() * 9000).toString(),
            brand_code: Math.floor(1000 + Math.random() * 9000).toString(),
            generalItem: generalItemId,
            category: categoryId,
            brand: brandId,
            presentation: presentationId,
        });
        itemId = parseInt(itemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteItem(itemId)
    })


    it('Should get the items',async ()=>{
        const itemResponse = await inventoryService
        .get('/api/item')
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            code: expect.any(String),
            brand_code: expect.any(String),
            generalItem: expect.anything(),
            category: expect.anything(),
            brand: expect.anything(),
            presentation: expect.anything(),
        }
        expect(itemResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get item',()=>{
    let itemId : number;

    beforeAll(async () => {
        const itemResponse = await inventoryService
        .post("/api/item")
        .set("Authorization", `Bearer ${token}`)
        .send({
            code: Math.floor(1000 + Math.random() * 9000).toString(),
            brand_code: Math.floor(1000 + Math.random() * 9000).toString(),
            generalItem: generalItemId,
            category: categoryId,
            brand: brandId,
            presentation: presentationId,
        });
        itemId = parseInt(itemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteItem(itemId)
    })


    it('Should get a item by id',async ()=>{
        const itemResponse = await inventoryService
        .get(`/api/item/${itemId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : itemId,
            code: expect.any(String),
            brand_code: expect.any(String),
            generalItem: expect.anything(),
            category: expect.anything(),
            brand: expect.anything(),
            presentation: expect.anything(),
        }
        expect(itemResponse.body.data).toEqual(validationObject)
    })
})

describe('item creation',()=>{
    let itemId : number;

    afterAll(async ()=>{
       await deleteItem(itemId)
    })

    it('Should create a item',async ()=>{
        const itemResponse = await inventoryService
        .post("/api/item")
        .set("Authorization", `Bearer ${token}`)
        .send({
            code: Math.floor(1000 + Math.random() * 9000).toString(),
            brand_code: Math.floor(1000 + Math.random() * 9000).toString(),
            generalItem: generalItemId,
            category: categoryId,
            brand: brandId,
            presentation: presentationId,
        });
        itemId = parseInt(itemResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            code: expect.any(String),
            brand_code: expect.any(String),
            generalItem: expect.anything(),
            category: expect.anything(),
            brand: expect.anything(),
            presentation: expect.anything(),
        }
        expect(itemResponse.body.data).toEqual(validationObject)
    })
})

describe('Item edit',()=>{
    let itemId : number;

    beforeAll(async () => {
        const itemResponse = await inventoryService
        .post("/api/item")
        .set("Authorization", `Bearer ${token}`)
        .send({
            code: Math.floor(1000 + Math.random() * 9000).toString(),
            brand_code: Math.floor(1000 + Math.random() * 9000).toString(),
            generalItem: generalItemId,
            category: categoryId,
            brand: brandId,
            presentation: presentationId,
        });
        itemId = parseInt(itemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteItem(itemId)
    })

    it('Should update a item',async ()=>{
        const code =  Math.floor(1000 + Math.random() * 9000).toString()
        const brand_code = Math.floor(1000 + Math.random() * 9000).toString();
        const itemResponse = await inventoryService
        .put(`/api/item/${itemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            code,
            brand_code,
        });
        const validationObject = {
            id : expect.any(Number),
            code,
            brand_code,
        }
        expect(itemResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete item',()=>{
    let itemId : number;

    beforeAll(async () => {
        const itemResponse = await inventoryService
        .post("/api/item")
        .set("Authorization", `Bearer ${token}`)
        .send({
            code: Math.floor(1000 + Math.random() * 9000).toString(),
            brand_code: Math.floor(1000 + Math.random() * 9000).toString(),
            generalItem: generalItemId,
            category: categoryId,
            brand: brandId,
            presentation: presentationId,
        });
        itemId = parseInt(itemResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteItem(itemId)
    })

    it('Should delete a item',async ()=>{
        const itemResponse = await inventoryService
        .delete(`/api/item/${itemId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(itemResponse.body.statusCode).toBe(201)
    })
})