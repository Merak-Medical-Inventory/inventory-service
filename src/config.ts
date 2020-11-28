import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import Item from '@db/entity/Item/Item';
import Presentation from '@db/entity/Presentation/Presentation';
import GeneralItem from "@entity/GeneralItem/GeneralItem";
import Provider from "@entity/Provider/Provider";
import User from '@db/entity/user/User';
import Order from '@db/entity/Order/Order';
import OrderToItem from '@db/entity/OrderToItem/OrderToItem';
import privilege from '@db/entity/Privilege/Privilege';
import Rol from '@db/entity/Rol/Rol';
import Department from '@db/entity/Department/Department';
import { Lot } from '@db/entity/Lot/Lot';
import Stock from '@db/entity/Stock/Stock';
import LotToStock from '@db/entity/LotToStock/LotToStock';
import Inventory from '@db/entity/Inventory/Inventory';
import OrderDepartment from "@entity/OrderDepartment/OrderDepartment";
import OrderDepartmentToItem from "@entity/OrderDepartmentToItem/OrderDepartmentToItem";


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
        GeneralItem,
        Item,
        Presentation,
        Provider,
        User,
        Order,
        OrderToItem,
        privilege,
        Rol,
        Department,
        Lot,
        Stock,
        LotToStock,
        Inventory,
        OrderDepartment,
        OrderDepartmentToItem
    ]
};

export { typeOrmConfig };
