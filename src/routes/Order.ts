import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createOrderSchema } from '@shared/joi/Order';
import { createOrderCtrl, getOrderByIdCtrl, getAllOrdersCtrl } from '@controllers/Order';

const router = Router();

router.get('/',[sessionCheck],getAllOrdersCtrl);
router.get('/:id',[sessionCheck],getOrderByIdCtrl);
router.post('/',[sessionCheck,joiValidator(createOrderSchema)],createOrderCtrl);

export default router;