import { connect } from 'mongoose';
import { config } from 'dotenv';
import './modules/deps';

config();

connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to database ${process.env.MONGO_URI}`))
  .catch((error) => console.log(error.message ?? 'Unable to connect to db'));
