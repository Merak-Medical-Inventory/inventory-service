import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createProviderCtrl, getProviderCtrl, updateProviderCtrl, getAllProvidersCtrl, deleteProviderCtrl } from '@controllers/Provider';
import { createProviderSchema, updateProviderSchema } from '@shared/joi/Provider';

const router = Router();

router.get('/', [sessionCheck], getAllProvidersCtrl);
router.get('/:id', [sessionCheck], getProviderCtrl);
router.post('/', [sessionCheck, joiValidator(createProviderSchema)], createProviderCtrl);
router.put('/:id', [sessionCheck, joiValidator(updateProviderSchema)], updateProviderCtrl);
router.delete('/:id', [sessionCheck], deleteProviderCtrl);

export default router;
