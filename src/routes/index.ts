import { Router } from 'express';
import CategoryRouter from './Category'
import PresentationRouter from './Presentation'
import BrandRouter from './Brand'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/category', CategoryRouter);
router.use('/presentation', PresentationRouter);
router.use('/brand', BrandRouter);
// Export the base-router
export default router;
