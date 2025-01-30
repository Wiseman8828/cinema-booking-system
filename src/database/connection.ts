import { Sequelize } from 'sequelize'
import { dbCredentials } from '../config'

const sequelize = new Sequelize(
    dbCredentials().database,
    dbCredentials().user,
    dbCredentials().password,
    {
        host: dbCredentials().host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
)

export default sequelize
