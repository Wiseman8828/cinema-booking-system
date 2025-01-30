import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../database/connection'
import Cinema from './Cinema';


class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
    id!: string;
    cinemaId!: string;
    seatNumber!: number;
    isBooked!: boolean
}

Seat.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        cinemaId: {
            type: DataTypes.UUID,
            references: { model: Cinema, key: 'id' }
        },
        seatNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isBooked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    { timestamps: true, sequelize, modelName: 'Seat' }
);

Cinema.hasMany(Seat, { foreignKey: 'cinemaId' });
Seat.belongsTo(Cinema, { foreignKey: 'cinemaId' });

export default Seat;