import {Router} from "express";
import {sessionCheck} from "@middlewares/auth/auth";
import {joiValidator} from "@middlewares/joi";
import {updateStockSchema} from "@shared/joi/Stock";
import {updateStockCtrl} from "@controllers/Stock";

const router = Router();

router.put('/:id', [sessionCheck, joiValidator(updateStockSchema)], updateStockCtrl);

export default router;
