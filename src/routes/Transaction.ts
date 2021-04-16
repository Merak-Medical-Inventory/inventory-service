import { Router } from 'express'
import { sessionCheck } from '@middlewares/auth/auth';
import { findAllTransactionCtrl, findBcTransactionCtrl } from '@controllers/Transaction';

const router = Router();

router.get('/', [sessionCheck], findAllTransactionCtrl);
router.get('/:id', [sessionCheck], findBcTransactionCtrl);

export default router;
