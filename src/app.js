import express  from 'express';
import cors from 'cors';
import registerRoutes from './routes/index.js'

const app = express();

app.use(express.json());
app.use(cors());

registerRoutes(app);

export default app;