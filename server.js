const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/', require('./routes/web/root'));

const PORT = config.get('port') || 5009;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
            // Since 6th version Mongoose behaves as this attributes above are always true;
        })
        app.listen(PORT, () => console.log('App started on port ' + PORT));
    } catch (e) {
        console.log('Server Error !!', e.message)
        process.exit(1);
    }
}

start();
