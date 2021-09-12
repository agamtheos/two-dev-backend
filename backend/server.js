import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose.connect(config.MONGODB_URL, {
  userNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to Database');
})
.catch((error) => {
  console.log(error.reason || error);
});
// connect express server
const app = express();
// using cors to prevent blocked policy
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'Validation Error' ? 400 : 500;
  res.status(status).send({message: err.message});
});
app.listen(config.PORT, () => {
  console.log('running on http://localhost:6000');
});