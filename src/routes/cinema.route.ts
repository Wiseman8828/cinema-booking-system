import express from 'express';
import { createCinema } from '../controllers/cinema.controller';

const router = express.Router();
router.post('/', createCinema);

export default router;