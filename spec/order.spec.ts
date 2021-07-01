import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { number } from '@hapi/joi';

const inventoryService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

const connection = new Connection(typeOrmConfig);

let token : string;
let userId : number;
let generalItemId : number;
let categoryId : number;
let brandId : number;
let presentationId : number;
let itemId : number;
let providerId : number;

const orderValidationObject = {
    id : expect.any(Number),
    status : expect.any(String),
    date : expect.any(String),
    provider : expect.anything(),
    orderToItem : expect.arrayContaining([expect.anything()])
}


beforeAll(async ()=>{
  await connection.create();

  const response = await authService.post("/auth/login").send({
    username: "superuser",
    password: "superuser",
  });
  token = response.body.data.token;
  userId = parseInt(response.body.data.response.id);

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

  const providerResponse = await inventoryService.post("/api/provider")
    .set('Authorization',`Bearer ${token}`)
    .send({
        name: 'test provider',
        last_name: 'dummy',
        company: 'test company',
        phone_number: '04241235323',
        items : [itemId],
        description : 'test description',
        city : 'test city',
        country : 'test country',
        address : 'test address',
        email : 'test@mail.com'
    })
    providerId = parseInt(providerResponse.body.data.id);
})

afterAll(async () => {
    await connection.close()
})

describe('Create order',()=>{

    it('Should create an order', async ()=> {
        const response = await inventoryService.post('/api/order')
            .set('Authorization',`Bearer ${token}`)
            .send({
                user : userId,
                provider : providerId,
                items : [{
                    id : itemId,
                    amount : 20
                }]
            })

        expect(response.body.statusCode).toBe(200)
    })

})

describe('Get all orders',()=>{
    let orderId : number;

    beforeAll(async () =>{
        const response = await inventoryService.post('/api/order')
        .set('Authorization',`Bearer ${token}`)
        .send({
            user : userId,
            provider : providerId,
            items : [{
                id : itemId,
                amount : 20
            }]
        })
        orderId = parseInt(response.body.data.id);
    })

    it('Should get all the orders', async ()=> {
        const response = await inventoryService.get(`/api/order`)
            .set('Authorization',`Bearer ${token}`)
        expect(response.body.data).toEqual(expect.arrayContaining([orderValidationObject]))
    })

})

describe('Get an order',()=>{
    let orderId : number;

    beforeAll(async () =>{
        const response = await inventoryService.post('/api/order')
        .set('Authorization',`Bearer ${token}`)
        .send({
            user : userId,
            provider : providerId,
            items : [{
                id : itemId,
                amount : 20
            }]
        })
        orderId = parseInt(response.body.data.id);
    })

    it('Should get an order by id', async ()=> {
        const response = await inventoryService.get(`/api/order/${orderId}`)
            .set('Authorization',`Bearer ${token}`)
        expect(response.body.data).toEqual(orderValidationObject)
    })

})

describe('Approve an order',()=>{

    let orderId : number;

    beforeAll(async () => {
        const response = await inventoryService.post('/api/order')
        .set('Authorization',`Bearer ${token}`)
        .send({
            user : userId,
            provider : providerId,
            items : [{
                id : itemId,
                amount : 20
            }]
        })
        orderId = parseInt(response.body.data.id)
    })

    it('Should Approve an order', async ()=> {
        const response = await inventoryService.post('/api/lot')
            .set('Authorization',`Bearer ${token}`)
            .send({
                order : userId,
                items : [{
                    id: itemId,
                    dueDate : new Date().toISOString(),
                    amount : 20
                }]
            })

        expect(response.body.statusCode).toBe(200)
    })

})

describe('Update an order',()=>{
    let orderId : number; 

    beforeAll(async () =>{
        const response = await inventoryService.post('/api/order')
        .set('Authorization',`Bearer ${token}`)
        .send({
            user : userId,
            provider : providerId,
            items : [{
                id : itemId,
                amount : 20
            }]
        })
        orderId = parseInt(response.body.data.id);
    })

    it('Should update an order', async ()=> {
        const response = await inventoryService.put(`/api/order/${orderId}`)
            .set('Authorization',`Bearer ${token}`)
            .send({
                status : 'cancelado'
            })
        const validationObject = {
            id : expect.any(Number),
            status : 'cancelado',
            date : expect.any(String)
        }
        expect(response.body.data).toEqual(validationObject)
    })
})