import { Request, Response } from 'express';
import Seat from '../models/Seat';
import { Transaction } from 'sequelize';
import sequelize from '../database/connection';

export const purchaseSeat:any = async (req: Request, res: Response) => {
    const { cinemaId, seatNumber } = req.params;
    const transaction = await sequelize.transaction();

    try {
        const seat = await Seat.findOne({ where: { cinemaId, seatNumber }, lock: Transaction.LOCK.UPDATE, transaction });
        if (!seat) return res.status(404).json({ error: 'Seat not found' });
        if (seat.isBooked) return res.status(400).json({ error: 'Seat already booked' });

        seat.isBooked = true;
        await seat.save({ transaction });
        await transaction.commit();
        res.json({ seat });
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        res.status(500).json({ error: 'Purchase failed' });
    }
};


export const purchaseConsecutiveSeats:any = async (req: Request, res: Response) => {
    const { cinemaId } = req.params;
    const transaction = await sequelize.transaction();

    try {
        const seats = await Seat.findAll({ where: { cinemaId, isBooked: false }, order: [['seatNumber', 'ASC']], lock: Transaction.LOCK.UPDATE, transaction });
        for (let i = 0; i < seats.length - 1; i++) {
            if (seats[i + 1].seatNumber === seats[i].seatNumber + 1) {
                seats[i].isBooked = true;
                seats[i + 1].isBooked = true;
                await seats[i].save({ transaction });
                await seats[i + 1].save({ transaction });
                await transaction.commit();
                return res.json({ seats: [seats[i], seats[i + 1]] });
            }
        }
        await transaction.rollback();
        res.status(400).json({ error: 'No two consecutive seats available' });
    } catch (error) {
        await transaction.rollback();
        console.log(error)
        res.status(500).json({ error: 'Purchase failed' });
    }
};
