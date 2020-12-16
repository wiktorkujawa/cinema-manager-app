const router = require('express').Router();
const axios = require('axios');
// File Model
const Movie = require('../../models/movie');

// Get movies list
router.get('/', (_, res) => {
  Movie.find()
    .sort({ title: 1 })
    .then(movies => res.json(movies))
});

// Get single Movie data
router.get('/:title', (req,res) =>{

  Movie.findOne({title:req.params.title}).then(movie => res.json(movie))
})

// Add movie to Cinema list
router.post('/', (req, res) => {
  const newMovie = new Movie({
      title: req.body.title,
      duration: req.body.duration,
      description: req.body.description,
      poster: req.body.poster
    })
    newMovie.save() 
    .then( movie => res.status(201).json(movie))
    .catch((err) => {
      if(err.code == 11000){
          return res.status(409).json({msg: "Movie with this title already exists"})
      }
      else return res.status(404).json({msg: err.errors.title.message})
    })
  });

// Delete movie from Cinema list

router.delete('/:title', (req, res) => {
  Movie.findOneAndDelete({title: req.params.title})
  .then(() => res.json({ msg: `Movie removed from Cinema list` }))
  .catch(err => res.status(404).json({ error: err }));
});

router.get('/search/:title', (req,res) => {
    var options = {
      method: 'GET',
      url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
      params: {s: req.params.title, page: '1', r: 'json'},
      headers: {
        'x-rapidapi-key': process.env.rapidApiKey,
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    };
  axios.request(options).then( (response) => {
    res.status(200).json(response.data);
  }).catch( (error) => {
    res.status(404).json(error);
  });
});

// Update movie data
router.put('/:title', async (req, res) => {
  const title = req.params.title;
    Movie.findOneAndUpdate( {title: title }, {
      title: req.body.title,
      duration: req.body.duration,
      poster: req.body.poster,
      description: req.body.description
    })
    .then( () => res.status(201).json(req.body) )
    .catch( () =>
      res.status(400).json({ error: 'Unable to update the title' })
    );
  });

module.exports = router;