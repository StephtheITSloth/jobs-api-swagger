require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const authMiddleware = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.enable('trust proxy')
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 100, //limit ip to 100 requests per windowMs
})
);
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth', authMiddleware,authRouter)
app.use('/api/v1/jobs', authMiddleware,jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
