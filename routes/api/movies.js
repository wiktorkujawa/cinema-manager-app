const router = require('express').Router();

// File Model
const Movie = require('../../models/movie');

// Get movies list
router.get('/', (_, res) => {
  Movie.find()
    .sort({ name: 1 })
    .then(movies => res.json(movies))
});

// Add movie to Cinema list
router.post('/', (req, res) => {
  const newMovie = new Movie({
      name: req.body.name,
      duration: req.body.duration
    })
    newMovie.save() 
    .then( () => res.status(201).json({msg: `Movie ${req.body.name} has been added to Cinema schedule`}))
    .catch((err) => {
      if(err.code == 11000){
          return res.status(409).json({msg: "Movie with this name already exists"})
      }
      else return res.status(404).json({msg: err.errors.name.message})
    })
  });

// Delete movie from Cinema list

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  Movie.findOneAndDelete({_id: req.params.id})
  .then(() => res.json({ msg: `Movie removed from Cinema list` }))
  .catch(err => res.status(404).json({ error: err }));
});

// Update movie data
router.put('/:id', async (req, res) => {
  const _id = req.params.id;
    Movie.findByIdAndUpdate( _id, {
      name: req.body.name,
      duration: req.body.duration
    })
    .then(() => res.json({ msg: 'Name and/or duration updated' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the name' })
    );
  });

module.exports = router;