import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/auth/auth';
import { createItemCtrl, getItemCtrl, updateItemCtrl, getAllItemsCtrl, deleteItemCtrl } from '@controllers/Item';
import { createItemSchema, updateItemSchema } from '@shared/joi/Item';

const router = Router();

router.get('/', [sessionCheck], getAllItemsCtrl);
router.get('/:id', [sessionCheck], getItemCtrl);
router.post('/', [sessionCheck, joiValidator(createItemSchema)], createItemCtrl);
router.put('/:id', [sessionCheck, joiValidator(updateItemSchema)], updateItemCtrl);
router.delete('/:id', [sessionCheck], deleteItemCtrl);

export default router;
