import { Request, Response } from 'express';
import Cinema from '../models/Cinema';
import Seat from '../models/Seat';
const { v4: uuidv4 } = require('uuid');

export const createCinema = async (req: Request, res: Response) => {
  try {
    let { seats, name } = req.body;
    const cinema = await Cinema.create({ id: uuidv4(), name, seats });
    const seatEntries = Array.from({ length: seats }, (_, i) => (
      {
        cinemaId: cinema.id,
        id: uuidv4(),
        seatNumber: i + 1,
        isBooked: false
      }
    ));
    await Seat.bulkCreate(seatEntries);
    res.json({ cinemaId: cinema.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create cinema' });
  }
};