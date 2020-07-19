import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createCategoryCtrl,
    findCategoryCtrl,
    findAllCategoriesCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
} from '@controllers/Category';
import { createCategorySchema} from '@shared/joi/Category';
import { sessionCheck } from '@middlewares/sessionCheck';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createCategorySchema)], createCategoryCtrl);
router.get('/', [sessionCheck], findAllCategoriesCtrl);
router.get('/:id', [sessionCheck], findCategoryCtrl);
router.put('/:id', [sessionCheck, joiValidator(createCategorySchema)], updateCategoryCtrl);
router.delete('/:id', [sessionCheck], deleteCategoryCtrl);

export default router;
