import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteProvider } from '@db/entity/Provider/ProviderDao';
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
let itemId : number;


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
    await deleteBrand(brandId);
    await deletePresentation(presentationId);
    await deleteCategory(categoryId);
    await deleteItem(itemId);
    await deleteGeneralItem(generalItemId);
    await connection.close();
})

describe('Get All provider',()=>{
    let providerId : number;

    beforeAll(async () => {
        const providerResponse = await inventoryService
        .post("/api/provider")
        .set("Authorization", `Bearer ${token}`)
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
        });
        providerId = parseInt(providerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteProvider(providerId)
    })


    it('Should get the providers',async ()=>{
        const providerResponse = await inventoryService
        .get('/api/provider')
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : expect.any(Number),
            name: expect.any(String),
            last_name: expect.any(String),
            company: expect.any(String),
            phone_number: expect.any(String),
            items : [expect.anything()],
            description : expect.any(String),
            city : expect.any(String),
            country : expect.any(String),
            address : expect.any(String),
            email : expect.any(String)
        }
        expect(providerResponse.body.data).toEqual(expect.arrayContaining([validationObject]))
    })
})

describe('Get provider',()=>{
    let providerId : number;

    beforeAll(async () => {
        const providerResponse = await inventoryService
        .post("/api/provider")
        .set("Authorization", `Bearer ${token}`)
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
        });
        providerId = parseInt(providerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteProvider(providerId)
    })


    it('Should get a provider by id',async ()=>{
        const providerResponse = await inventoryService
        .get(`/api/provider/${providerId}`)
        .set("Authorization", `Bearer ${token}`)
        const validationObject = {
            id : providerId,
            name: 'test provider',
            last_name: 'dummy',
            company: 'test company',
            phone_number: '04241235323',
            items : [expect.anything()],
            description : 'test description',
            city : 'test city',
            country : 'test country',
            address : 'test address',
            email : 'test@mail.com'
        }
        expect(providerResponse.body.data).toEqual(validationObject)
    })
})

describe('Provider creation',()=>{
    let providerId : number;

    afterAll(async ()=>{
       await deleteProvider(providerId)
    })

    it('Should create a provider',async ()=>{
        const providerResponse = await inventoryService
        .post("/api/provider")
        .set("Authorization", `Bearer ${token}`)
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
        });
        providerId = parseInt(providerResponse.body.data.id);
        const validationObject = {
            id : expect.any(Number),
            name: 'test provider',
            last_name: 'dummy',
            company: 'test company',
            phone_number: '04241235323',
            items : [expect.anything()],
            description : 'test description',
            city : 'test city',
            country : 'test country',
            address : 'test address',
            email : 'test@mail.com'
        }
        expect(providerResponse.body.data).toEqual(validationObject)
    })
})

describe('provider edit',()=>{
    let providerId : number;

    beforeAll(async () => {
        const providerResponse = await inventoryService
        .post("/api/provider")
        .set("Authorization", `Bearer ${token}`)
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
        });
        providerId = parseInt(providerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteProvider(providerId)
    })

    it('Should update a provider',async ()=>{
        const providerResponse = await inventoryService
        .put(`/api/provider/${providerId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: 'Updated provider',
            last_name: 'Updated',
            company: 'Updated',
            phone_number: '042412354323',
            items : [itemId],
            description : 'updated description',
            city : 'Updated city',
            country : 'Updated country',
            address : 'Updated address',
            email : 'Updated@mail.com'
        });
        const validationObject = {
            id : providerId,
            name: 'Updated provider',
            last_name: 'Updated',
            company: 'Updated',
            phone_number: '042412354323',
            description : 'updated description',
            city : 'Updated city',
            country : 'Updated country',
            address : 'Updated address',
            email : 'Updated@mail.com'
        }
        expect(providerResponse.body.data).toEqual(validationObject)
    })
})

describe('Delete provider',()=>{
    let providerId : number;

    beforeAll(async () => {
        const providerResponse = await inventoryService
        .post("/api/provider")
        .set("Authorization", `Bearer ${token}`)
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
        });
        providerId = parseInt(providerResponse.body.data.id);
    })

    afterAll(async ()=>{
       await deleteProvider(providerId)
    })

    it('Should delete a provider',async ()=>{
        const providerResponse = await inventoryService
        .delete(`/api/provider/${providerId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(providerResponse.body.statusCode).toBe(201)
    })
})