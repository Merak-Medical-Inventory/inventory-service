import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { getInventoryByIdCtrl } from '@controllers/Inventory';

const router = Router();

router.get('/:id',[sessionCheck],getInventoryByIdCtrl);

export default router;
