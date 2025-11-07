import { Router } from 'express';
import { deleteCartItem, getCartItems, postCart } from '../controllers/cartController.js';

const router = Router();
router.get('/', getCartItems);
router.post('/', postCart);
router.delete('/:id', deleteCartItem);

export default router;
