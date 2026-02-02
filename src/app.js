import express  from 'express';
import cors from 'cors';
import registerRoutes from './routes/index.js'

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'https://typing-speed-test-main.vercel.app',
    'http://localhost:5173'
  ]
}));

registerRoutes(app);

export default app;