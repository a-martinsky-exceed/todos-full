const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let proxy = require('express-http-proxy');

const item = require('./routes/item.route');
const app = express();
const mongoose = require('mongoose');
let todo_db = 'mongodb://127.0.0.1:27017/todos';
mongoose.connect(todo_db, {useNewUrlParser: true, useUnifiedTopology: true} );
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/todos', item);


let port = 3001;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
