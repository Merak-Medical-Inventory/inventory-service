import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';

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

describe('Order',()=>{

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
                    itemId,
                    dueDate : new Date().toISOString(),
                    amount : 20
                }]
            })

        expect(response.body.statusCode).toBe(200)
    })

})

describe('Create and approve order deparment',()=>{

    let token : string;
    let userId : number;
    let orderId : number;

    beforeAll(async () => {
        const response = await authService.post("/auth/login").send({
            username: "medico",
            password: "medico",
          });
          token = response.body.data.token;
          userId = parseInt(response.body.data.response.id);
    })

    it('Should create an order from a deparment', async ()=> {
        const response = await inventoryService.post('/api/orderDepartment')
            .set('Authorization',`Bearer ${token}`)
            .send({
                transmitter : userId,
                items : [{
                    id : itemId,
                    amount : 20
                }]
            })
            orderId = response.body.data.id;

        expect(response.body.statusCode).toBe(200)
    })

    it('Should approve an order from a deparment', async ()=> {
        const response = await inventoryService.post(`/api/orderDepartment/department/${orderId}/accept`)
            .set('Authorization',`Bearer ${token}`)
            .send({
                message : 'test order',
                senderId : userId,
                items : [{
                    id : itemId,
                    amount : 20
                }]
            })

        expect(response.body.statusCode).toBe(200)
    })

})

