import {Router} from "express";
import {sessionCheck} from "@middlewares/auth/auth";
import {joiValidator} from "@middlewares/joi";
import {outputItemStockSchema, updateStockSchema} from "@shared/joi/Stock";
import {outputItemStockCtrl, updateStockCtrl} from "@controllers/Stock";

const router = Router();

router.put('/:id', [sessionCheck, joiValidator(updateStockSchema)], updateStockCtrl);
router.put('/output/:id', [sessionCheck, joiValidator(outputItemStockSchema)], outputItemStockCtrl);

export default router;
