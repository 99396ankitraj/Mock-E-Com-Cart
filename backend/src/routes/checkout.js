import { Router } from 'express';
import { postCheckout } from '../controllers/checkoutController.js';

const router = Router();
router.post('/', postCheckout);

export default router;
