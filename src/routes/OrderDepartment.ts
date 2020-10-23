import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createOrderDepartmentSchema, updateOrderDepartmentSchema } from '@shared/joi/OrderDepartment';
import { createOrderDepartmentCtrl, getOrderDepartmentByIdCtrl, getAllOrderDepartmentsCtrl, updateOrderDepartmentCtrl } from '@controllers/OrderDepartment';

const router = Router();

router.get('/',[sessionCheck],getAllOrderDepartmentsCtrl);
router.get('/:id',[sessionCheck],getOrderDepartmentByIdCtrl);
router.post('/',[sessionCheck,joiValidator(createOrderDepartmentSchema)],createOrderDepartmentCtrl);
router.put('/:id',[sessionCheck,joiValidator(updateOrderDepartmentSchema)],updateOrderDepartmentCtrl);

export default router;
