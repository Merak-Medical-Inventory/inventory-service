import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { number } from '@hapi/joi';

const inventoryService : SuperTest<supertest.Test> = supertest(app)
const authService : SuperTest<supertest.Test> = supertest('http://localhost:3001/api');

const connection = new Connection(typeOrmConfig);

let adminToken : string;
let token : string;
let userId : number;
let generalItemId : number;
let categoryId : number;
let brandId : number;
let presentationId : number;
let itemId : number;
let providerId : number;
let deparmentId : Number;

const orderDerparmentValidationObject = {
    id : expect.any(Number),
}


beforeAll(async ()=>{
  await connection.create();

  const response = await authService.post("/auth/login").send({
    username: "superuser",
    password: "superuser",
  });
  adminToken = response.body.data.token;

  const userResponse = await authService.post("/auth/login").send({
    username: "medico",
    password: "medico",
  });
  token = userResponse.body.data.token;
  userId = parseInt(userResponse.body.data.response.id);
  deparmentId = parseInt(userResponse.body.data.response.department.id)

  const generalItemResponse = await inventoryService
    .post("/api/generalItem")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "test general item",
      description: "test description",
    });
  generalItemId = parseInt(generalItemResponse.body.data.id);

  const categoryResponse = await inventoryService
    .post("/api/category")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "test category",
      description: "test description",
    });
  categoryId = parseInt(categoryResponse.body.data.id);

  const brandResponse = await inventoryService
    .post("/api/brand")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "test brand",
      description: "test description",
    });
  brandId = parseInt(brandResponse.body.data.id);

  const presentationResponse = await inventoryService
    .post("/api/presentation")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "test presentation",
      quantity: 10,
      measure: "ml",
      measure_value: 1,
    });
  presentationId = parseInt(presentationResponse.body.data.id);

  const itemResponse = await inventoryService
    .post("/api/item")
    .set("Authorization", `Bearer ${adminToken}`)
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
    .set('Authorization',`Bearer ${adminToken}`)
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

describe('Create an order deparment',()=>{

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
                    amount : 5
                }]
            })
            orderId = response.body.data.id;

        expect(response.body.statusCode).toBe(200)
    })
})

describe('Get all order deparment',()=>{
    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.get('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should get all the orders', async ()=> {
        const response = await inventoryService.get(`/api/orderDepartment`)
            .set('Authorization',`Bearer ${adminToken}`)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining(orderDerparmentValidationObject)]))
    })

})

describe('Get an order deparment',()=>{
    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.post('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should get an order by id', async ()=> {
        const response = await inventoryService.get(`/api/orderDepartment/${orderId}`)
            .set('Authorization',`Bearer ${adminToken}`)
        expect(response.body.data).toEqual(expect.objectContaining(orderDerparmentValidationObject))
    })

})

describe('Get the actual stock to accept an order deparment',()=>{
    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.post('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should get an order by id', async ()=> {
        const response = await inventoryService.get(`/api/orderDepartment/stock/${orderId}`)
            .set('Authorization',`Bearer ${adminToken}`)
        const validationObject = {
            item : expect.anything(),
            orderAmount : expect.any(Number),
            actualAmount  : expect.any(Number),
            canSupply : expect.any(Boolean)
            
        }
        expect(response.body.data).toEqual(expect.arrayContaining([validationObject]))
    })

})

describe('Get order deparment by deparment',()=>{
    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.post('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should get order deparment by deparment id', async ()=> {
        const response = await inventoryService.get(`/api/orderDepartment/department/${deparmentId}`)
            .set('Authorization',`Bearer ${adminToken}`)
        console.log(response.body.data)
        expect(response.body.data).toEqual(expect.objectContaining(orderDerparmentValidationObject))    })

})


describe('Should update an order deparment',()=>{
    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.post('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should update an order deparment', async ()=> {
        const response = await inventoryService.put(`/api/orderDepartment/${orderId}`)
            .set('Authorization',`Bearer ${adminToken}`)
            .send({
                status : 'cancelado',
            })
        const validationObject = {
            ...orderDerparmentValidationObject,
            status : 'cancelado'
        }
        expect(response.body.data).toEqual(expect.objectContaining(validationObject))
    })

})


describe('approve order deparment',()=>{

    let orderId : number;

    beforeAll(async () => {
          const orderDeparmentResponse = await inventoryService.post('/api/orderDepartment')
          .set('Authorization',`Bearer ${token}`)
          .send({
              transmitter : userId,
              items : [{
                  id : itemId,
                  amount : 20
              }]
          })
          orderId = orderDeparmentResponse.body.data.id;

    })

    it('Should approve an order from a deparment', async ()=> {
        const response = await inventoryService.post(`/api/orderDepartment/department/${orderId}/accept`)
            .set('Authorization',`Bearer ${adminToken}`)
            .send({
                message : 'test order',
                sender : userId,
                items : [{
                    id : itemId,
                    amount : 20
                }]
            })
        expect(response.body.statusCode).toBe(200)
    })

})



