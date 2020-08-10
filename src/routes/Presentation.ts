import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createPresentationCtrl,
    findPresentationCtrl,
    findAllPresentationsCtrl,
    updatePresentationCtrl,
    deletePresentationCtrl
} from '@controllers/Presentation';
import { createPresentationSchema} from '@shared/joi/Presentation';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createPresentationSchema)], createPresentationCtrl);
router.get('/', [sessionCheck], findAllPresentationsCtrl);
router.get('/:id', [sessionCheck], findPresentationCtrl);
router.put('/:id', [sessionCheck, joiValidator(createPresentationSchema)], updatePresentationCtrl);
router.delete('/:id', [sessionCheck], deletePresentationCtrl);

export default router;
