const express = require('express');
const apiRouter = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', apiRouter);


if (process.env.NODE_ENV === 'production') {

    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

    app.listen(process.env.PORT || '80', () => {
        console.log(`Server (PROD) is running on port: ${process.env.PORT || '80'}`)
    })

} else {
    app.listen(process.env.PORT || '3000', () => {
        console.log(`Server (DEV) is running on port: ${process.env.PORT || '3000'}`)
    })
}

