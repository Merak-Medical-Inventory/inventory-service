import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createLotsSchema } from '@shared/joi/Lot';
import { createLotsCtrl } from '@controllers/Lot';

const router = Router();

router.post('/',[sessionCheck,joiValidator(createLotsSchema)],createLotsCtrl);

export default router;