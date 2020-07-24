import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createBrandCtrl,
    findBrandCtrl,
    findAllBrandsCtrl,
    updateBrandCtrl,
    deleteBrandCtrl
} from '@controllers/Brand';
import { createBrandSchema} from '@shared/joi/Brand';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createBrandSchema)], createBrandCtrl);
router.get('/', [sessionCheck], findAllBrandsCtrl);
router.get('/:id', [sessionCheck], findBrandCtrl);
router.put('/:id', [sessionCheck, joiValidator(createBrandSchema)], updateBrandCtrl);
router.delete('/:id', [sessionCheck], deleteBrandCtrl);

export default router;
