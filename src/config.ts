import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import Item from '@db/entity/Item/Item';
import Presentation from '@db/entity/Presentation/Presentation';


const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [
        Brand,
        Category,
        Item,
        Presentation,
    ]
};

export { typeOrmConfig };