import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import Item from '@db/entity/Item/Item';
import Presentation from '@db/entity/Presentation/Presentation';


const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "merak-inventory.czdwqkwpxkdi.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "merak-inventory",
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