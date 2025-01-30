import express from 'express';
import { purchaseSeat, purchaseConsecutiveSeats } from '../controllers/seat.controller';

const router = express.Router();
router.post('/:cinemaId/purchase/:seatNumber', purchaseSeat);
router.post('/:cinemaId/purchase-consecutive', purchaseConsecutiveSeats);

export default router;