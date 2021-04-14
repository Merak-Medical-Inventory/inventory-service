import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import {
    createOrderDepartmentSchema,
    updateOrderDepartmentSchema,
    acceptOrderDepartmentSchema,
    findDepartmentsOrderSchema, findItemsDepartmentsOrderSchema
} from '@shared/joi/OrderDepartment';
import {
    createOrderDepartmentCtrl,
    getOrderDepartmentByIdCtrl,
    getAllOrderDepartmentsCtrl,
    updateOrderDepartmentCtrl,
    getOrdersByDeparmentIdCtrl,
    acceptOrdenDeparmentCtrl,
    getActualStockForOrderByCtrl,
    findDepartmentsOrderCtrl, findItemsDepartmentOrderCtrl
} from '@controllers/OrderDepartment';

const router = Router();

router.get('/',[sessionCheck],getAllOrderDepartmentsCtrl);
router.get('/:id',[sessionCheck],getOrderDepartmentByIdCtrl);
router.get('/department/:id',[sessionCheck],getOrdersByDeparmentIdCtrl)
router.get('/stock/:id',[sessionCheck],getActualStockForOrderByCtrl)
router.post('/department/:id/accept',[sessionCheck, joiValidator(acceptOrderDepartmentSchema)],acceptOrdenDeparmentCtrl);
router.post('/',[sessionCheck,joiValidator(createOrderDepartmentSchema)],createOrderDepartmentCtrl);
router.put('/:id',[sessionCheck,joiValidator(updateOrderDepartmentSchema)],updateOrderDepartmentCtrl);
router.post('/departmentStats', [sessionCheck,joiValidator(findDepartmentsOrderSchema)],findDepartmentsOrderCtrl);
router.post('/itemStats', [sessionCheck,joiValidator(findItemsDepartmentsOrderSchema)],findItemsDepartmentOrderCtrl);

export default router;
