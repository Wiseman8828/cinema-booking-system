import express, { Application, Request, Response }from 'express';
import sequelize from './database/connection'
import cinema from "./routes/cinema.route";
import seat from "./routes/seat.route";
import * as dotenv from 'dotenv';
dotenv.config();

const app: Application = express()
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.get("/", (req:Request,res:Response) => {
    res.send('hello')
});

app.use("/cinemas", cinema);
app.use("/seats", seat);


if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      await sequelize.sync()
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
      })
    } catch (error: any) {
      console.error('Failed to start the server:', error.stack || error);
      process.exit(1);
    }
  })();
};

export default app;
