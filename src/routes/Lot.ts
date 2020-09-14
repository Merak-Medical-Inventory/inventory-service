import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createLotsSchema } from '@shared/joi/Lot';
import { createLotsCtrl, getAllLotsCtrl, getLotByIdCtrl } from '@controllers/Lot';

const router = Router();

router.get('/',[sessionCheck],getAllLotsCtrl);
router.get('/:id',[sessionCheck],getLotByIdCtrl);
router.post('/',[sessionCheck,joiValidator(createLotsSchema)],createLotsCtrl);

export default router;