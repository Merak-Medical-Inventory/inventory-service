import { Router } from 'express';
import CategoryRouter from './Category'
import PresentationRouter from './Presentation'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/category', CategoryRouter);
router.use('/presentation', PresentationRouter);
// Export the base-router
export default router;
