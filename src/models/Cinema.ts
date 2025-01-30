import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../database/connection'

class Cinema extends Model<InferAttributes<Cinema>, InferCreationAttributes<Cinema>> {
  id!: string;
  name!: string;
  seats!: number;
}

Cinema.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { sequelize, modelName: 'Cinema' }
);

export default Cinema;