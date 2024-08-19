const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const connection = require('./config/db');
const taskRouter = require('./routes/task.route');
const userRouter = require('./routes/user.route');
// const limiter = require('./middlewares/rateLimiter.middleware');
const adminRouter = require('./routes/admin.route');
const checkDisabled = require('./middlewares/checkDisabled.middleware');
const cors = require('cors');
const boardRouter = require('./routes/board.route');

app.use(express.json());
// app.use(limiter);
app.use(cors())
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/admin', adminRouter);
app.use('/boards',boardRouter);
app.use(checkDisabled);

app.get('/', (req, res) => {
    res.status(200).send("Server is running fine");
});



app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running at ${PORT} & Database connected successfully`);
    } catch (error) {
        console.log('Error connecting to database', error)
    }

})