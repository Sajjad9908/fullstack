import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { handleWebhook } from './controller/webhook.js';


const app = express();
await connectDB();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.post('/clerk',express.json(),handleWebhook)

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});