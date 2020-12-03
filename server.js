const path = require('path');
require('dotenv').config();

const movies = require('./routes/api/movies');
const halls = require('./routes/api/halls');

const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());

app.use(cors());

mongoose 
  .connect(process.env.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }) // Adding new mongo url parser 
  .then(() => console.log('MongoDB Connected...')) 
  .catch(err => console.log(err)); 


app.use('/api/halls', halls);
app.use('/api/movies', movies);


app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'dist/index.html')) 
}); 

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));