import { connect } from 'mongoose';
import { config } from 'dotenv';
import './modules/app';

config();

if (!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI) {
  console.log('Some environment variables have not been declared.')
  process.kill(1); 
}

connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to database ${process.env.MONGO_URI}`))
  .catch((error) => console.log(error.message ?? 'Unable to connect to db'));
