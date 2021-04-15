import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import {createOrderSchema, findItemsOrderStatsSchema, updateOrderSchema} from '@shared/joi/Order';
import {
    createOrderCtrl,
    getOrderByIdCtrl,
    getAllOrdersCtrl,
    updateOrderCtrl,
    findItemsOrderStatsCtrl
} from '@controllers/Order';

const router = Router();

router.get('/',[sessionCheck],getAllOrdersCtrl);
router.get('/:id',[sessionCheck],getOrderByIdCtrl);
router.post('/',[sessionCheck,joiValidator(createOrderSchema)],createOrderCtrl);
router.put('/:id',[sessionCheck,joiValidator(updateOrderSchema)],updateOrderCtrl);
router.post('/stats', [sessionCheck,joiValidator(findItemsOrderStatsSchema)],findItemsOrderStatsCtrl);

export default router;
