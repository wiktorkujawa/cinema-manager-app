const router = require('express').Router();
const axios = require('axios');
// File Model
const Movie = require('../../models/movie');

// Get movies list
router.get('/', (_, res) => {
  Movie.find()
    .sort({ name: 1 })
    .then(movies => res.json(movies))
});

// Get single Movie data
router.get('/:id', (req,res) =>{

  Movie.findById(req.params.id).then(movie => res.json(movie))
})

// Add movie to Cinema list
router.post('/', (req, res) => {
  const newMovie = new Movie({
      name: req.body.name,
      poster: req.body.poster,
      duration: req.body.duration,
      description: req.body.description
    })
    newMovie.save() 
    .then( movie => res.status(201).json(movie))
    .catch((err) => {
      if(err.code == 11000){
          return res.status(409).json({msg: "Movie with this name already exists"})
      }
      else return res.status(404).json({msg: err.errors.name.message})
    })
  });

// Delete movie from Cinema list

router.delete('/:id', (req, res) => {
  Movie.findOneAndDelete({_id: req.params.id})
  .then(() => res.json({ msg: `Movie removed from Cinema list` }))
  .catch(err => res.status(404).json({ error: err }));
});

router.get('/search/:name', (req,res) => {
    var options = {
      method: 'GET',
      url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
      params: {s: req.params.name, page: '1', r: 'json'},
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
router.put('/:id', async (req, res) => {
  const _id = req.params.id;
    Movie.findByIdAndUpdate( _id, {
      name: req.body.name,
      duration: req.body.duration,
      poster: req.body.poster,
      description: req.body.description
    })
    .then( () => res.status(201).json(req.body) )
    .catch( () =>
      res.status(400).json({ error: 'Unable to update the name' })
    );
  });

module.exports = router;