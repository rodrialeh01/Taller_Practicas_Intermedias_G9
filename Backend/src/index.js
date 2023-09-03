const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 4000;

const indexRouter = require('./routes/indexRouter');

const app = express();

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(morgan('dev'));

app.use("/api", indexRouter);

app.listen(port, () => {
    console.log(`Servidor ejecutandos en el puerto: ${port}`);
})

module.exports=app;