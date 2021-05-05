import { Router } from 'express'
import { sessionCheck } from '@middlewares/auth/auth';
import {findAllTransactionCtrl, findBcTransactionCtrl, findInventoryTransactionsCtrl} from '@controllers/Transaction';

const router = Router();

router.get('/', [sessionCheck], findAllTransactionCtrl);
router.get('/:id', [sessionCheck], findBcTransactionCtrl);
router.get('/inventory/:id', [sessionCheck], findInventoryTransactionsCtrl)

export default router;
