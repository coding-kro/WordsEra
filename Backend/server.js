import { app } from './src/app.js';
import 'dotenv/config';
import { connectDB } from './src/db/db.js';

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server running on port :', PORT);
});
