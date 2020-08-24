import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createGeneralItemCtrl,
    findGeneralItemCtrl,
    findAllGeneralItemsCtrl,
    updateGeneralItemCtrl,
    deleteGeneralItemCtrl
} from '@controllers/GeneralItem';
import { createGeneralItemSchema} from '@shared/joi/GeneralItem';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createGeneralItemSchema)], createGeneralItemCtrl);
router.get('/', [sessionCheck], findAllGeneralItemsCtrl);
router.get('/:id', [sessionCheck], findGeneralItemCtrl);
router.put('/:id', [sessionCheck, joiValidator(createGeneralItemSchema)], updateGeneralItemCtrl);
router.delete('/:id', [sessionCheck], deleteGeneralItemCtrl);

export default router;
