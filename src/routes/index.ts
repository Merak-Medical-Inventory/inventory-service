import { Router } from 'express';
import CategoryRouter from './Category'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/category', CategoryRouter);

// Export the base-router
export default router;
