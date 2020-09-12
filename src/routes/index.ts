import { Router } from 'express';
import CategoryRouter from './Category';
import PresentationRouter from './Presentation';
import BrandRouter from './Brand';
import GeneralItemRouter from './GeneralItem';
import ItemRouter from './Item';
import ProviderRouter from './Provider';
import OrderRouter from './Order';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/category', CategoryRouter);
router.use('/presentation', PresentationRouter);
router.use('/brand', BrandRouter);
router.use('/generalItem', GeneralItemRouter);
router.use('/item', ItemRouter);
router.use('/provider', ProviderRouter);
router.use('/order',OrderRouter);
// Export the base-router
export default router;
